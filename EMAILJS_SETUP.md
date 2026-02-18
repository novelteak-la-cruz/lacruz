# Configuración de EmailJS para Formulario de Contacto

EmailJS permite enviar correos electrónicos directamente desde el frontend sin necesidad de un backend. Es perfecto para GitHub Pages.

## Pasos para configurar EmailJS:

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Regístrate con tu email
- Confirma tu cuenta

### 2. Configurar servicio de email
- En el dashboard, ve a "Email Services"
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, Yahoo, etc.)
- Sigue las instrucciones para conectar tu cuenta
- **Anota el Service ID** que se genera

### 3. Crear template de email
- Ve a "Email Templates"
- Haz clic en "Create New Template"
- Usa este template básico:

```html
Subject: {{subject}}

From: {{from_name}} <{{from_email}}>
Phone: {{phone}}
Property: {{property_title}} (ID: {{property_id}})
Language: {{language}}
Date: {{date}}

Message:
{{message}}

---
Este mensaje fue enviado desde el formulario de contacto del sitio web.
```

- **Anota el Template ID** que se genera

### 4. Obtener Public Key
- Ve a "Account" > "General"
- Copia tu **Public Key**

### 5. Actualizar el código
En `/src/app/services/email.service.ts`, reemplaza:

```typescript
private readonly serviceId = 'YOUR_SERVICE_ID'; // Tu Service ID aquí
private readonly templateId = 'YOUR_TEMPLATE_ID'; // Tu Template ID aquí  
private readonly publicKey = 'YOUR_PUBLIC_KEY'; // Tu Public Key aquí
```

### 6. Cambiar método en el componente
En `/src/app/components/contact-form/contact-form.component.ts`, línea 81:

Cambia:
```typescript
this.emailService.sendEmailSimulated(this.formData).subscribe({
```

Por:
```typescript
this.emailService.sendContactEmail(this.formData).subscribe({
```

## Template Variables disponibles:
- `{{to_email}}` - Email de destino (realestate@novelteak.com)
- `{{from_name}}` - Nombre del usuario
- `{{from_email}}` - Email del usuario
- `{{phone}}` - Teléfono del usuario
- `{{message}}` - Mensaje del usuario
- `{{property_id}}` - ID de la propiedad
- `{{property_title}}` - Título de la propiedad
- `{{language}}` - Idioma del formulario
- `{{date}}` - Fecha y hora del envío
- `{{subject}}` - Asunto del email

## Alternativa: Formspree
Si prefieres no usar EmailJS, puedes usar Formspree:

1. Ve a [https://formspree.io/](https://formspree.io/)
2. Regístrate y crea un nuevo formulario
3. Obtén tu endpoint URL
4. En el servicio, usa el método `sendEmailViaFormspree()`

## Testing
- El método `sendEmailSimulated()` está configurado para testing
- Revisa la consola del navegador para ver los datos del formulario
- Una vez configurado EmailJS, cambia al método real

## Límites gratuitos
- **EmailJS**: 200 emails/mes gratis
- **Formspree**: 50 submissions/mes gratis

## Seguridad
- Nunca expongas keys privadas en el frontend
- Los public keys de EmailJS están diseñados para uso público
- Configura filtros de dominio en EmailJS para mayor seguridad
