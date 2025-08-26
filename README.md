# Real Estate Landing Page

Una aplicación profesional de Angular 19 para la venta de propiedades en bienes raíces, especializada en la promoción de una propiedad de 13 hectáreas en Liberia, Guanacaste, Costa Rica.

## 🏡 Características

- **Diseño Moderno**: Landing page profesional con gradientes y animaciones
- **Bilingüe**: Soporte completo para Español e Inglés
- **Responsive**: Adaptado para móviles, tablets y desktop
- **SSR**: Server-Side Rendering habilitado para mejor SEO
- **Componentes Modulares**: Arquitectura escalable con componentes standalone

## 🛠️ Tecnologías

- **Angular 19.1.9** con SSR
- **TypeScript 5.7.3**
- **SCSS** para estilos
- **RxJS** para manejo de estado
- **Font Awesome** para iconos
- **Bootstrap** para modales

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── header/              # Navegación y selector de idioma
│   │   ├── hero/                # Sección principal con video
│   │   ├── property-features/   # Características de la propiedad
│   │   ├── location-benefits/   # Beneficios de ubicación
│   │   ├── contact-form/        # Formulario de contacto
│   │   └── footer/              # Pie de página
│   ├── models/                  # Interfaces TypeScript
│   ├── services/               # Servicios de datos y idioma
│   └── app.component.*         # Componente raíz
├── styles.scss                # Estilos globales
└── assets/                    # Recursos estáticos
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 20.x o superior
- npm 11.x o superior
- Angular CLI 19.x

### Instalación

1. Clonar el repositorio:
```bash
git clone <repository-url>
cd real-estate
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar en modo desarrollo:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Scripts Disponibles

- `npm start` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run watch` - Build en modo watch
- `npm test` - Ejecutar tests
- `npm run serve:ssr:real-estate` - Servidor SSR

## 🏡 Información de la Propiedad

### Ubicación
- **Lugar**: Liberia, Guanacaste, Costa Rica
- **Área**: 13.2347 hectáreas (132,347 m²)
- **Precio**: $2,500,000 USD

### Características Principales
- Proximidad al Aeropuerto Internacional de Liberia (5 km)
- Zonificación comercial/residencial
- Ideal para desarrollos turísticos
- Acceso a servicios públicos
- Potencial para centros comerciales

### Contacto
- **Agente**: María González
- **Teléfono**: +506 8888-8888
- **Email**: maria@example.com
- **WhatsApp**: +506 8888-8888

## 🎨 Personalización

### Cambiar Idioma
El sistema soporta español e inglés. El servicio `LanguageService` maneja las traducciones.

### Modificar Datos de Propiedad
Editar el archivo `src/app/services/property.service.ts` para actualizar:
- Información de la propiedad
- Precios y características
- Datos de contacto
- Imágenes y videos

### Personalizar Estilos
- **Colores**: Modificar variables en `src/styles.scss`
- **Componentes**: Cada componente tiene su propio archivo SCSS
- **Responsive**: Los breakpoints están en `src/styles.scss`

## 📱 Funcionalidades

### Componentes Principales

1. **Header**
   - Navegación responsive
   - Selector de idioma
   - Menú hamburguesa para móviles

2. **Hero**
   - Video de fondo
   - Estadísticas de la propiedad
   - Botones de llamada a la acción

3. **Property Features**
   - Grid de características
   - Galería de imágenes con modal
   - Proyectos ideales sugeridos

4. **Location Benefits**
   - Lista de beneficios de ubicación
   - Tarjetas de estadísticas
   - Visualización de proximidad

5. **Contact Form**
   - Tarjeta del agente inmobiliario
   - Métodos de contacto múltiples
   - Formulario con validación
   - Integración con WhatsApp

6. **Footer**
   - Información de la empresa
   - Datos de contacto
   - Enlaces a redes sociales

## 🔧 Configuración Avanzada

### SEO
El proyecto incluye SSR para mejor indexación en motores de búsqueda.

### Performance
- Lazy loading de componentes
- Optimización de imágenes
- Minificación automática en producción

### Internacionalización
Sistema completo de i18n con:
- Traducciones en tiempo real
- Almacenamiento de preferencia de idioma
- Contenido dinámico bilingüe

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, contactar a:
- **Email**: soporte@realestate.com
- **Tel**: +506 2222-2222

## 📄 Licencia

Este proyecto es propietario y está protegido por derechos de autor.

---

**Desarrollado con ❤️ usando Angular 19**
