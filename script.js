const cursos = [
  {
    nombre: "AUDITORÍA EN CIBERSEGURIDAD",
    tareas: [
      { titulo: "Entregable - E01", fecha: "2025-11-07", material: "https://drive.google.com/drive/folders/1LFXtESXUCqaCBjg6veRGAW4HwLBQu_YU?usp=drive_link" },
      { titulo: "Actitudes", fecha: "2025-11-07", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Participación", fecha: "2025-11-07", material: "https://senati.blackboard.com/ultra/course" }
    ]
  },
  {
    nombre: "FORMACIÓN DE MONITORES DE EMPRESA",
    tareas: [
      { titulo: "Evaluación Parcial T03", fecha: "2025-11-04", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Evaluación Parcial T04", fecha: "2025-11-11", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Entregable - E01", fecha: "2025-11-13", material: "https://drive.google.com/drive/folders/1GRQOTlq11bjTbSAkaDK1HUEuQF4-228J?usp=drive_link" },
      { titulo: "Actitudes", fecha: "2025-11-13", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Participación", fecha: "2025-11-13", material: "https://senati.blackboard.com/ultra/course" }
      { titulo: "Presentacion-Grupal", fecha: "2025-10-30", material: "https://drive.google.com/" }
    ]
  },
  {
    nombre: "MEJORA DE MÉTODO EN EL TRABAJO",
    tareas: [
      { titulo: "Avance - E03", fecha: "2025-11-03", material: "https://drive.google.com/drive/folders/1LBpo_AJ5CzMX7Cf6yakr6UQdeSYnoYVh?usp=drive_link" },
      { titulo: "Trabajo Final", fecha: "2025-11-17", material: "https://drive.google.com/drive/folders/1q4TLsWTx96GFw6LNZp4NfytT9QSj_FDq?usp=drive_link" }
    ]
  },
  {
    nombre: "SEMINARIO DE COMPLEMENTACIÓN PRÁCTICA III",
    tareas: [
      { titulo: "Tarea 10", fecha: "2025-11-08", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Tarea 11", fecha: "2025-11-15", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Tarea 12", fecha: "2025-11-22", material: "https://senati.blackboard.com/ultra/course" },
      { titulo: "Informe de Práctica IP04", fecha: "2025-11-22", material: "https://drive.google.com/drive/folders/1SStic3uRbZ8TJSL111UkNKimw5bTy1B2?usp=drive_link" },
      { titulo: "Actitudes", fecha: "2025-11-22", material: "https://senati.blackboard.com/ultra/course" }
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


