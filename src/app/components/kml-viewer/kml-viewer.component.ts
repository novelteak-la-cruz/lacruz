import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, PLATFORM_ID, Inject, Input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';
import { HeaderComponent } from '../header/header.component';

declare var L: any;

@Component({
    selector: 'app-kml-viewer',
    standalone: true,
    imports: [CommonModule, HeaderComponent],
    templateUrl: './kml-viewer.component.html',
    styleUrls: ['./kml-viewer.component.scss']
})
export class KmlViewerComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
    @Input() compact: boolean = false; // Modo compacto para usar en otros componentes
    @Input() title: string = '';

    private map: any;
    public isLoading = true;
    public loadingMessage = '';
    public errorMessage = '';
    public kmlData: any[] = [];
    public showInfoPanel = true;
    public currentLanguage: Language = 'en';
    public translations: any = {};
    private isBrowser = false;
    private languageSubscription?: Subscription;

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private languageService: LanguageService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        this.isBrowser = isPlatformBrowser(this.platformId);
        // Inicializar traducciones inmediatamente
        this.currentLanguage = this.languageService.getCurrentLanguage();
        this.translations = this.languageService.getTranslations();
    }

    ngOnInit(): void {
        console.log('🚀 KML Viewer iniciado');
        console.log('🌐 Es navegador?', this.isBrowser);

        // Inicializar traducciones
        this.languageSubscription = this.languageService.currentLanguage$.subscribe(
            language => {
                this.currentLanguage = language;
                this.translations = this.languageService.getTranslations();
                // Actualizar mensajes de carga con traducciones
                this.updateLoadingMessage();
            }
        );

        if (!this.isBrowser) {
            console.log('❌ SSR detectado - NO inicializar mapa');
            this.errorMessage = this.translations.waitingBrowser || 'Esperando navegador...';
            this.cdr.detectChanges();
            return;
        }

        console.log('✅ Navegador confirmado - programando inicialización');
    }

    ngAfterViewInit(): void {
        console.log('🔥 ngAfterViewInit - Es navegador?', this.isBrowser);

        if (!this.isBrowser) {
            console.log('❌ SSR en AfterViewInit - saltando');
            return;
        }

        console.log('✅ Navegador confirmado - iniciando mapa en 1 segundo...');

        // Esperar hasta estar completamente seguro que estamos en el navegador
        setTimeout(() => {
            this.initializeMap();
        }, 1000);
    }

    ngOnDestroy(): void {
        if (this.map) {
            this.map.remove();
        }
        this.languageSubscription?.unsubscribe();
    }

    private async initializeMap(): Promise<void> {
        try {
            console.log('🌍 === INICIANDO MAPA ===');
            console.log('🌍 Es navegador:', this.isBrowser);
            console.log('🌍 Window:', typeof window);
            console.log('🌍 Document:', typeof document);

            // VERIFICACIÓN MÚLTIPLE
            if (!this.isBrowser) {
                console.log('❌ NO es navegador - abortando');
                this.retryInit();
                return;
            }

            if (typeof window === 'undefined') {
                console.log('❌ Window no disponible - abortando');
                this.retryInit();
                return;
            }

            if (typeof document === 'undefined') {
                console.log('❌ Document no disponible - abortando');
                this.retryInit();
                return;
            }

            console.log('✅ ¡NAVEGADOR CONFIRMADO! Continuando...');

            // Verificar contenedor
            if (!this.mapContainer?.nativeElement) {
                console.log('❌ Contenedor no encontrado - reintentando...');
                setTimeout(() => this.initializeMap(), 1000);
                return;
            }

            const container = this.mapContainer.nativeElement;
            console.log('✅ Contenedor encontrado:', container);

            // Cargar dependencias
            await this.loadDependencies();

            // Crear mapa
            this.createMap(container);

            // Cargar KML
            await this.loadKMLData();

            console.log('✅ ¡MAPA COMPLETAMENTE FUNCIONAL!');

        } catch (error) {
            console.error('❌ Error fatal:', error);
            this.handleError(error);
        }
    }

    private retryInit(): void {
        this.errorMessage = this.translations.waitingBrowser || 'Esperando el navegador...';
        this.cdr.detectChanges();

        setTimeout(() => {
            console.log('🔄 Reintentando inicialización...');
            this.initializeMap();
        }, 2000);
    }

    private updateLoadingMessage(): void {
        if (this.isLoading && !this.loadingMessage) {
            this.loadingMessage = this.translations.initializing || 'Iniciando...';
        }
    }

    private async loadDependencies(): Promise<void> {
        console.log('📦 Cargando Leaflet...');
        this.loadingMessage = this.translations.loadingMap || 'Cargando mapa...';
        this.cdr.detectChanges();

        // Inyectar CSS de Leaflet
        if (!document.querySelector('link[href*="leaflet"]')) {
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            cssLink.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
            cssLink.crossOrigin = '';
            document.head.appendChild(cssLink);
        }

        // Cargar Leaflet JS
        if (typeof L === 'undefined') {
            await this.loadLeafletJS();
        }

        console.log('✅ Leaflet listo');
    }

    private loadLeafletJS(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (typeof L !== 'undefined') {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
            script.crossOrigin = '';

            script.onload = () => {
                console.log('📍 Leaflet JS cargado exitosamente');
                resolve();
            };

            script.onerror = (error) => {
                console.error('❌ Error cargando Leaflet:', error);
                reject(new Error('No se pudo cargar Leaflet'));
            };

            document.head.appendChild(script);
        });
    }

    private createMap(container: HTMLElement): void {
        console.log('🗺️ Creando mapa...');
        this.loadingMessage = this.translations.creatingMap || 'Creando mapa...';
        this.cdr.detectChanges();

        // Crear mapa centrado en Costa Rica
        this.map = L.map(container, {
            center: [9.9281, -84.0907],
            zoom: 3,
            zoomControl: true,
            attributionControl: false  // Deshabilitar control de atribución
        });

        // Definir capas base
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: 17
        });

        const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '',
            maxZoom: 17
        });

        const hybridLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '',
            maxZoom: 17
        });

        // Agregar capa satelital por defecto
        satelliteLayer.addTo(this.map);

        // Crear control de capas
        const baseLayers = {
            '🛰️ Satelital': satelliteLayer,
            '🗺️ Mapa': osmLayer
        };

        L.control.layers(baseLayers).addTo(this.map);

        console.log('✅ Mapa base creado con vista satelital');
    }

    private async loadKMLData(): Promise<void> {
        try {
            console.log('📄 Cargando KML...');
            this.loadingMessage = this.translations.loadingKmlData || 'Cargando datos KML...';
            this.cdr.detectChanges();

            const response = await fetch('/assets/kml/Airport.kml');
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const kmlText = await response.text();
            const parser = new DOMParser();
            const kmlDoc = parser.parseFromString(kmlText, 'text/xml');

            const placemarks = kmlDoc.querySelectorAll('Placemark');
            console.log(`📍 Encontrados ${placemarks.length} placemarks`);

            this.kmlData = [];
            let addedCount = 0;

            placemarks.forEach((placemark, index) => {
                const name = placemark.querySelector('name')?.textContent || `${this.translations.propertyLabel || 'Propiedad'} ${index + 1}`;
                const extendedData = this.extractExtendedData(placemark);

                // Buscar geometrías
                const polygon = placemark.querySelector('Polygon outerBoundaryIs LinearRing coordinates, MultiGeometry Polygon outerBoundaryIs LinearRing coordinates');

                if (polygon) {
                    const coords = this.parseCoordinates(polygon.textContent || '');
                    if (coords.length > 0) {
                        this.addPolygonToMap(coords, name, extendedData);

                        this.kmlData.push({
                            name,
                            type: 'polygon',
                            coords,
                            extendedData
                        });

                        addedCount++;
                    }
                }
            });

            console.log(`✅ ${addedCount} polígonos agregados al mapa`);

            // Ajustar vista del mapa
            if (this.kmlData.length > 0) {
                this.fitMapBounds();
            }

            this.isLoading = false;
            this.errorMessage = '';
            this.cdr.detectChanges();

        } catch (error) {
            console.error('❌ Error cargando KML:', error);
            throw error;
        }
    }

    private extractExtendedData(placemark: Element): any {
        const data: any = {};

        try {
            const schemaData = placemark.querySelector('ExtendedData SchemaData');
            if (schemaData) {
                const simpleDataElements = schemaData.querySelectorAll('SimpleData');
                simpleDataElements.forEach((element) => {
                    const name = element.getAttribute('name');
                    const value = element.textContent;
                    if (name && value) {
                        data[name] = value;
                    }
                });
            }
        } catch (error) {
            console.error('Error extrayendo ExtendedData:', error);
        }

        return data;
    }

    private parseCoordinates(coordsText: string): number[][] {
        const coords: number[][] = [];

        try {
            const coordPairs = coordsText.trim().split(/\s+/);

            for (const pair of coordPairs) {
                const parts = pair.split(',');
                if (parts.length >= 2) {
                    const lon = parseFloat(parts[0]);
                    const lat = parseFloat(parts[1]);

                    if (!isNaN(lat) && !isNaN(lon)) {
                        coords.push([lat, lon]);
                    }
                }
            }
        } catch (error) {
            console.error('Error parseando coordenadas:', error);
        }

        return coords;
    }

    private addPolygonToMap(coords: number[][], name: string, extendedData: any): void {
        const polygon = L.polygon(coords, {
            color: '#ff0000',
            weight: 2,
            fillOpacity: 0.1,
            fillColor: '#ff0000'
        }).addTo(this.map);

        const popupContent = this.createPopupContent(name, extendedData);
        polygon.bindPopup(popupContent);
    }

    private createPopupContent(name: string, extendedData: any): string {
        let content = `<div style="min-width: 280px; max-width: 400px;">`;
        content += `<h5 style="margin-bottom: 15px; color: #2c3e50; border-bottom: 1px solid #ecf0f1; padding-bottom: 8px;">${name}</h5>`;

        if (extendedData && Object.keys(extendedData).length > 0) {
            content += `<table style="width: 100%; font-size: 13px; border-collapse: collapse;">`;

            const fields = [
                { key: 'HECTAREAS', label: this.translations.hectaresLabel || 'Hectáreas', unit: ' ha' },
                { key: 'FOLIO', label: this.translations.folioLabel || 'Folio', unit: '' },
                { key: 'PLANO', label: this.translations.planLabel || 'Plano', unit: '' },
                { key: 'PERIMETER', label: this.translations.perimeterLabel || 'Perímetro', unit: ' m' },
                { key: 'FINCA', label: this.translations.farmLabel || 'Finca', unit: '' },
                { key: 'PAIS', label: this.translations.countryLabel || 'País', unit: '' },
                { key: 'X', label: this.translations.coordinateXLabel || 'Coordenada X', unit: '' },
                { key: 'Y', label: this.translations.coordinateYLabel || 'Coordenada Y', unit: '' }
            ];

            fields.forEach(field => {
                if (extendedData[field.key]) {
                    content += `<tr>
            <td style="padding: 4px 8px 4px 0; font-weight: bold; color: #555;">${field.label}:</td>
            <td style="padding: 4px 0;">${extendedData[field.key]}${field.unit}</td>
          </tr>`;
                }
            });

            content += `</table>`;
        } else {
            content += `<p style="color: #7f8c8d; font-style: italic;">${this.translations.noAdditionalInfo || 'No hay información adicional disponible'}</p>`;
        }

        content += `</div>`;
        return content;
    }

    private fitMapBounds(): void {
        if (this.kmlData.length === 0) return;

        const group = new L.featureGroup();
        this.kmlData.forEach(item => {
            if (item.coords && item.coords.length > 0) {
                const polygon = L.polygon(item.coords);
                group.addLayer(polygon);
            }
        });

        if (group.getLayers().length > 0) {
            this.map.fitBounds(group.getBounds(), { padding: [20, 20] });
        }
    }

    private handleError(error: any): void {
        this.errorMessage = `${this.translations.errorPrefix || 'Error:'} ${error.message || error}`;
        this.isLoading = false;
        this.cdr.detectChanges();
    }

    // Métodos públicos para el template
    public forceInit(): void {
        console.log('🔄 Inicialización forzada por usuario...');
        this.isLoading = true;
        this.errorMessage = '';
        this.loadingMessage = this.translations.restarting || 'Reiniciando...';
        this.cdr.detectChanges();

        setTimeout(() => {
            this.initializeMap();
        }, 500);
    }

    public debug(): void {
        console.log('🐛 === DEBUG INFO ===');
        console.log('Map:', this.map);
        console.log('KML Data:', this.kmlData);
        console.log('Container:', this.mapContainer?.nativeElement);
        console.log('Window:', typeof window);
        console.log('Document:', typeof document);
        console.log('Leaflet (L):', typeof L);
        console.log('Loading:', this.isLoading);
        console.log('Error:', this.errorMessage);
    }

    public toggleInfoPanel(): void {
        this.showInfoPanel = !this.showInfoPanel;
        setTimeout(() => {
            if (this.map) {
                this.map.invalidateSize();
            }
        }, 300);
    }

    public zoomToElement(item: any, event: Event): void {
        event.stopPropagation();

        if (!this.map || !item) return;

        try {
            if (item.type === 'polygon' && item.coords) {
                const bounds = L.latLngBounds(item.coords);
                this.map.fitBounds(bounds, { padding: [20, 20] });
            }
        } catch (error) {
            console.error('Error al enfocar elemento:', error);
        }
    }

    public getTypeIcon(type: string): string {
        return 'bi bi-pentagon-fill text-success';
    }

    public getTypeBadgeClass(type: string): string {
        return 'bg-primary text-white fw-bold';
    }

    public getTypeLabel(type: string): string {
        return this.translations.propertyLabel || 'Propiedad';
    }

    public getElementDisplayName(item: any): string {
        if (item.extendedData?.PLANO) {
            return `${this.translations.planLabel || 'Plano'} ${item.extendedData.PLANO}`;
        }
        if (item.extendedData?.FOLIO) {
            return `${this.translations.folioLabel || 'Folio'} ${item.extendedData.FOLIO}`;
        }
        return item.name || this.translations.noName || 'Sin nombre';
    }

    public trackByFn(index: number, item: any): any {
        return item.name || index;
    }

    // Métodos para el resumen general
    public getTotalArea(): string {
        const total = this.kmlData.reduce((sum, item) => {
            const hectareas = parseFloat(item.extendedData?.HECTAREAS || '0');
            return sum + hectareas;
        }, 0);
        return total.toFixed(2);
    }

    public getAverageArea(): string {
        if (this.kmlData.length === 0) return '0.00';
        const total = parseFloat(this.getTotalArea());
        const average = total / this.kmlData.length;
        return average.toFixed(2);
    }

    public getPropertiesWithFolio(): number {
        return this.kmlData.filter(item => item.extendedData?.FOLIO).length;
    }

    // Método para navegar al mapa completo
    public openFullMap(): void {
        this.router.navigate(['/kml-viewer']);
    }
}
