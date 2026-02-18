import { Component, OnInit, OnDestroy, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { Property } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';
import { LanguageService, Language } from '../../services/language.service';
import { PhoneFormatService } from '../../services/phone-format.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
    property: Property | null = null;
    currentLanguage: Language = 'en';
    translations: any = {};

    // Gallery properties
    currentMediaType: 'video' | 'image' = 'video';
    currentImageIndex: number = 0;
    currentVideoIndex: number = 0;
    videoLoading: boolean = false;
    galleryImages: string[] = [];
    
    // Video properties
    videos: { path: string, title: string }[] = [
        { path: 'assets/videos/lacruz.mp4', title: 'La Cruz Property' }
    ];
    
    galleryVideos: { src: string, title: string }[] = [
        { src: 'assets/videos/lacruz.mp4', title: 'La Cruz Property' }
    ];
    
    preloadedVideos: { [key: string]: HTMLVideoElement } = {};

    private propertySubscription?: Subscription;
    private languageSubscription?: Subscription;

    constructor(
        private propertyService: PropertyService,
        private languageService: LanguageService,
        private phoneFormatService: PhoneFormatService,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    ngOnInit(): void {
        // Initialize gallery images
        this.initializeGallery();

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

    private initializeGallery(): void {
        // Generate array of image paths
        for (let i = 1; i <= 19; i++) {
            this.galleryImages.push(`assets/images/${i}.jpg`);
        }
    }

    showVideo(index: number = 0): void {
        if (index === this.currentVideoIndex && this.currentMediaType === 'video' && !this.videoLoading) {
            return; // Ya está mostrando este video y no está cargando
        }
        
        console.log('Changing to video index:', index);
        console.log('Video path:', this.videos[index]?.path);
        
        this.videoLoading = true;
        this.currentMediaType = 'video';
        this.currentVideoIndex = index;
        
        // Forzar la actualización del DOM y reproducir automáticamente
        setTimeout(() => {
            const videoElement = document.querySelector('#galleryVideo') as HTMLVideoElement;
            if (videoElement) {
                const newSrc = this.videos[index]?.path;
                console.log('Setting video src to:', newSrc);
                videoElement.src = newSrc;
                videoElement.load(); // Forzar recarga
                
                // Reproducir automáticamente cuando esté listo
                videoElement.addEventListener('canplay', () => {
                    console.log('Video ready, starting autoplay');
                    videoElement.play().then(() => {
                        console.log('Video playing automatically');
                    }).catch((error) => {
                        console.log('Autoplay failed:', error);
                    });
                }, { once: true });
            }
        }, 10);
    }

    showImage(index: number): void {
        this.currentMediaType = 'image';
        this.currentImageIndex = index;
    }

    getCurrentImagePath(): string {
        return this.galleryImages[this.currentImageIndex] || this.galleryImages[0];
    }

    ngAfterViewInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.initializeVideo();
            this.preloadVideos();
        }
    }

    private initializeVideo(): void {
        // Esperar un poco para asegurar que el DOM esté completamente cargado
        setTimeout(() => {
            const video = document.querySelector('.hero-video') as HTMLVideoElement;
            if (video) {
                console.log('Video element found');
                console.log('Video src:', video.src || video.currentSrc);

                // Asegurar que esté silenciado para autoplay
                video.muted = true;
                video.autoplay = true;
                video.loop = true;
                video.playsInline = true;

                // Event listeners optimizados para autoplay silencioso
                video.addEventListener('loadeddata', () => {
                    console.log('Video: Data loaded successfully');
                    video.setAttribute('data-loaded', 'true');
                    video.style.opacity = '1';
                    video.style.visibility = 'visible';
                    
                    // Intentar reproducir inmediatamente cuando los datos estén cargados
                    this.attemptAutoplay(video);
                });

                video.addEventListener('canplay', () => {
                    console.log('Video: Ready to play');
                    this.attemptAutoplay(video);
                });

                video.addEventListener('playing', () => {
                    console.log('Video: Actually playing now');
                    video.setAttribute('data-loaded', 'true');
                    video.style.opacity = '1';
                    video.style.visibility = 'visible';
                });

                video.addEventListener('error', (e) => {
                    console.error('Video error:', e);
                    console.error('Error details:', {
                        code: video.error?.code,
                        message: video.error?.message
                    });
                    video.classList.add('video-error');
                });

                // Cargar el video
                video.load();
                
                // Si el video ya se puede reproducir, hacerlo inmediatamente
                if (video.readyState >= 3) {
                    this.attemptAutoplay(video);
                }
            } else {
                console.error('Video element not found');
            }
        }, 100);
    }

    private attemptAutoplay(video: HTMLVideoElement): void {
        // Asegurar que esté silenciado
        video.muted = true;
        
        // Intentar reproducir
        video.play().then(() => {
            console.log('Video: Playing successfully (autoplay)');
            video.setAttribute('data-loaded', 'true');
            video.style.opacity = '1';
            video.style.visibility = 'visible';
        }).catch((error) => {
            console.log('Autoplay blocked, trying interaction-based play:', error);
            
            // Si el autoplay falla, intentar en la primera interacción del usuario
            const playOnInteraction = () => {
                video.muted = true; // Asegurar que siga silenciado
                video.play().then(() => {
                    console.log('Video: Playing after user interaction');
                    video.setAttribute('data-loaded', 'true');
                    video.style.opacity = '1';
                    video.style.visibility = 'visible';
                }).catch(e => {
                    console.error('Video play failed even after interaction:', e);
                });
            };

            // Agregar listeners para la primera interacción
            document.addEventListener('click', playOnInteraction, { once: true });
            document.addEventListener('touchstart', playOnInteraction, { once: true });
            document.addEventListener('keydown', playOnInteraction, { once: true });
        });
    }

    ngOnDestroy(): void {
        this.propertySubscription?.unsubscribe();
        this.languageSubscription?.unsubscribe();
    }

    formatPrice(price: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    formatArea(area: number): string {
        return new Intl.NumberFormat('en-US').format(area);
    }

    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    getFormattedPhone(): string {
        return this.phoneFormatService.formatForDisplay(this.property?.contactInfo.phone || '');
    }

    getTelLink(): string {
        return this.phoneFormatService.formatForTel(this.property?.contactInfo.phone || '');
    }

    getCurrentVideoPath(): string {
        return this.videos[this.currentVideoIndex]?.path || this.videos[0]?.path || '';
    }

    getCurrentVideoTitle(): string {
        return this.videos[this.currentVideoIndex]?.title || this.videos[0]?.title || '';
    }

    private preloadVideos(): void {
        // Precargar todos los videos para cambios más rápidos
        this.videos.forEach((video, index) => {
            if (index !== this.currentVideoIndex) { // No precargar el video actual
                const videoElement = document.createElement('video');
                videoElement.preload = 'metadata';
                videoElement.muted = true;
                videoElement.src = video.path;
                this.preloadedVideos[video.path] = videoElement;
                
                // Cargar metadata del video
                videoElement.load();
            }
        });
    }

    isVideoLoading(): boolean {
        return this.videoLoading && this.currentMediaType === 'video';
    }
}