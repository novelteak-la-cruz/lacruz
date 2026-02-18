import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { LanguageService, Language } from '../../services/language.service';
import { KmlViewerComponent } from '../kml-viewer/kml-viewer.component';

@Component({
  selector: 'app-location-benefits',
  standalone: true,
  imports: [CommonModule, KmlViewerComponent],
  templateUrl: './location-benefits.component.html',
  styleUrl: './location-benefits.component.scss'
})
export class LocationBenefitsComponent implements OnInit, OnDestroy {
  property: Property | null = null;
  currentLanguage: Language = 'en';
  translations: any = {};
  
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
}
