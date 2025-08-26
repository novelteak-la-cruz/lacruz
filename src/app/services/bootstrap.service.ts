import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare var bootstrap: any;

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  // Verificar si Bootstrap está disponible
  isBootstrapLoaded(): boolean {
    return isPlatformBrowser(this.platformId) && typeof bootstrap !== 'undefined';
  }

  // Obtener instancia de Offcanvas
  getOffcanvasInstance(element: HTMLElement) {
    if (this.isBootstrapLoaded()) {
      return bootstrap.Offcanvas.getInstance(element) || new bootstrap.Offcanvas(element);
    }
    return null;
  }

  // Mostrar offcanvas
  showOffcanvas(elementId: string): void {
    if (this.isBootstrapLoaded()) {
      const element = document.getElementById(elementId);
      if (element) {
        const offcanvas = this.getOffcanvasInstance(element);
        if (offcanvas) {
          offcanvas.show();
        }
      }
    }
  }

  // Ocultar offcanvas
  hideOffcanvas(elementId: string): void {
    if (this.isBootstrapLoaded()) {
      const element = document.getElementById(elementId);
      if (element) {
        const offcanvas = this.getOffcanvasInstance(element);
        if (offcanvas) {
          offcanvas.hide();
        }
      }
    }
  }

  // Alternar offcanvas
  toggleOffcanvas(elementId: string): void {
    if (this.isBootstrapLoaded()) {
      const element = document.getElementById(elementId);
      if (element) {
        const offcanvas = this.getOffcanvasInstance(element);
        if (offcanvas) {
          offcanvas.toggle();
        }
      }
    }
  }

  // Inicializar offcanvas con opciones
  initializeOffcanvas(elementId: string, options?: any): void {
    if (this.isBootstrapLoaded()) {
      const element = document.getElementById(elementId);
      if (element) {
        new bootstrap.Offcanvas(element, options);
      }
    }
  }
}
