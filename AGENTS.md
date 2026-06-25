# ds3-astro-catalog

## Stack
- **Framework:** Astro (SSG)
- **Language:** Vanilla TypeScript (ES2022+)
- **Styling:** CSS puro (sin frameworks)
- **Data:** Astro Content Collections (JSON + Zod schemas)
- **Arquitectura:** Atomic Design

## Estructura
```
src/
├── components/
│   ├── atoms/              # Vanilla TS — elementos indivisibles e interactivos
│   ├── molecules/          # Vanilla TS — agrupación funcional de átomos
│   └── organisms/          # Vanilla TS — bloques complejos e interactivos
├── astro-components/       # .astro — componentes estáticos sin interactividad
├── content/                # Astro Content Collections
│   ├── products/           # Productos (JSON, organizados por marca)
│   │   └── amp/            # Productos AMP
│   └── site/               # Config global (config.json)
├── content.config.ts       # Schema Zod de Content Collections
├── layouts/                # Astro layouts
│   └── MainLayout.astro    # Layout maestro con Header + Footer
├── pages/                  # Astro file-based routing
│   ├── index.astro         # Home — marcas + destacados
│   ├── productos/
│   │   ├── index.astro     # Todos los productos
│   │   └── [brand]/[slug].astro  # Detalle de producto (SSG dinámico)
│   └── marcas/
│       └── [brand]/
│           └── index.astro # Página de marca
├── types.ts                # Tipos inferidos de Content Collections
├── core/                   # Motor base (Component, ScrollManager, etc.)
├── services/               # Capa de servicios
├── store/                  # Estado global
├── controllers/            # Lógica de negocio
├── styles/                 # CSS global y design tokens
└── utils/                  # Utilidades puras
```

## Rutas generadas
| Ruta | Página | Data source |
|---|---|---|
| `/` | Home (marcas + destacados) | `site:config` + `products` collection |
| `/productos/` | Catálogo completo | `products` collection |
| `/productos/:brand/:slug` | Detalle de producto | `products` entry por slug |
| `/marcas/:brand/` | Productos por marca | `products` filtrado por brand |

## Convenciones
- **Componentes interactivos (Vanilla TS):** `src/components/**/index.ts` + `style.css`, heredan de `Component<P>`, GPU acceleration, GC manual
- **Componentes estáticos:** `.astro` en `astro-components/`, sin JS en cliente
- **Montaje de Vanilla TS:** dentro de bloque `<script>` en páginas/layouts Astro
- **Data:** Content Collections con Zod schema en `src/content.config.ts`
- **Imágenes:** referencias remotas al servidor de DS3 (sin almacenamiento local)
- GPU acceleration: `transform: translate3d()` + `will-change: transform`
- Garbage Collection manual: `onDestroy()` en cascada
- Sin dependencias pesadas (no React, Vue, GSAP, Framer)

## Comandos
```bash
npm run dev       # Astro dev server con HMR
npm run build     # Astro build (SSG → dist/)
npm run preview   # Preview de build producción
npm run typecheck # Astro check + TypeScript
```
