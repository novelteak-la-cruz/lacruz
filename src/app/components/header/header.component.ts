import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LanguageService, Language } from '../../services/language.service';
import { BootstrapService } from '../../services/bootstrap.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  isScrolled = false;
  currentLanguage: Language = 'en';
  translations: any = {};
  private languageSubscription?: Subscription;

  constructor(
    private languageService: LanguageService,
    public bootstrapService: BootstrapService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.languageSubscription = this.languageService.currentLanguage$.subscribe(
      language => {
        this.currentLanguage = language;
        this.translations = this.languageService.getTranslations();
      }
    );
  }

  ngAfterViewInit(): void {
    // Inicializar Bootstrap solo en el navegador
    if (isPlatformBrowser(this.platformId)) {
      // Esperar a que Bootstrap esté disponible
      setTimeout(() => {
        this.initializeBootstrapComponents();
      }, 500); // Aumentamos el tiempo de espera
    }
  }

  private initializeBootstrapComponents(): void {
    // Verificar si Bootstrap está disponible globalmente
    if (typeof (window as any).bootstrap !== 'undefined') {
      console.log('Bootstrap detectado correctamente');
      this.bootstrapService.initializeOffcanvas('mobileOffcanvas', {
        backdrop: true,
        scroll: false
      });
      
      // Agregar listener para cuando se cierre el offcanvas
      const offcanvasElement = document.getElementById('mobileOffcanvas');
      if (offcanvasElement) {
        offcanvasElement.addEventListener('hidden.bs.offcanvas', () => {
          document.body.classList.remove('offcanvas-open');
        });
      }
    } else {
      console.warn('Bootstrap no está disponible. Reintentando...');
      // Reintentar después de otro delay
      setTimeout(() => {
        this.initializeBootstrapComponents();
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 50;
      const navbar = document.querySelector('.modern-navbar');
      if (navbar) {
        if (this.isScrolled) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }
  }

  switchLanguage(language: Language): void {
    this.languageService.setLanguage(language);
    this.closeMobileMenu();
    
    // Log para verificar que la persistencia funciona
    console.log(`🌐 Idioma cambiado a: ${language}`);
    console.log(`💾 Preferencia guardada en localStorage: ${this.languageService.hasStoredLanguagePreference()}`);
  }

  // Método para navegar a una sección y cerrar el menú
  navigateToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      // Cerrar el offcanvas
      this.closeMobileMenu();
      
      // Navegar a la sección después de un pequeño delay
      setTimeout(() => {
        const element = document.getElementById(sectionId.replace('#', ''));
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  }

  // Alternar el menú móvil
  toggleMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      const offcanvasElement = document.getElementById('mobileOffcanvas');
      if (offcanvasElement) {
        // Intentar con Bootstrap Service primero
        this.bootstrapService.toggleOffcanvas('mobileOffcanvas');
        
        // Si no funciona, usar Bootstrap directamente
        setTimeout(() => {
          if (typeof (window as any).bootstrap !== 'undefined') {
            const bootstrap = (window as any).bootstrap;
            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (!offcanvas) {
              offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            }
            offcanvas.toggle();
          } else {
            // Fallback manual si Bootstrap no está disponible
            this.manualToggleOffcanvas();
          }
        }, 100);
      }
    }
  }

  closeMobileMenu(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Usar Bootstrap Service
      this.bootstrapService.hideOffcanvas('mobileOffcanvas');
      
      // Fallback directo con timeout
      setTimeout(() => {
        const offcanvasElement = document.getElementById('mobileOffcanvas');
        if (offcanvasElement && typeof (window as any).bootstrap !== 'undefined') {
          const offcanvas = (window as any).bootstrap.Offcanvas.getInstance(offcanvasElement);
          if (offcanvas) {
            offcanvas.hide();
          }
        } else {
          // Fallback manual si Bootstrap no está disponible
          this.manualHideOffcanvas();
        }
      }, 50);
    }
  }

  // Fallback manual para toggle del offcanvas
  private manualToggleOffcanvas(): void {
    const offcanvasElement = document.getElementById('mobileOffcanvas');
    if (offcanvasElement) {
      const isVisible = offcanvasElement.classList.contains('show');
      
      if (isVisible) {
        // Ocultar
        offcanvasElement.classList.remove('show');
        document.body.classList.remove('offcanvas-open');
        
        // Remover backdrop si existe
        const backdrop = document.querySelector('.offcanvas-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
      } else {
        // Mostrar
        offcanvasElement.classList.add('show');
        document.body.classList.add('offcanvas-open');
        
        // Crear backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'offcanvas-backdrop fade show';
        backdrop.addEventListener('click', () => {
          this.manualToggleOffcanvas();
        });
        document.body.appendChild(backdrop);
      }
    }
  }

  // Fallback manual para ocultar el offcanvas
  private manualHideOffcanvas(): void {
    const offcanvasElement = document.getElementById('mobileOffcanvas');
    if (offcanvasElement) {
      // Ocultar el offcanvas
      offcanvasElement.classList.remove('show');
      document.body.classList.remove('offcanvas-open');
      
      // Remover backdrop si existe
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }

  // Navegar al visor KML
  public navigateToKmlViewer(): void {
    this.router.navigate(['/kml-viewer']);
    this.closeMobileMenu();
  }

  // Navegar al home
  public navigateToHome(): void {
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }
}
