import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { KmlViewerComponent } from '../../components/kml-viewer/kml-viewer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kml-viewer-page',
  standalone: true,
  imports: [CommonModule, KmlViewerComponent],
  templateUrl: './kml-viewer-page.component.html',
  styleUrls: ['./kml-viewer-page.component.scss']
})
export class KmlViewerPageComponent implements OnInit {
  public isBrowser = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('🏠 KML Viewer PAGE - Es navegador?', this.isBrowser);
  }

  ngOnInit(): void {
    console.log('🏠 PAGE ngOnInit - Es navegador?', this.isBrowser);
    
    // Configurar el título de la página solo en el navegador
    if (this.isBrowser && typeof document !== 'undefined') {
      document.title = 'Visor KML - Real Estate';
    }
  }

  public goBackToHome(): void {
    this.router.navigate(['/']);
  }
}
