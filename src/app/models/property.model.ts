export interface Property {
    id: string;
    title: {
        en: string;
        es: string;
    };
    description: {
        en: string;
        es: string;
    };
    location: {
        en: string;
        es: string;
    };
    type: {
        en: string;
        es: string;
    };
    price: number;
    currency: string;
    area: number;
    areaUnit: string;
    bedrooms: number;
    bathrooms: number;
    features: {
        en: PropertyFeature[];
        es: PropertyFeature[];
    };
    benefits: {
        en: string[];
        es: string[];
    };
    idealFor: {
        en: string[];
        es: string[];
    };
    images: PropertyImage[];
    videos: PropertyVideo[];
    coordinates?: {
        lat: number;
        lng: number;
    };
    contactInfo: ContactInfo;
}

export interface PropertyFeature {
    icon: string;
    title: string;
    description: string;
}

export interface PropertyImage {
    url: string;
    alt: string;
    type: 'main' | 'gallery' | 'aerial' | 'location';
}

export interface PropertyVideo {
    url: string;
    thumbnail: string;
    title: string;
    type: 'promotional' | 'aerial' | 'walkthrough';
}

export interface ContactInfo {
    phone: string;
    email: string;
    whatsapp: string;
    owner: {
        name: string;
        photo: string;
        title: {
            en: string;
            es: string;
        };
    };
}

export interface ContactForm {
    name: string;
    email: string;
    phone: string;
    message: string;
    language: 'en' | 'es';
    propertyId: string;
}
