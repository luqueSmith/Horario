const cursos = [
  {
    nombre: "AUDITORÍA EN CIBERSEGURIDAD",
    tareas: [
      { titulo: "Entregable - E01", fecha: "2025-11-07", material: "https://drive.google.com/" },
      { titulo: "Actitudes", fecha: "2025-11-07", material: "https://drive.google.com/" },
      { titulo: "Participación", fecha: "2025-11-07", material: "https://drive.google.com/" }
    ]
  },
  {
    nombre: "FORMACIÓN DE MONITORES DE EMPRESA",
    tareas: [
      { titulo: "Evaluación Parcial T03", fecha: "2025-11-04", material: "https://drive.google.com/" },
      { titulo: "Evaluación Parcial T04", fecha: "2025-11-11", material: "https://drive.google.com/" },
      { titulo: "Entregable - E01", fecha: "2025-11-13", material: "https://drive.google.com/" },
      { titulo: "Actitudes", fecha: "2025-11-13", material: "https://drive.google.com/" },
      { titulo: "Participación", fecha: "2025-11-13", material: "https://drive.google.com/" }
    ]
  },
  {
    nombre: "MEJORA DE MÉTODO EN EL TRABAJO",
    tareas: [
      { titulo: "Avance - E03", fecha: "2025-11-03", material: "https://drive.google.com/" },
      { titulo: "Trabajo Final", fecha: "2025-11-17", material: "https://drive.google.com/" }
    ]
  },
  {
    nombre: "SEMINARIO DE COMPLEMENTACIÓN PRÁCTICA III",
    tareas: [
      { titulo: "Tarea 10", fecha: "2025-11-08", material: "https://drive.google.com/" },
      { titulo: "Tarea 11", fecha: "2025-11-15", material: "https://drive.google.com/" },
      { titulo: "Tarea 12", fecha: "2025-11-22", material: "https://drive.google.com/" },
      { titulo: "Informe de Práctica IP04", fecha: "2025-11-22", material: "https://drive.google.com/" },
      { titulo: "Actitudes", fecha: "2025-11-22", material: "https://drive.google.com/" }
    ]
  }
];

// Cargar tareas terminadas del almacenamiento local
let completadas = JSON.parse(localStorage.getItem("completadas")) || [];

// Mostrar cursos y tareas
const contCursos = document.getElementById("lista-cursos");
const contProximos = document.getElementById("lista-proximos");
const hoy = new Date();

cursos.forEach(curso => {
  const divCurso = document.createElement("div");
  divCurso.classList.add("curso");
  divCurso.innerHTML = `<h3>${curso.nombre}</h3>`;

  curso.tareas.forEach(t => {
    const fecha = new Date(t.fecha);
    const diasRestantes = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));

    // No mostrar vencidos en la lista de próximos
    if (diasRestantes < 0) return;

    const tareaDiv = document.createElement("div");
    tareaDiv.classList.add("tarea");
    if (completadas.includes(t.titulo)) tareaDiv.classList.add("terminada");

    tareaDiv.innerHTML = `
      <strong>${t.titulo}</strong>
      <span>Vence: ${fecha.toLocaleDateString()}</span>
      <span>Días restantes: ${diasRestantes}</span>
      <a href="${t.material}" target="_blank" class="material">📎 Ver material</a>
      <button>${completadas.includes(t.titulo) ? "✔️ Completado" : "Marcar como terminado"}</button>
    `;

    const boton = tareaDiv.querySelector("button");
    boton.addEventListener("click", () => {
      if (!completadas.includes(t.titulo)) {
        completadas.push(t.titulo);
        localStorage.setItem("completadas", JSON.stringify(completadas));
        tareaDiv.classList.add("terminada");
        boton.textContent = "✔️ Completado";
      }
    });

    divCurso.appendChild(tareaDiv);

    // Agregar también a la sección de "Próximos Vencimientos"
    const prox = tareaDiv.cloneNode(true);
    prox.querySelector("button").remove(); // no repetir botón aquí
    if (diasRestantes <= 7) contProximos.appendChild(prox);
  });

  contCursos.appendChild(divCurso);
});
