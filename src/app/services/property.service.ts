import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {

    private propertyData: Property = {
        id: 'lacruz-ecological-land',
        title: {
            en: '15.9 Hectares for Sale in La Cruz',
            es: 'Propiedad de 15,9 Hectáreas en Venta en La Cruz'
        },
        description: {
            en: 'Unique opportunity in northern Costa Rica: Just 5 minutes from downtown La Cruz, Guanacaste. Strategic location with ecological, tourism, and residential potential. Surrounded by national park biodiversity in a peaceful setting.',
            es: 'Oportunidad única en el norte de Costa Rica: A solo 5 minutos del centro de La Cruz, Guanacaste. Ubicación estratégica con potencial ecológico, turístico y residencial. Rodeado de biodiversidad del Parque Nacional en un entorno tranquilo.'
        },
        location: {
            en: 'La Cruz, Guanacaste, Costa Rica',
            es: 'La Cruz, Guanacaste, Costa Rica'
        },
        type: {
            en: 'Ecological Land',
            es: 'Terreno Ecológico'
        },
        price: 0,
        currency: 'USD',
        area: 159000,
        areaUnit: 'm²',
        bedrooms: 0,
        bathrooms: 0,
        features: {
            en: [
                {
                    icon: 'fas fa-map-marker-alt',
                    title: 'Privileged Location',
                    description: '5 minutes from downtown La Cruz, 25 minutes from virgin beaches like Junquillal and El Jobo'
                },
                {
                    icon: 'fas fa-tree',
                    title: 'National Park Border',
                    description: 'Borders National Park, surrounded by biodiversity and tranquility'
                },
                {
                    icon: 'fas fa-road',
                    title: 'Paved Road Access',
                    description: 'Frontage on paved road with good public access'
                },
                {
                    icon: 'fas fa-mountain',
                    title: 'Natural Terrain',
                    description: '15.9 hectares of rolling terrain with natural views and fresh climate'
                },
                {
                    icon: 'fas fa-globe-americas',
                    title: 'Near Nicaragua',
                    description: 'Close to Nicaragua border, ideal for cross-border or binational projects'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'North Atlantic Corridor',
                    description: 'With the future development of the North Atlantic corridor'
                }
            ],
            es: [
                {
                    icon: 'fas fa-map-marker-alt',
                    title: 'Ubicación Privilegiada',
                    description: 'A 5 minutos del centro de La Cruz, a 25 minutos de playas vírgenes como Junquillal y El Jobo'
                },
                {
                    icon: 'fas fa-tree',
                    title: 'Colinda con Parque Nacional',
                    description: 'Colinda con Parque Nacional, rodeado de biodiversidad y tranquilidad'
                },
                {
                    icon: 'fas fa-road',
                    title: 'Frente a Carretera Asfaltada',
                    description: 'Frente a carretera asfaltada con acceso por camino público en buen estado'
                },
                {
                    icon: 'fas fa-mountain',
                    title: 'Terreno Natural',
                    description: '15,9 hectáreas de terreno ondulado con vistas naturales y clima fresco'
                },
                {
                    icon: 'fas fa-globe-americas',
                    title: 'Cerca de Nicaragua',
                    description: 'Cercano a la frontera con Nicaragua, ideal para proyectos transfronterizos o binacionales'
                },
                {
                    icon: 'fas fa-chart-line',
                    title: 'Corredor Noratlántico',
                    description: 'Con el futuro desarrollo del corredor noratlántico'
                }
            ]
        },
        benefits: {
            en: [
                'Growing interest in nature tourism in the northern zone',
                'Proximity to border and Liberia airport (1 hour)',
                'High ecological value and low tourist saturation',
                'Conservation policies and support for ecotourism',
                'Future development of the North Atlantic corridor',
                'Green views without visual pollution',
                'Close to beaches but without the crowds of more urbanized areas',
                'Opportunity to create a low-impact, high-value project',
                'Area with mid-term appreciation potential'
            ],
            es: [
                'Creciente interés por turismo de naturaleza en la zona norte',
                'Proximidad a la frontera y al aeropuerto de Liberia (a 1h)',
                'Alta valoración ecológica y baja saturación turística',
                'Políticas de conservación y apoyo al ecoturismo',
                'Futuro desarrollo del corredor noratlántico',
                'Vistas verdes y sin contaminación visual',
                'Cercanía a playas pero sin las aglomeraciones de zonas más urbanizadas',
                'Oportunidad de crear un proyecto de bajo impacto y alto valor',
                'Área con potencial de valorización a mediano plazo'
            ]
        },
        idealFor: {
            en: [
                'Ecological or sustainable projects',
                'Wellness or nature retreats',
                'Eco-tourism lodging developments',
                'Subdivision for estates or residences',
                'Nature conservation initiatives',
                'Sustainable agriculture projects',
                'Wildlife observation centers',
                'Educational and research facilities'
            ],
            es: [
                'Proyectos ecológicos o sostenibles',
                'Retreats de bienestar o naturaleza',
                'Desarrollos de hospedaje eco-turístico',
                'Parcelación para quintas o residencias',
                'Iniciativas de conservación natural',
                'Proyectos de agricultura sostenible',
                'Centros de observación de vida silvestre',
                'Instalaciones educativas y de investigación'
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
            lat: 10.927,
            lng: -85.644
        },
        contactInfo: {
            phone: '+506 8705-3354',
            email: 'realestate@novelteak.com',
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
