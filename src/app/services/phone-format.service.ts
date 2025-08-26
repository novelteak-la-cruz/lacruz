import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneFormatService {

  constructor() { }

  /**
   * Formats a Costa Rican phone number for display
   * @param phoneNumber The phone number to format (e.g., '+50687053354')
   * @returns Formatted phone number (e.g., '+506 8705-3354')
   */
  formatForDisplay(phoneNumber: string): string {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters except the leading +
    const cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Handle Costa Rican phone numbers (+506)
    if (cleaned.startsWith('+506')) {
      const number = cleaned.substring(4); // Remove '+506'
      
      if (number.length === 8) {
        // Format as: +506 ####-####
        return `+506 ${number.substring(0, 4)}-${number.substring(4)}`;
      }
    }
    
    // If it doesn't match expected format, return original
    return phoneNumber;
  }

  /**
   * Formats a phone number for tel: links (removes formatting)
   * @param phoneNumber The phone number to format
   * @returns Clean phone number for tel: links (e.g., '+50687053354')
   */
  formatForTel(phoneNumber: string): string {
    if (!phoneNumber) return '';
    
    // Keep only digits and the leading +
    return phoneNumber.replace(/[^\d+]/g, '');
  }

  /**
   * Formats a phone number for WhatsApp (removes all non-digits)
   * @param phoneNumber The phone number to format
   * @returns Clean phone number for WhatsApp (e.g., '50687053354')
   */
  formatForWhatsApp(phoneNumber: string): string {
    if (!phoneNumber) return '';
    
    // Remove all non-digit characters
    return phoneNumber.replace(/[^\d]/g, '');
  }

  /**
   * Creates a WhatsApp link with a formatted phone number
   * @param phoneNumber The phone number
   * @param message The message to pre-fill
   * @returns Complete WhatsApp URL
   */
  createWhatsAppLink(phoneNumber: string, message: string = ''): string {
    const cleanPhone = this.formatForWhatsApp(phoneNumber);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }
}
