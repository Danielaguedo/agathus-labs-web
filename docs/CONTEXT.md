# Agathus Labs — Contexto y estado del proyecto

Base de conocimiento local. Resume qué es el proyecto, con qué está construido, en qué punto se encuentra y qué falta por hacer. Las reglas de diseño obligatorias viven en [`CLAUDE.md`](../CLAUDE.md); este documento no las reemplaza.

Última actualización: 2026-10-11

## Proyecto

**Agathus Labs** — Laboratorio de Manufactura Digital y Bioingeniería.

## Stack técnico

- **Next.js 16** (App Router, TypeScript), exportado como sitio estático
- **Tailwind CSS v4**
- **Framer Motion**
- **Playwright** para las pruebas de UI (Chromium, escritorio y móvil)

## Estética / UI

Dirección visual: **"Clinical Cyberpunk"** — la interfaz de un slicer o de un equipo médico, no una plantilla SaaS.

| Proporción | Rol | Uso |
| --- | --- | --- |
| 60 % | Dark void | Fondo de página y superficies |
| 30 % | Blanco clínico / Verde quirúrgico | Texto principal; el verde marca elementos médicos y de confianza |
| 10 % | Violeta / Acento neón | Numerales, estados interactivos, foco, líneas de escaneo y acentos HUD |

- Elementos HUD sobre cada zona de medios.
- Sensación de interfaz de slicer: líneas de 1 px, numeración 01–04, retícula asimétrica de 12 columnas.

## Servicios core

1. **Segmentación de Imágenes Médicas**
2. **Diseño CAD Paramétrico**
3. **Impresión 3D Industrial** (incluye NFC)

## Progreso actual (checkpoint)

- Migración a Next.js completada.
- Tests en Playwright pasando 20/20.
- Repositorio inicializado y conectado a GitHub / Vercel.

## Siguientes pasos pendientes

- [ ] **a)** Subir videos e imágenes a `public/media/`: Bambu Lab P1S y capturas DICOM anonimizadas.
- [ ] **b)** Configurar el canal de contacto (WhatsApp / Email) en la sección 04.
- [ ] **c)** Comprar el vernier digital.
