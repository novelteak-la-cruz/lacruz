import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Property, ContactForm } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { LanguageService, Language } from '../../services/language.service';
import { PhoneFormatService } from '../../services/phone-format.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  host: {
    'ngSkipHydration': ''
  }
})
export class ContactFormComponent implements OnInit, OnDestroy {
  property: Property | null = null;
  currentLanguage: Language = 'en';
  translations: any = {};
  isSubmitting = false;
  showSuccessMessage = false;
  
  formData: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: '',
    language: 'en',
    propertyId: ''
  };
  
  private propertySubscription?: Subscription;
  private languageSubscription?: Subscription;

  constructor(
    private propertyService: PropertyService,
    private languageService: LanguageService,
    private phoneFormatService: PhoneFormatService
  ) {}

  ngOnInit(): void {
    this.propertySubscription = this.propertyService.getProperty().subscribe(
      property => {
        this.property = property;
        this.formData.propertyId = property?.id || '';
      }
    );

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      language => {
        this.currentLanguage = language;
        this.translations = this.languageService.getTranslations();
        this.formData.language = language;
      }
    );
  }

  ngOnDestroy(): void {
    this.propertySubscription?.unsubscribe();
    this.languageSubscription?.unsubscribe();
  }

  getWhatsAppLink(): string {
    const message = this.currentLanguage === 'en' 
      ? `Hi! I'm interested in the property: ${this.property?.title.en}`
      : `Hola! Estoy interesado en la propiedad: ${this.property?.title.es}`;
    
    return this.phoneFormatService.createWhatsAppLink(
      this.property?.contactInfo.whatsapp || '', 
      message
    );
  }

  getFormattedPhone(): string {
    return this.phoneFormatService.formatForDisplay(this.property?.contactInfo.phone || '');
  }

  getFormattedWhatsApp(): string {
    return this.phoneFormatService.formatForDisplay(this.property?.contactInfo.whatsapp || '');
  }

  getTelLink(): string {
    return this.phoneFormatService.formatForTel(this.property?.contactInfo.phone || '');
  }

  onSubmit(): void {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', this.formData);
      this.isSubmitting = false;
      this.showSuccessMessage = true;
      
      // Reset form
      this.formData = {
        name: '',
        email: '',
        phone: '',
        message: '',
        language: this.currentLanguage,
        propertyId: this.property?.id || ''
      };
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 5000);
    }, 2000);
  }
}
