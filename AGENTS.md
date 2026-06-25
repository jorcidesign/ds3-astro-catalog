# ds3-astro-catalog

## Stack
- **Framework:** Astro (SSG)
- **Language:** Vanilla TypeScript (ES2022+)
- **Styling:** SCSS (Design System v2 con tokens globales)
- **Design System:** `src/styles/` — tokens, reset, tipografía fluida, grid, layout
- **Data:** Astro Content Collections (JSON + Zod schemas)
- **Arquitectura:** Atomic Design

## Estructura
```
src/
├── astro-components/       # .astro — componentes con HTML + scoped CSS + script
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
├── styles/                 # SCSS global — tokens, reset, tipografía, grid, layout
│   ├── _tokens.scss        # Design tokens (colores, tipografía fluida, spacing)
│   ├── _reset.scss         # Reset y base
│   ├── _typography.scss    # Utilidades de tipografía
│   ├── _grid.scss          # Sistema de grid y flex
│   ├── _layout.scss        # Helpers de layout (container, section, bg)
│   ├── _print.scss         # Estilos de impresión
│   └── main.scss           # Entry point del Design System
├── types.ts                # Tipos inferidos de Content Collections
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
- **Componentes interactivos:** La lógica JS va dentro de `<script>` en el propio `.astro` (no Vanilla TS separado)
- **Componentes estáticos:** `.astro` en `astro-components/`, sin JS en cliente
- **Estilos globales:** SCSS en `src/styles/` (tokens, reset, tipografía, grid, layout)
- **Estilos de componente:** `<style>` scoped dentro de cada `.astro` (incluye sus media queries responsive)
- **Data:** Content Collections con Zod schema en `src/content.config.ts`
- **Imágenes:** referencias remotas al servidor de DS3 (sin almacenamiento local)

## Comandos
```bash
npm run dev       # Astro dev server con HMR
npm run build     # Astro build (SSG → dist/)
npm run preview   # Preview de build producción
npm run typecheck # Astro check + TypeScript
```
