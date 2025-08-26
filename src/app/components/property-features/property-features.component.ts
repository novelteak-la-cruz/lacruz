import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Property, PropertyImage } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-property-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-features.component.html',
  styleUrl: './property-features.component.scss'
})
export class PropertyFeaturesComponent implements OnInit, OnDestroy {
  property: Property | null = null;
  currentLanguage: Language = 'en';
  translations: any = {};
  selectedImage: PropertyImage | null = null;
  
  private propertySubscription?: Subscription;
  private languageSubscription?: Subscription;

  constructor(
    private propertyService: PropertyService,
    private languageService: LanguageService
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

  openImageModal(image: PropertyImage): void {
    this.selectedImage = image;
    document.body.style.overflow = 'hidden';
  }

  closeImageModal(): void {
    this.selectedImage = null;
    document.body.style.overflow = 'auto';
  }
}
