import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'en' | 'es';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private currentLanguageSubject = new BehaviorSubject<Language>('en');
    public currentLanguage$ = this.currentLanguageSubject.asObservable();

    private translations = {
        en: {
            // Navigation
            home: 'Home',
            features: 'Features',
            location: 'Location',
            contact: 'Contact',

            // Hero section
            heroTitle: '15.9 Hectares for Sale in La Cruz',
            heroSubtitle: 'Just 5 minutes from downtown La Cruz, Guanacaste – Ecological, Tourism, and Residential Potential',
            getInTouch: 'Get in Touch',

            // Features section
            featuresTitle: 'What this property offers',

            // Location section
            locationTitle: 'Why Invest in this Area',

            // Ideal for section
            idealForTitle: 'Ideal for projects such as',

            // Contact section
            contactTitle: 'Interested in learning more?',
            contactSubtitle: 'Contact us directly for property information',

            // Contact form
            firstName: 'First Name',
            lastName: 'Last Name',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            message: 'Message',
            messagePlaceholder: 'Tell us about your project or questions...',
            send: 'Send Message',
            sendMessage: 'Send Message',

            // Hero stats
            yearsExperience: 'Years Experience',
            propertiesSold: 'Properties Sold',
            satisfaction: 'Satisfaction',

            // Footer
            futureInGuanacaste: 'Future is in Guanacaste!',
            rightsReserved: 'All rights reserved',

            // Contact
            contactProperty: 'Contact Owner',
            callNow: 'Call Now',
            whatsapp: 'WhatsApp',
            sendWhatsApp: 'Send WhatsApp',
            sendEmail: 'Send Email',

            // KML Viewer
            viewFullMap: 'View Full Map',
            fullMap: 'Full',
            propertyInformation: 'Property Information',
            loading: 'Loading...',
            retry: 'Retry',
            initializeManually: 'Initialize Manually',
            debug: 'Debug',
            noPropertiesFound: 'No properties found',
            generalSummary: 'General Summary',
            totalArea: 'Total Area',
            averageArea: 'Average Area',
            propertiesWithFolio: 'Properties with Folio',
            areaLabel: 'Area',
            folio: 'Folio',
            plan: 'Plan',
            farm: 'Farm',
            initializing: 'Starting...',
            loadingMap: 'Loading map...',
            loadingKmlData: 'Loading KML data...',
            creatingMap: 'Creating map...',
            waitingBrowser: 'Waiting for browser...',
            retrying: 'Retrying...',
            restarting: 'Restarting...',
            errorPrefix: 'Error:',
            noAdditionalInfo: 'No additional information available',
            forceRetry: 'Force Retry',
            debugInfo: 'Debug Info',
            showInfo: 'Show Info',
            hideInfo: 'Hide Info',
            totalProperties: 'Total Properties',
            hectares: 'ha',
            propertyLabel: 'Property',
            noName: 'Unnamed',
            planLabel: 'Plan',
            folioLabel: 'Folio',
            hectaresLabel: 'Hectares',
            perimeterLabel: 'Perimeter',
            farmLabel: 'Farm',
            countryLabel: 'Country',
            coordinateXLabel: 'X Coordinate',
            coordinateYLabel: 'Y Coordinate',
            propertyDetails: 'Property Details',
            propertyGallery: 'Property Gallery'
        },
        es: {
            // Navigation
            home: 'Inicio',
            features: 'Características',
            location: 'Ubicación',
            contact: 'Contacto',

            // Hero section
            heroTitle: '15,9 Hectáreas en Venta en La Cruz',
            heroSubtitle: 'A solo 5 minutos del centro de La Cruz, Guanacaste – Potencial Ecológico, Turístico y Residencial',
            getInTouch: 'Contáctanos',

            // Features section
            featuresTitle: 'Lo que ofrece esta propiedad',

            // Location section
            locationTitle: '¿Por qué invertir en esta zona?',

            // Ideal for section
            idealForTitle: 'Ideal para proyectos como',

            // Contact section
            contactTitle: '¿Interesado en saber más?',
            contactSubtitle: 'Contáctanos directamente para información de la propiedad',

            // Contact form
            firstName: 'Nombre',
            lastName: 'Apellido',
            name: 'Nombre',
            email: 'Correo',
            phone: 'Teléfono',
            message: 'Mensaje',
            messagePlaceholder: 'Cuéntanos sobre tu proyecto o preguntas...',
            send: 'Enviar Mensaje',
            sendMessage: 'Enviar Mensaje',

            // Hero stats
            yearsExperience: 'Años de Experiencia',
            propertiesSold: 'Propiedades Vendidas',
            satisfaction: 'Satisfacción',

            // Footer
            futureInGuanacaste: '¡El futuro está en Guanacaste!',
            rightsReserved: 'Todos los derechos reservados',

            // Contact
            contactProperty: 'Contactar Propietario',
            callNow: 'Llamar Ahora',
            whatsapp: 'WhatsApp',
            sendWhatsApp: 'Enviar WhatsApp',
            sendEmail: 'Enviar Email',

            // KML Viewer
            viewFullMap: 'Ver Mapa Completo',
            fullMap: 'Completo',
            propertyInformation: 'Información de la Propiedad',
            loading: 'Cargando...',
            retry: 'Reintentar',
            initializeManually: 'Inicializar Manualmente',
            debug: 'Debug',
            noPropertiesFound: 'No se encontraron propiedades',
            generalSummary: 'Resumen General',
            totalArea: 'Área Total',
            averageArea: 'Área Promedio',
            propertiesWithFolio: 'Propiedades con Folio',
            areaLabel: 'Área',
            folio: 'Folio',
            plan: 'Plano',
            farm: 'Finca',
            initializing: 'Iniciando...',
            loadingMap: 'Cargando mapa...',
            loadingKmlData: 'Cargando datos KML...',
            creatingMap: 'Creando mapa...',
            waitingBrowser: 'Esperando navegador...',
            retrying: 'Reintentando...',
            restarting: 'Reiniciando...',
            errorPrefix: 'Error:',
            noAdditionalInfo: 'No hay información adicional disponible',
            forceRetry: 'Forzar Reintento',
            debugInfo: 'Información de Debug',
            showInfo: 'Mostrar Info',
            hideInfo: 'Ocultar Info',
            totalProperties: 'Total de Propiedades',
            hectares: 'ha',
            propertyLabel: 'Propiedad',
            noName: 'Sin nombre',
            planLabel: 'Plano',
            folioLabel: 'Folio',
            hectaresLabel: 'Hectáreas',
            perimeterLabel: 'Perímetro',
            farmLabel: 'Finca',
            countryLabel: 'País',
            coordinateXLabel: 'Coordenada X',
            coordinateYLabel: 'Coordenada Y',
            propertyDetails: 'Detalles de la Propiedad',
            propertyGallery: 'Galería de la Propiedad'
        }
    };

    constructor() {
        // Set default language based on stored preference or browser preference with SSR safety
        let defaultLang: Language = 'en';

        if (typeof window !== 'undefined') {
            // Try to get saved language from localStorage
            const savedLanguage = localStorage.getItem('selectedLanguage');
            if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
                defaultLang = savedLanguage as Language;
            } else if (typeof navigator !== 'undefined') {
                // Fall back to browser language if no saved preference
                const browserLang = navigator.language.slice(0, 2);
                defaultLang = browserLang === 'es' ? 'es' : 'en';
            }
        }

        this.setLanguage(defaultLang);
    }

    getCurrentLanguage(): Language {
        return this.currentLanguageSubject.value;
    }

    setLanguage(language: Language): void {
        this.currentLanguageSubject.next(language);

        // Save language preference to localStorage (with SSR safety)
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            try {
                localStorage.setItem('selectedLanguage', language);
            } catch (error) {
                console.warn('Could not save language preference to localStorage:', error);
            }
        }
    }

    getTranslation(key: string): string {
        const lang = this.getCurrentLanguage();
        return this.translations[lang][key as keyof typeof this.translations.en] || key;
    }

    getTranslations(): any {
        const lang = this.getCurrentLanguage();
        return this.translations[lang];
    }

    // Método para limpiar la preferencia guardada (útil para debugging)
    clearLanguagePreference(): void {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            try {
                localStorage.removeItem('selectedLanguage');
            } catch (error) {
                console.warn('Could not clear language preference from localStorage:', error);
            }
        }
    }

    // Método para verificar si hay una preferencia guardada
    hasStoredLanguagePreference(): boolean {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            try {
                return localStorage.getItem('selectedLanguage') !== null;
            } catch (error) {
                console.warn('Could not access localStorage:', error);
                return false;
            }
        }
        return false;
    }
}
