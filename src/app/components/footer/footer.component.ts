import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { LanguageService, Language } from '../../services/language.service';
import { PhoneFormatService } from '../../services/phone-format.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, OnDestroy {
  property: Property | null = null;
  currentLanguage: Language = 'en';
  translations: any = {};
  currentYear = new Date().getFullYear();
  
  private propertySubscription?: Subscription;
  private languageSubscription?: Subscription;

  constructor(
    private propertyService: PropertyService,
    private languageService: LanguageService,
    private phoneFormatService: PhoneFormatService
  ) {}

  ngOnInit(): void {
    this.propertySubscription = this.propertyService.getProperty().subscribe(
      property => this.property = property
    );

    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      language => {
        this.currentLanguage = language;
        this.translations = this.languageService.getTranslations();
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
}
