# AGENTS.md — web-core

## Objetivo

`web-core` contiene solo piezas realmente reutilizables para webs, blogs y templates comerciales.

## Que puede entrar

- helpers transversales
- utilidades de contenido
- SEO compartido
- JSON-LD y metadatos
- componentes UI base sin branding
- estilos globales minimos y reutilizables
- estructuras de blog, navegacion y layout generico

## Que NO puede entrar

- branding de un cliente concreto
- copy de marketing cerrado
- paginas especificas
- logica exclusiva de una app
- hacks temporales
- dependencias innecesarias

## Reglas

- Prioriza compatibilidad hacia atras cuando la API ya exista.
- Evita breaking changes silenciosos.
- Si cambias una API exportada, documenta el impacto en `README.md`.
- Manten las dependencias al minimo.
- Prioriza estabilidad y claridad sobre refactor agresivo.
- No trabajes directamente en `main` para cambios medianos o grandes.
- Si el cambio toca 3 o mas archivos, afecta SEO, blog, estilos globales, componentes UI compartidos o exports del paquete, usa rama dedicada y PR.
