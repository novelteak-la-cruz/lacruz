import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { ContactForm } from '../models/property.model';

export interface EmailResponse {
    success: boolean;
    message: string;
    messageId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class EmailService {
    // Configuración de EmailJS - IMPORTANTE: Reemplazar con tus credenciales reales
    private readonly serviceId = 'novelteak_realestate'; // Reemplazar con tu Service ID
    private readonly templateId = 'template_qnro0vs'; // Reemplazar con tu Template ID  
    private readonly confirmationTemplateId = 'template_qnro0vs'; // Template para confirmaciones
    private readonly publicKey = '7q58jczuwCVFUbKPQ'; // Reemplazar con tu Public Key

    private readonly recipientEmail = 'realestate@novelteak.com';

    constructor() {
        // Inicializar EmailJS con tu public key
        emailjs.init(this.publicKey);
    }

    /**
     * Envía un correo electrónico con los datos del formulario de contacto usando EmailJS
     */
    sendContactEmail(contactForm: ContactForm): Observable<EmailResponse> {
        const templateParams = {
            to_email: this.recipientEmail,
            from_name: contactForm.name,
            from_email: contactForm.email,
            phone: contactForm.phone || 'No proporcionado',
            message: contactForm.message,
            property_id: contactForm.propertyId,
            language: contactForm.language === 'en' ? 'English' : 'Español',
            date: new Date().toLocaleString(contactForm.language === 'en' ? 'en-US' : 'es-ES'),
            subject: contactForm.language === 'en'
                ? `New Property Inquiry - ${contactForm.name}`
                : `Nueva Consulta de Propiedad - ${contactForm.name}`,
            // Campos adicionales para el template
            property_title: contactForm.language === 'en'
                ? '15.9 Hectares for Sale in La Cruz'
                : 'Propiedad de 15,9 Hectáreas en Venta en La Cruz'
        };

        return from(
            emailjs.send(this.serviceId, this.templateId, templateParams)
        ).pipe(
            map((response: EmailJSResponseStatus) => {
                console.log('Email sent successfully via EmailJS:', response);
                return {
                    success: true,
                    message: 'Email sent successfully',
                    messageId: response.text
                } as EmailResponse;
            }),
            catchError((error) => {
                console.error('Error sending email via EmailJS:', error);
                return throwError(() => new Error('Failed to send email. Please try again later.'));
            })
        );
    }

    /**
     * Envía un email de confirmación al usuario usando EmailJS
     */
    sendConfirmationEmail(contactForm: ContactForm): Observable<EmailResponse> {
        const isEnglish = contactForm.language === 'en';

        const confirmationParams = {
            to_email: contactForm.email,
            to_name: contactForm.name,
            subject: isEnglish
                ? 'Thank you for your inquiry - Novelteak Real Estate'
                : 'Gracias por tu consulta - Novelteak Real Estate',
            message: isEnglish
                ? `Dear ${contactForm.name},

Thank you for your interest in our property. We have received your inquiry and will get back to you within 24 hours.

In the meantime, feel free to contact us directly:
• Phone: +506 8705-3354
• WhatsApp: +506 8684-1571
• Email: realestate@novelteak.com

Best regards,
Novelteak Real Estate Team`
                : `Estimado/a ${contactForm.name},

Gracias por tu interés en nuestra propiedad. Hemos recibido tu consulta y te contactaremos dentro de 24 horas.

Mientras tanto, no dudes en contactarnos directamente:
• Teléfono: +506 8705-3354
• WhatsApp: +506 8684-1571
• Email: realestate@novelteak.com

Saludos cordiales,
Equipo Novelteak Real Estate`,
            property_id: contactForm.propertyId,
            phone_contact: '+506 8705-3354',
            whatsapp_contact: '+506 8684-1571',
            email_contact: 'realestate@novelteak.com'
        };

        // Usar template de confirmación si está disponible, sino usar el mismo template principal
        const templateToUse = this.confirmationTemplateId || this.templateId;

        return from(
            emailjs.send(this.serviceId, templateToUse, confirmationParams)
        ).pipe(
            map((response: EmailJSResponseStatus) => {
                console.log('Confirmation email sent successfully:', response);
                return {
                    success: true,
                    message: 'Confirmation email sent successfully',
                    messageId: response.text
                } as EmailResponse;
            }),
            catchError((error) => {
                console.error('Error sending confirmation email:', error);
                // No lanzamos error para confirmación, solo loggeamos
                return throwError(() => new Error('Failed to send confirmation email.'));
            })
        );
    }

    /**
     * Método simulado para desarrollo/testing
     * Eliminar en producción
     */
    sendEmailSimulated(contactForm: ContactForm): Observable<EmailResponse> {
        console.log('=== SIMULATED EMAIL SEND ===');
        console.log('To:', this.recipientEmail);
        console.log('From:', contactForm.name, '<' + contactForm.email + '>');
        console.log('Subject:', contactForm.language === 'en'
            ? `New Property Inquiry - ${contactForm.name}`
            : `Nueva Consulta de Propiedad - ${contactForm.name}`);
        console.log('Phone:', contactForm.phone || 'Not provided');
        console.log('Message:', contactForm.message);
        console.log('Property:', contactForm.propertyId);
        console.log('Language:', contactForm.language);
        console.log('============================');

        // Simular delay de red
        return new Observable<EmailResponse>(observer => {
            setTimeout(() => {
                observer.next({
                    success: true,
                    message: 'Email sent successfully (simulated)',
                    messageId: 'sim_' + Date.now()
                });
                observer.complete();
            }, 1500);
        });
    }
}
