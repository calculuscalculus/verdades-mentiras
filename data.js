// Datos de los acertijos de Caballeros y Bribones.
// Caballero = siempre dice la verdad; Bribón = siempre miente.
// Cada problema define: personajes, sus declaraciones (en código),
// la solución esperada y una explicación didáctica.

const PROBLEMAS = [
  // ===================== NIVEL INTRODUCTORIO =====================
  {
    id: 1,
    nivel: "introductorio",
    titulo: "Una declaración verdadera",
    enunciado:
      "En la isla de los caballeros y los bribones, A dice: «2 + 2 = 4»." +
      " ¿Es A caballero o bribón?",
    personajes: ["A"],
    declaraciones: [
      { quien: "A", texto: "2 + 2 = 4" }
    ],
    soluciones: [
      { A: "caballero" }
    ],
    explicacion:
      "La declaración «2 + 2 = 4» es objetivamente verdadera. Un bribón solo " +
      "puede declarar cosas falsas, por lo que no podría pronunciarla. Un " +
      "caballero, en cambio, dice la verdad. Por tanto, A es caballero."
  },
  {
    id: 2,
    nivel: "introductorio",
    titulo: "Una declaración falsa",
    enunciado:
      "En la misma isla, B dice: «2 + 2 = 5». ¿Es B caballero o bribón?",
    personajes: ["B"],
    declaraciones: [
      { quien: "B", texto: "2 + 2 = 5" }
    ],
    soluciones: [
      { B: "bribon" }
    ],
    explicacion:
      "«2 + 2 = 5» es objetivamente falsa. Un caballero nunca podría decirla " +
      "(siempre dice la verdad). Un bribón, en cambio, siempre miente, así " +
      "que encaja perfectamente: B es bribón."
  },
  {
    id: 3,
    nivel: "introductorio",
    titulo: "Ecos mutuos",
    enunciado:
      "A dice: «B es caballero». B dice: «A es caballero». " +
      "¿Qué son A y B? (Pista: hay dos respuestas posibles).",
    personajes: ["A", "B"],
    declaraciones: [
      { quien: "A", texto: "B es caballero" },
      { quien: "B", texto: "A es caballero" }
    ],
    soluciones: [
      { A: "caballero", B: "caballero" },
      { A: "bribon", B: "bribon" }
    ],
    explicacion:
      "Si A es caballero, su declaración es verdad y B es caballero; entonces " +
      "la de B también es verdad: ambos caballeros. Si A es bribón, su " +
      "declaración es mentira, así que B es bribón; entonces la de B también " +
      "es mentira (dice que A es caballero siendo falso): ambos bribones. " +
      "No hay forma de decidir entre las dos con la información dada."
  },

  // ===================== NIVEL BÁSICO =====================
  {
    id: 4,
    nivel: "basico",
    titulo: "El mismo tipo",
    enunciado:
      "A dice: «B es caballero». B dice: «A y yo somos del mismo tipo». " +
      "¿Qué son A y B?",
    personajes: ["A", "B"],
    declaraciones: [
      { quien: "A", texto: "B es caballero" },
      { quien: "B", texto: "A y B son del mismo tipo" }
    ],
    soluciones: [
      { A: "caballero", B: "caballero" }
    ],
    explicacion:
      "Supongamos A caballero: entonces B es caballero y la declaración de B " +
      "(«somos del mismo tipo») es verdadera: todo encaja, ambos caballeros. " +
      "Supongamos A bribón: su declaración es mentira, así que B es bribón; " +
      "pero entonces la declaración de B («somos del mismo tipo») sería " +
      "verdadera (ambos bribones), y un bribón no puede decir la verdad. " +
      "Contradicción. La única solución es A y B caballeros."
  },
  {
    id: 5,
    nivel: "basico",
    titulo: "El acuso a mi vecino",
    enunciado:
      "A dice: «B es bribón». B dice: «A y yo somos del mismo tipo». " +
      "¿Qué son A y B?",
    personajes: ["A", "B"],
    declaraciones: [
      { quien: "A", texto: "B es bribón" },
      { quien: "B", texto: "A y B son del mismo tipo" }
    ],
    soluciones: [
      { A: "caballero", B: "bribon" }
    ],
    explicacion:
      "Si A es caballero, B es bribón. La declaración de B («somos del mismo " +
      "tipo») es entonces falsa (uno de cada), y como B es bribón miente: " +
      "encaja. Si A fuese bribón, su declaración sería mentira y B caballero; " +
      "pero entonces la de B sería falsa (son de distinto tipo) siendo B " +
      "caballero, lo cual es imposible. Solución: A caballero, B bribón."
  },
  {
    id: 6,
    nivel: "basico",
    titulo: "Tres sospechosos",
    enunciado:
      "A dice: «B es bribón». B dice: «A es bribón». C dice: «A es caballero». " +
      "¿Qué son A, B y C? (Hay dos soluciones posibles).",
    personajes: ["A", "B", "C"],
    declaraciones: [
      { quien: "A", texto: "B es bribón" },
      { quien: "B", texto: "A es bribón" },
      { quien: "C", texto: "A es caballero" }
    ],
    soluciones: [
      { A: "caballero", B: "bribon", C: "caballero" },
      { A: "bribon", B: "caballero", C: "bribon" }
    ],
    explicacion:
      "Si A caballero: B es bribón, y la de B («A es bribón») es mentira, " +
      "correcto. C dice «A es caballero», verdad, así que C caballero. " +
      "Primera solución. Si A bribón: B es caballero y la de B («A es " +
      "bribón») es verdad, correcto. C dice «A es caballero», mentira, así " +
      "que C bribón. Segunda solución. Las dos son coherentes."
  },

  // ===================== NIVEL INTERMEDIO =====================
  {
    id: 7,
    nivel: "intermedio",
    titulo: "Nadie igual a nadie",
    enunciado:
      "A dice: «Todos somos del mismo tipo». B dice: «A es bribón». " +
      "C dice: «A y B son de tipos diferentes». ¿Qué son A, B y C?",
    personajes: ["A", "B", "C"],
    declaraciones: [
      { quien: "A", texto: "A, B y C son del mismo tipo" },
      { quien: "B", texto: "A es bribón" },
      { quien: "C", texto: "A y B son de tipos diferentes" }
    ],
    soluciones: [
      { A: "bribon", B: "caballero", C: "caballero" }
    ],
    explicacion:
      "Si A caballero, su declaración fuerza a que los tres sean caballeros; " +
      "pero entonces la de B («A es bribón») sería verdad siendo falsa: " +
      "contradicción. Luego A es bribón, y su declaración («todos del mismo " +
      "tipo») es mentira: no lo son. B dice «A es bribón», que es verdad, " +
      "así que B es caballero. C dice «A y B son de tipos diferentes», y " +
      "efectivamente A (bribón) y B (caballero) lo son: C es caballero. " +
      "Solución única: A bribón, B caballero, C caballero."
  },
  {
    id: 8,
    nivel: "intermedio",
    titulo: "El tribunal",
    enunciado:
      "A dice: «B y C son del mismo tipo». B dice: «C es bribón». " +
      "C dice: «B y yo somos del mismo tipo». ¿Qué son A, B y C?",
    personajes: ["A", "B", "C"],
    declaraciones: [
      { quien: "A", texto: "B y C son del mismo tipo" },
      { quien: "B", texto: "C es bribón" },
      { quien: "C", texto: "B y C son del mismo tipo" }
    ],
    soluciones: [
      { A: "bribon", B: "caballero", C: "bribon" }
    ],
    explicacion:
      "Empecemos por B y C. Si B caballero, C es bribón y la de C «somos del " +
      "mismo tipo» es mentira (son distintos): encaja, C bribón. Si B bribón, " +
      "su «C es bribón» es mentira, así C caballero; pero entonces la de C " +
      "(«somos del mismo tipo») sería verdad siendo B y C distintos: un " +
      "caballero no miente, contradicción. Así B caballero, C bribón. " +
      "Ahora A dice «B y C son del mismo tipo», pero son distintos: mentira, " +
      "luego A es bribón. Solución única: A bribón, B caballero, C bribón."
  },
  {
    id: 9,
    nivel: "intermedio",
    titulo: "La cadena",
    enunciado:
      "Cuatro isleños. A dice: «B es caballero». B dice: «C es caballero». " +
      "C dice: «D es caballero». D dice: «A es caballero». " +
      "¿Qué son A, B, C y D? (Hay dos soluciones posibles).",
    personajes: ["A", "B", "C", "D"],
    declaraciones: [
      { quien: "A", texto: "B es caballero" },
      { quien: "B", texto: "C es caballero" },
      { quien: "C", texto: "D es caballero" },
      { quien: "D", texto: "A es caballero" }
    ],
    soluciones: [
      { A: "caballero", B: "caballero", C: "caballero", D: "caballero" },
      { A: "bribon", B: "bribon", C: "bribon", D: "bribon" }
    ],
    explicacion:
      "Observa la simetría: cada uno afirma que el siguiente es caballero, " +
      "y el último cierra el círculo afirmando que A lo es. Si A es caballero, " +
      "entonces B también, y por la cadena C y D también lo son; la de D " +
      " («A es caballero») es verdad: los cuatro caballeros. Si A es bribón, " +
      "su declaración es mentira, así B bribón, y por la cadena C y D bribones; " +
      "la de D («A es caballero») es mentira, correcto: los cuatro bribones. " +
      "Ambas soluciones cierran el círculo a la perfección."
  }
];

// Exponer para uso en el navegador.
if (typeof window !== "undefined") {
  window.PROBLEMAS = PROBLEMAS;
}
