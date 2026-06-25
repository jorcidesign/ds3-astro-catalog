# ds3-astro-catalog

## Stack
- **Framework:** Astro (SSG)
- **Language:** Vanilla TypeScript (ES2022+)
- **Styling:** CSS puro (sin frameworks)
- **Arquitectura:** Atomic Design

## Estructura
```
src/
├── components/
│   ├── atoms/              # Vanilla TS — elementos indivisibles e interactivos
│   ├── molecules/          # Vanilla TS — agrupación funcional de átomos
│   └── organisms/          # Vanilla TS — bloques complejos e interactivos
├── astro-components/       # .astro — componentes estáticos sin interactividad
├── layouts/                # Astro layouts (reemplazan templates/)
├── pages/                  # Astro file-based routing (reemplazan Router.ts)
├── core/                   # Motor base (Component, ScrollManager, etc.)
├── data/                   # Contenido estático tipado
├── services/               # Capa de servicios
├── store/                  # Estado global
├── controllers/            # Lógica de negocio
├── styles/                 # CSS global y design tokens
└── utils/                  # Utilidades puras
```

## Convenciones
- **Componentes interactivos (Vanilla TS):** `src/components/**/index.ts` + `style.css`, heredan de `Component<P>`, GPU acceleration, GC manual
- **Componentes estáticos:** `.astro` en `astro-components/`, sin JS en cliente
- **Montaje de Vanilla TS:** dentro de bloque `<script>` en páginas/layouts Astro
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
