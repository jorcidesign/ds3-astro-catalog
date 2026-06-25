# ds3-astro-catalog

## Stack
- **Language:** Vanilla TypeScript (ES2022+)
- **Build:** Vite
- **Styling:** CSS puro (sin frameworks)
- **Arquitectura:** Atomic Design

## Estructura
```
src/
├── components/
│   ├── atoms/        # Elementos indivisibles
│   ├── molecules/    # Agrupación funcional de átomos
│   └── organisms/    # Bloques complejos
├── templates/        # Layouts maestros
├── pages/            # Vistas enrutables
├── core/             # Motor base (Component, Router, etc.)
├── data/             # Contenido estático tipado
├── services/         # Capa de servicios
├── store/            # Estado global
├── controllers/      # Lógica de negocio
├── styles/           # CSS global y design tokens
└── utils/            # Utilidades puras
```

## Convenciones
- Cada componente tiene su propia carpeta con `index.ts` + `style.css`
- Todo componente hereda de la clase base `Component<P>`
- GPU acceleration: `transform: translate3d()` + `will-change: transform`
- Garbage Collection manual: `onDestroy()` en cascada
- Sin dependencias pesadas (no React, Vue, GSAP, Framer)

## Comandos
```bash
npm run dev      # Vite dev server con HMR
npm run build    # tsc + vite build
npm run preview  # Preview de build producción
npm run typecheck # Solo type checking
```
