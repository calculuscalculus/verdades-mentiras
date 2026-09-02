// Render dinámico e interacción de los acertijos.
(() => {
  const PROBLEMAS = window.PROBLEMAS || [];
  const lista = document.getElementById("lista");
  const plantilla = document.getElementById("plantilla");
  const filtros = document.getElementById("filtros");

  // estado por problema: id -> { [persona]: "caballero" | "bribon" | null }
  const estado = {};
  PROBLEMAS.forEach((p) => {
    estado[p.id] = {};
    p.personajes.forEach((pers) => (estado[p.id][pers] = null));
  });

  let nivelActivo = "introductorio";

  function nivelEtq(n) {
    return { introductorio: "Introductorio", sencillo: "Sencillo", intermedio: "Intermedio" }[n] || n;
  }

  function fmtSoluciones(sols) {
    return sols
      .map((s) => {
        const parts = Object.entries(s).map(
          ([k, v]) => `${k}=${v === "caballero" ? "Cab." : "Bri."}`
        );
        return `[${parts.join(", ")}]`;
      })
      .join("  o  ");
  }

  function renderProblema(p) {
    const node = plantilla.content.firstElementChild.cloneNode(true);
    node.dataset.id = p.id;
    node.dataset.nivel = p.nivel;

    const nivel = node.querySelector(".nivel");
    nivel.textContent = nivelEtq(p.nivel);
    nivel.dataset.n = p.nivel;
    node.querySelector(".titulo").textContent = `${p.id}. ${p.titulo}`;
    node.querySelector(".enunciado").textContent = p.enunciado;

    // Declaraciones
    const decs = node.querySelector(".declaraciones");
    p.declaraciones.forEach((d) => {
      const el = document.createElement("div");
      el.className = "dec";
      el.innerHTML = `<b>${d.quien}:</b> «${d.texto}»`;
      decs.appendChild(el);
    });

    // Controles: por cada personaje, un par de botones Caballero/Bribón
    const controles = node.querySelector(".controles");
    p.personajes.forEach((pers) => {
      const wrap = document.createElement("div");
      wrap.className = "persona";
      wrap.innerHTML = `<span class="nombre">${pers}</span>`;
      const opc = document.createElement("span");
      opc.className = "opc";
      ["caballero", "bribon"].forEach((t) => {
        const b = document.createElement("button");
        b.type = "button";
        b.dataset.t = t;
        b.textContent = t === "caballero" ? "Caballero" : "Bribón";
        b.addEventListener("click", () => {
          estado[p.id][pers] = estado[p.id][pers] === t ? null : t;
          actualizarBotones(node, p);
          limpiarResultado(node);
        });
        opc.appendChild(b);
      });
      wrap.appendChild(opc);
      controles.appendChild(wrap);
    });

    // Acciones
    const acciones = document.createElement("div");
    acciones.className = "acciones";
    const comprobar = document.createElement("button");
    comprobar.className = "btn primario";
    comprobar.textContent = "Comprobar";
    comprobar.addEventListener("click", () => comprobarRespuesta(node, p));
    const reiniciar = document.createElement("button");
    reiniciar.className = "btn";
    reiniciar.textContent = "Reiniciar";
    reiniciar.addEventListener("click", () => {
      p.personajes.forEach((pers) => (estado[p.id][pers] = null));
      actualizarBotones(node, p);
      limpiarResultado(node);
    });
    const verSol = document.createElement("button");
    verSol.className = "btn";
    verSol.textContent = "Ver solución";
    verSol.addEventListener("click", () => mostrarSolucion(node, p));
    acciones.append(comprobar, reiniciar, verSol);
    controles.appendChild(acciones);

    // Soluciones posibles (texto tenue)
    const sols = document.createElement("div");
    sols.className = "soluciones";
    sols.style.display = "none";
    sols.textContent = `Soluciones válidas: ${fmtSoluciones(p.soluciones)}`;
    node.querySelector(".resultado").after(sols);

    // Explicación
    node.querySelector(".explicacion p").textContent = p.explicacion;

    return node;
  }

  function actualizarBotones(node, p) {
    p.personajes.forEach((pers) => {
      const buttons = node.querySelectorAll(".persona");
      let personaEl = null;
      node.querySelectorAll(".persona").forEach((el) => {
        if (el.querySelector(".nombre").textContent === pers) personaEl = el;
      });
      if (!personaEl) return;
      personaEl.querySelectorAll(".opc button").forEach((b) => {
        b.classList.toggle("sel", estado[p.id][pers] === b.dataset.t);
      });
    });
  }

  function limpiarResultado(node) {
    const r = node.querySelector(".resultado");
    r.textContent = "";
    r.className = "resultado";
    const sols = node.querySelector(".soluciones");
    if (sols) sols.style.display = "none";
  }

  function comprobarRespuesta(node, p) {
    const r = node.querySelector(".resultado");
    const sols = node.querySelector(".soluciones");
    const ans = estado[p.id];

    // ¿Faltan personajes por marcar?
    if (p.personajes.some((pers) => !ans[pers])) {
      r.textContent = "Marca a todos los personajes antes de comprobar.";
      r.className = "resultado parcial";
      return;
    }

    const correcto = p.soluciones.some(
      (s) => p.personajes.every((pers) => s[pers] === ans[pers])
    );

    if (correcto) {
      r.textContent = "¡Correcto! Tu solución es coherente.";
      r.className = "resultado ok";
    } else {
      r.textContent =
        p.soluciones.length > 1
          ? "No es una de las soluciones válidas. (Este problema admite más de una)."
          : "Incorrecto: hay una contradicción. Revisa tu razonamiento.";
      r.className = "resultado no";
    }
    if (sols) sols.style.display = "block";
  }

  function mostrarSolucion(node, p) {
    const r = node.querySelector(".resultado");
    r.textContent = `Solución: ${fmtSoluciones(p.soluciones)}`;
    r.className = "resultado ok";
    const sols = node.querySelector(".soluciones");
    if (sols) sols.style.display = "block";
    // marcar la primera solución
    const primera = p.soluciones[0];
    p.personajes.forEach((pers) => (estado[p.id][pers] = primera[pers]));
    actualizarBotones(node, p);
  }

  function render() {
    lista.innerHTML = "";
    const visibles = PROBLEMAS.filter((p) => p.nivel === nivelActivo);
    if (visibles.length === 0) {
      lista.textContent = "No hay problemas en este nivel.";
      return;
    }
    visibles.forEach((p) => lista.appendChild(renderProblema(p)));
  }

  // Filtros por nivel
  filtros.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    filtros.querySelectorAll(".chip").forEach((c) => c.classList.remove("activo"));
    btn.classList.add("activo");
    nivelActivo = btn.dataset.nivel;
    render();
  });

  render();
})();
