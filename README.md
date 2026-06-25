# DS3 Astro Catalog 🚀

Este proyecto es un catálogo web de productos de telecomunicaciones y cableado estructurado de alto rendimiento, desarrollado para **DS3 Comunicaciones**. Está estructurado bajo un enfoque de **Static Site Generation (SSG)** para garantizar la velocidad de carga más rápida del mercado, optimización SEO insuperable y una experiencia de usuario fluida tanto en dispositivos móviles como de escritorio.

---

## 🛠️ Justificación Tecnológica (El porqué de las tecnologías)

### 1. Astro (SSG & Arquitectura de Islas)
* **Rendimiento Máximo:** Astro compila a HTML estático casi puro por defecto, eliminando la sobrecarga de JavaScript en el cliente (*Zero JS by default*). La interactividad necesaria se carga de forma diferida usando su arquitectura de islas.
* **Content Collections (Validación Estricta):** Permite manejar datos estáticos estructurados con validación estricta en tiempo de compilación mediante **Zod**, lo que evita errores de consistencia en nombres de atributos, URLs de imágenes vacías o SKU duplicados.
* **SEO Excepcional:** Al generar todo el HTML en tiempo de compilación, los motores de búsqueda (Google, Bing) indexan instantáneamente el contenido con una puntuación perfecta en Core Web Vitals.

### 2. Cloudflare Pages (Alojamiento en el Edge)
* **Distribución Global:** El catálogo se distribuye instantáneamente a lo largo del CDN global de Cloudflare, entregando las páginas desde el servidor más cercano al cliente final.
* **Costo Cero & Escalabilidad Infinita:** Soporta millones de visitas simultáneas sin incurrir en costes de servidor o base de datos tradicional, eliminando riesgos de caídas del sitio.
* **Deploys Git-Based:** Integración directa con GitHub. Cada commit en la rama `main` o `develop` gatilla un build automatizado en segundos, con enlaces de previsualización independientes para pruebas.

