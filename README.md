# Verdades y Mentiras — Acertijos de Caballeros y Bribones

Colección de **9 acertijos lógicos** del clásico tema *caballeros y bribones*
(caballeros siempre dicen la verdad, bribones siempre mienten), repartidos en
tres niveles de dificultad, con una página web interactiva para visualizarlos
y resolverlos.

## Niveles y problemas

| # | Nivel | Título | Personajes | Soluciones |
|---|-------|--------|-----------|------------|
| 1 | Introductorio | Una declaración verdadera | A | 1 |
| 2 | Introductorio | Una declaración falsa | B | 1 |
| 3 | Introductorio | Ecos mutuos | A, B | 2 |
| 4 | Básico | El mismo tipo | A, B | 1 |
| 5 | Básico | El acuso a mi vecino | A, B | 1 |
| 6 | Básico | Tres sospechosos | A, B, C | 2 |
| 7 | Intermedio | Nadie igual a nadie | A, B, C | 1 |
| 8 | Intermedio | El tribunal | A, B, C | 1 |
| 9 | Intermedio | La cadena | A, B, C, D | 2 |

Todas las soluciones están **verificadas por fuerza bruta** (ver carpeta de
notas de desarrollo): para cada problema se exploran las 2ⁿ asignaciones
posibles y se conservan aquellas en las que la declaración de cada personaje
es verdadera si y solo si es caballero.

## Estructura

```
.
├── index.html   # Estructura de la página
├── style.css    # Estilos
├── app.js       # Render dinámico e interacción
├── data.js      # Los 9 problemas en formato JSON
└── README.md
```

La página es **estática y sin dependencias**: ábrela con cualquier navegador
directamente, o sírvela con GitHub Pages (ver más abajo).

## Uso local

Simplemente abre `index.html` en el navegador. Como los datos viven embebidos
en `data.js` (cargado con `<script>`), **no requiere servidor** ni conexión.

## Verificación lógica

Para comprobar las soluciones con Node.js:

```bash
node verificar.js   # script de fuerza bruta (carpeta de desarrollo)
```

## Página en GitHub Pages

El repositorio está pensado para publicarse con GitHub Pages:

1. Subir el repositorio a GitHub.
2. Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
3. La página queda disponible en
   `https://<usuario>.github.io/verdades-mentiras/`.

## Cómo se resuelven

- Un **caballero** siempre dice proposiciones **verdaderas**.
- Un **bribón** siempre dice proposiciones **falsas**.
- Para cada persona, supón un tipo y comprueba que su declaración sea
  verdadera (si caballero) o falsa (si bribón). Si todas las declaraciones
  encajan, la asignación es solución.
