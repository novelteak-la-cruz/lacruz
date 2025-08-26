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
      contact: 'Contact US',
      
      // General
      viewMore: 'View More',
      learnMore: 'Learn More',
      contactUs: 'Contact Us',
      scheduleVisit: 'Schedule a Visit',
      price: 'Price',
      area: 'Area',
      
      // Hero section
      heroTitle: '13 Strategic Hectares for Sale',
      heroSubtitle: 'Strategic Investment Opportunity – Premium Location Near Airport',
      getInTouch: 'Get in Touch',
      
      // Features section
      featuresTitle: 'What this property offers',
      
      // Location section
      locationTitle: 'Why Liberia',
      
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
      sendEmail: 'Send Email'
    },
    es: {
      // Navigation
      home: 'Inicio',
      features: 'Características',
      location: 'Ubicación',
      contact: 'Contáctanos',
      
      // General
      viewMore: 'Ver Más',
      learnMore: 'Conocer Más',
      contactUs: 'Contáctanos',
      scheduleVisit: 'Agendar Visita',
      price: 'Precio',
      area: 'Área',
      
      // Hero section
      heroTitle: '13 Hectáreas Estratégicas en Venta',
      heroSubtitle: 'Oportunidad de Inversión Estratégica – Ubicación Premium Cerca del Aeropuerto',
      getInTouch: 'Contáctanos',
      
      // Features section
      featuresTitle: 'Lo que ofrece esta propiedad',
      
      // Location section
      locationTitle: 'Por qué Liberia',
      
      // Ideal for section
      idealForTitle: 'Ideal para proyectos como',
      
            // Contact section
      contactTitle: 'Interesado en saber más?',
      contactSubtitle: 'Contáctanos directamente para información de propiedades',
      
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
      futureInGuanacaste: 'El futuro está en Guanacaste!',
      rightsReserved: 'Todos los derechos reservados',
      
      // Contact
      contactProperty: 'Contactar Propietario',
      callNow: 'Llamar Ahora',
      whatsapp: 'WhatsApp',
      sendWhatsApp: 'Enviar WhatsApp',
      sendEmail: 'Enviar Email'
    }
  };

  constructor() {
    // Set default language based on browser preference with SSR safety
    let defaultLang: Language = 'es';
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const browserLang = navigator.language.slice(0, 2);
      defaultLang = browserLang === 'es' ? 'es' : 'en';
    }
    this.setLanguage(defaultLang);
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
  }

  getTranslation(key: string): string {
    const lang = this.getCurrentLanguage();
    return this.translations[lang][key as keyof typeof this.translations.en] || key;
  }

  getTranslations(): any {
    const lang = this.getCurrentLanguage();
    return this.translations[lang];
  }
}
