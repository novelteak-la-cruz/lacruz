import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    private propertyData: Property = {
        id: 'liberia-strategic-land',
        title: {
            en: '13 Strategic Hectares for Sale – Premium Location Near Liberia Airport',
            es: '13 Hectáreas Estratégicas en Venta – Ubicación Premium Cerca del Aeropuerto de Liberia'
        },
        description: {
            en: 'Discover an exceptional investment opportunity with these 13 strategic hectares (132,347 m²) located in one of Costa Rica\'s most promising areas. Just minutes from Liberia International Airport and perfectly positioned in the heart of Guanacaste\'s growing tourism corridor.',
            es: 'Descubre una oportunidad de inversión excepcional con estas 13 hectáreas estratégicas (132,347 m²) ubicadas en una de las áreas más prometedoras de Costa Rica. A pocos minutos del Aeropuerto Internacional de Liberia y perfectamente posicionadas en el corazón del creciente corredor turístico de Guanacaste.'
        },
        location: {
            en: 'Liberia, Guanacaste, Costa Rica',
            es: 'Liberia, Guanacaste, Costa Rica'
        },
        type: {
            en: 'Commercial Land',
            es: 'Terreno Comercial'
        },
        price: 3000000,
        currency: 'USD',
        area: 132347,
        areaUnit: 'm²',
        bedrooms: 0,
        bathrooms: 0,
        features: {
            en: [
                {
                    icon: 'fas fa-map-marker-alt',
                    title: 'Strategic Location',
                    description: 'Less than 5 minutes from Liberia International Airport, main gateway to Guanacaste'
                },
                {
                    icon: 'fas fa-road',
                    title: 'Highway Frontage',
                    description: 'Direct access to main highway with high visibility and excellent connectivity'
                },
                {
                    icon: 'fas fa-mountain',
                    title: 'Flat & Ready',
                    description: 'Flat terrain ready for development with easy construction possibilities'
                },
                {
                    icon: 'fas fa-city',
                    title: 'Flexible Zoning',
                    description: 'Allows commercial, tourism, light industrial, and mixed-use developments'
                },
                {
                    icon: 'fas fa-plug',
                    title: 'Utilities Ready',
                    description: 'Access to electricity, water, telecommunications, and waste management'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'High ROI Potential',
                    description: 'Located in Costa Rica\'s fastest-growing tourism and commercial region'
                }
            ],
            es: [
                {
                    icon: 'fas fa-map-marker-alt',
                    title: 'Ubicación Estratégica',
                    description: 'A menos de 5 minutos del Aeropuerto Internacional de Liberia, puerta principal a Guanacaste'
                },
                {
                    icon: 'fas fa-road',
                    title: 'Frente a Carretera',
                    description: 'Acceso directo a carretera principal con alta visibilidad y excelente conectividad'
                },
                {
                    icon: 'fas fa-mountain',
                    title: 'Plano y Listo',
                    description: 'Terreno plano listo para desarrollo con facilidades de construcción'
                },
                {
                    icon: 'fas fa-city',
                    title: 'Zonificación Flexible',
                    description: 'Permite desarrollos comerciales, turísticos, industriales ligeros y uso mixto'
                },
                {
                    icon: 'fas fa-plug',
                    title: 'Servicios Listos',
                    description: 'Acceso a electricidad, agua, telecomunicaciones y manejo de desechos'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'Alto Potencial ROI',
                    description: 'Ubicado en la región turística y comercial de mayor crecimiento de Costa Rica'
                }
            ]
        },
        benefits: {
            en: [
                'Prime location in Costa Rica\'s fastest-growing tourism and commercial hub',
                'Direct proximity to Daniel Oduber Quirós International Airport (< 5 minutes)',
                'Strategic position on main highway connecting Pacific beaches and Nicaragua border',
                'Growing international tourism demand with year-round high occupancy rates',
                'Significant government and private investment in regional infrastructure',
                'Excellent air, land, and digital connectivity for business operations',
                'Tax incentives available for tourism and export-oriented investments',
                'Proven track record of real estate appreciation in the area'
            ],
            es: [
                'Ubicación prime en el hub turístico y comercial de mayor crecimiento de Costa Rica',
                'Proximidad directa al Aeropuerto Internacional Daniel Oduber Quirós (< 5 minutos)',
                'Posición estratégica en carretera principal conectando playas del Pacífico y frontera Nicaragua',
                'Creciente demanda turística internacional con altas tasas de ocupación todo el año',
                'Significativa inversión gubernamental y privada en infraestructura regional',
                'Excelente conectividad aérea, terrestre y digital para operaciones comerciales',
                'Incentivos fiscales disponibles para inversiones turísticas y orientadas a exportación',
                'Historial comprobado de apreciación inmobiliaria en la zona'
            ]
        },
        idealFor: {
            en: [
                'Luxury resort and boutique hotel developments',
                'Corporate headquarters and regional distribution centers',
                'Shopping centers and premium retail complexes',
                'Medical tourism and wellness retreat facilities',
                'Light industrial parks and logistics hubs',
                'Mixed-use developments combining residential, commercial, and hospitality',
                'Event venues and conference centers',
                'Agribusiness and sustainable farming operations with export potential'
            ],
            es: [
                'Desarrollos de resorts de lujo y hoteles boutique',
                'Sedes corporativas y centros de distribución regional',
                'Centros comerciales y complejos retail premium',
                'Instalaciones de turismo médico y retiros de bienestar',
                'Parques industriales ligeros y centros logísticos',
                'Desarrollos de uso mixto combinando residencial, comercial y hospitalidad',
                'Centros de eventos y conferencias',
                'Operaciones agroindustriales y agricultura sostenible con potencial de exportación'
            ]
        },
        images: [
            {
                url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                alt: 'Aerial view of the property',
                type: 'main'
            },
            {
                url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                alt: 'Land terrain view',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                alt: 'Costa Rica landscape',
                type: 'gallery'
            },
            {
                url: 'https://images.unsplash.com/photo-1502780402662-acc01917069e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
                alt: 'Airport proximity',
                type: 'location'
            }
        ],
        videos: [
            {
                url: 'https://player.vimeo.com/video/395212534',
                thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                title: 'Property Overview',
                type: 'promotional'
            }
        ],
        coordinates: {
            lat: 10.6298,
            lng: -85.4419
        },
        contactInfo: {
            phone: '+506 8705-3354',
            email: 'info@realestateliberia.com',
            whatsapp: '+506 8684-1571',
            owner: {
                name: 'Novelteak',
                photo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
                title: {
                    en: 'Property Owner',
                    es: 'Propietario'
                }
            }
        }
    };

    private propertySubject = new BehaviorSubject<Property>(this.propertyData);

    constructor() { }

    getProperty(): Observable<Property> {
        return this.propertySubject.asObservable();
    }

    updateProperty(property: Property): void {
        this.propertySubject.next(property);
    }
}