### 3. SCSS & Design System v2 (CSS Vanilla con Tokens)
* **Sin Sobrecarga de Frameworks:** No se utilizó TailwindCSS ni Bootstrap. Se implementó una arquitectura SCSS ligera basada en un **sistema de tokens globales** (definidos en [_tokens.scss](file:///mnt/Almacen/Dev_Projects/ds3-astro-catalog/src/styles/_tokens.scss)).
* **Responsividad Fluida:** Se implementaron fuentes y espaciados basados en funciones CSS `clamp()` nativas, adaptándose armónicamente y de manera automática a cualquier tamaño de pantalla (mobile, tablet, desktop) sin breakpoints toscos.

---

## 📂 Estructura de Carpetas y Datos

El proyecto sigue una arquitectura organizada y limpia:

```
ds3-astro-catalog/
├── src/
│   ├── astro-components/    # Componentes atómicos de Astro (ej. galerías, pestañas, FAQ)
│   ├── content/             # Directorio de datos (Astro Content Collections)
│   │   ├── site/            # Configuración general y menús de navegación (JSON)
│   │   └── products/        # Datos de productos organizados por carpetas de marcas
│   │       └── amp/         # Archivos JSON individuales por producto de la marca AMP
│   ├── layouts/             # Plantillas maestras (ej. MainLayout con Header y Footer)
│   ├── pages/               # Enrutamiento basado en archivos de Astro
│   │   ├── index.astro      # Home de la aplicación
│   │   ├── productos/
│   │   │   └── [brand]/[slug].astro  # Generación SSG dinámica de páginas de detalle
│   │   └── marcas/          # Páginas filtradas por marcas
│   ├── styles/              # Design System con SCSS
│   │   ├── _tokens.scss     # Definición de colores, tipografías y espaciados fluidos
│   │   └── main.scss        # Punto de entrada de estilos globales
│   ├── types.ts             # Tipados inferidos de las Content Collections
│   └── utils/               # Funciones de ayuda puras de TypeScript
```

### Gestión de Datos de Productos
Los productos se definen individualmente como archivos `.json` dentro de `src/content/products/[brand]/[sku].json`.
Cada archivo es validado contra un esquema estricto de **Zod** en [content.config.ts](file:///mnt/Almacen/Dev_Projects/ds3-astro-catalog/src/content.config.ts). Esto asegura que todo producto cuente de forma obligatoria con:
* `slug`, `sku` y `name`.
* Estructuras de precios estandarizadas (`price` con campos de IGV, tipo de moneda y unidades).
* Arreglo de imágenes con roles específicos (`main`, `gallery`, `box`).
* Metadatos SEO, Schema.org estructurado y especificaciones específicas para tipos de producto (cables, conectores, etc.).

---

## 🎯 Requerimiento Principal Implementado

El núcleo del desarrollo se centró en la **ficha técnica del producto en su versión responsiva**, cuidando meticulosamente los siguientes aspectos:

1. **Galería Multimedia Interactiva:**
   * Carrusel táctil optimizado para móviles con navegación por gestos (`touch-action`).
   * Visualizador modal a pantalla completa con zoom táctil inteligente y controles de cierre rápidos.
2. **Caja Flotante Sticky de Acciones (Sidebar):**
   * En pantallas grandes (Desktop), la caja de precios, selector de cantidad y botones de llamada a la acción (WhatsApp / Descarga de Datasheet) se mantiene fija al hacer scroll.
   * En móviles, se transforma en una barra de acciones fija en la parte inferior para facilitar la conversión inmediata.
3. **Sistema de Pestañas (Tabs) Responsivo:**
   * Muestra de forma limpia la descripción extendida, tabla de especificaciones técnicas formateada, aplicaciones recomendadas y un acordeón de Preguntas Frecuentes (FAQ).
   * En móviles, la navegación de las pestañas cuenta con scroll horizontal suave y un indicador visual degradado para evitar el desborde y asegurar la usabilidad.
4. **Navegación de Categorías:**
   * Menú de subcategorías dinámico según la marca seleccionada con scroll y foco automático en el elemento activo, mejorando la navegación interna.

---

## 🔒 El Tema de CORS en las Imágenes

Las imágenes del catálogo se consumen de manera externa desde el servidor principal de DS3: `https://www.ds3comunicaciones.com/AMP/images/`.

### Diagnóstico y Comportamiento actual:
* **Etiquetas `<img>` nativas:** Funcionan perfectamente. Los navegadores permiten renderizar imágenes externas sin restricciones porque se consideran recursos pasivos de presentación. Hemos incluido `referrerpolicy="no-referrer"` para mitigar bloqueos de seguridad del servidor de origen.
* **Limitaciones por CORS (Cross-Origin Resource Sharing):** Si la lógica cliente-servidor requiriera manipular estas imágenes mediante JavaScript (por ejemplo, cargándolas en un `<canvas>` para realizar zoom interactivo avanzado por píxeles o permitiendo su descarga mediante un `fetch()`), el navegador las bloqueará a menos que `www.ds3comunicaciones.com` devuelva la cabecera `Access-Control-Allow-Origin: *`.

### Recomendaciones y Soluciones:
1. **Subida de imágenes al hosting local (Recomendado a futuro):** Mudar la carpeta de imágenes al repositorio del catálogo o un bucket de almacenamiento CDN propio (como Cloudflare R2). Esto elimina dependencias externas y problemas de CORS por completo.
2. **Configuración del Servidor de Origen:** Configurar el servidor de Apache/IIS en `www.ds3comunicaciones.com` para que añada la cabecera CORS permitiendo peticiones desde el dominio del catálogo.
3. **Proxy Inverso / Cloudflare Worker:** Crear una regla de Cloudflare que actúe como proxy, reescribiendo la URL de las imágenes bajo el mismo dominio del catálogo para burlar la política del mismo origen (Same-Origin).

---

## 📈 Siguientes Pasos en Escalabilidad

A medida que el catálogo crezca de decenas a miles de productos, se sugieren los siguientes pasos evolutivos:

### 1. Integración con un CMS Headless (Gestión de Contenidos)
* **Problema:** Editar archivos `.json` locales en Git no es viable para personal no técnico.
* **Solución:** Conectar un CMS como **Strapi**, **Sanity** o **Decap CMS**. Astro consumirá los productos mediante una API rest o GraphQL en tiempo de build, manteniendo las ventajas de velocidad del SSG sin requerir que los editores abran código.

### 2. Renderizado Híbrido o SSR (Server-Side Rendering)
* **Problema:** Si el volumen de productos supera los 10,000, el tiempo de compilación estática (build) puede tardar varios minutos.
* **Solución:** Habilitar el adaptador `@astrojs/cloudflare` en modo híbrido. Esto permite renderizar estáticamente las páginas principales y marcas más vendidas (SSG), mientras que las fichas de productos menos visitados se generan dinámicamente en el Edge bajo demanda (SSR) con caché automático en Cloudflare, logrando builds instantáneos.

### 3. Motor de Búsqueda Indexado (Client-Side Search)
* **Solución:** Integrar **Pagefind**. Es una biblioteca de búsqueda estática de alto rendimiento para sitios generados estáticamente. Genera un índice de búsqueda ligero durante el build, permitiendo búsquedas instantáneas en tiempo real en miles de productos con un consumo de red minúsculo y sin servidor de base de datos externo.

---

## 💻 Comandos del Proyecto

Para trabajar con el repositorio localmente, utiliza los siguientes comandos estándar de Node:

```bash
# Iniciar el servidor de desarrollo local con Hot Module Replacement (HMR)
npm run dev

# Compilar el catálogo completo a HTML/CSS/JS estático listo para producción (carpeta dist/)
npm run build

# Previsualizar localmente la compilación de producción generada
npm run preview

# Ejecutar el validador de tipos TypeScript y chequeo de sintaxis de Astro
npm run typecheck
```
