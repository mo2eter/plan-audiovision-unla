const materiasPorAnio = {
"PRIMER AÑO": [
  { nombre: "Tecnología de la Imagen", correlativas: [] },
  { nombre: "Elementos de Audio", correlativas: [] },
  { nombre: "Taller de Lectura y Escritura profesional", correlativas: [] },
  { nombre: "Educación Auditiva", correlativas: [] },
  { nombre: "Electrónica de las Comunicaciones", correlativas: [] },
  { nombre: "Lenguaje Audiovisual 1", correlativas: [] },
  { nombre: "Registro de Sonido en Audiovisuales", correlativas: [] },
  { nombre: "Montaje 1", correlativas: [] },
  { nombre: "Fotografía e Iluminación en Audiovisuales", correlativas: [] },
  { nombre: "Inglés I", correlativas: [] }
],
"SEGUNDO AÑO": [
  { nombre: "Lenguaje Audiovisual 2", correlativas: ["Lenguaje Audiovisual 1", "Fotografía e Iluminación en Audiovisuales"] },
  { nombre: "Audición y Análisis Musical", correlativas: ["Taller de Lectura y Escritura profesional", "Educación Auditiva"] },
  { nombre: "Taller de Edición de Sonido", correlativas: ["Elementos de Audio", "Registro de Sonido en Audiovisuales"] },
  { nombre: "Taller de Montaje", correlativas: ["Lenguaje Audiovisual 1", "Montaje 1"] },
  { nombre: "Realización Integral Audiovisual 1", correlativas: ["Lenguaje Audiovisual 2", "Taller de Edición de Sonido", "Taller de Montaje"] },
  { nombre: "Arte y Sociedad", correlativas: ["Audición y Análisis Musical"] },
  { nombre: "Guión", correlativas: ["Lenguaje Audiovisual 2"] },
  { nombre: "Taller de Composición Sonora", correlativas: ["Audición y Análisis Musical", "Taller de Edición de Sonido"] },
  { nombre: "Seminario de Pensamiento Nacional y Latinoamericano", correlativas: [] },
  { nombre: "Seminario de Justicia y Derechos Humanos", correlativas: [] }
],
"TERCER AÑO": [
  { nombre: "Banda Sonora", correlativas: ["Taller de Composición Sonora"] },
  { nombre: "Géneros Estilos Audiovisuales", correlativas: ["Arte y Sociedad"] },
  { nombre: "Taller de Experimentación Audiovisual", correlativas: ["Lenguaje Audiovisual 2", "Taller de Composición Sonora"] },
  { nombre: "Realización Integral Audiovisual 2", correlativas: ["Realización Integral Audiovisual 1", "Guión"] },
  { nombre: "Ética Profesional", correlativas: ["Taller de Lectura y Escritura profesional"] }
],
"CICLO DE FORMACIÓN ORIENTADA": [
  { nombre: "Gestión de proyectos Audiovisuales", correlativas: ["Realización Integral Audiovisual 2"] },
  { nombre: "Estética", correlativas: ["Arte y Sociedad"] },
  { nombre: "Comunicación Audiovisual", correlativas: ["Taller de Lectura y Escritura profesional"] },
  { nombre: "Tecnología de Postproducción 1", correlativas: ["Tecnología de la Imagen", "Electrónica de las Comunicaciones"] },
  { nombre: "Imagen, Tipografía e Identidad Cultural", correlativas: ["Taller de Lectura y Escritura profesional"] }
],
"CUARTO AÑO": [
  { nombre: "Semiótica", correlativas: ["Taller de Lectura y Escritura profesional"] },
  { nombre: "Inglés II", correlativas: ["Inglés I"] },
  { nombre: "Metodología de Investigación", correlativas: ["Taller de Lectura y Escritura profesional"] },
  { nombre: "Optativa 1", correlativas: [] },
  { nombre: "Edición y Corrección Digital de Imagen", correlativas: ["Tecnología de la Imagen", "Fotografía e Iluminación en Audiovisuales", "Taller de Montaje"] },
  { nombre: "Tecnología de Postproducción 2", correlativas: ["Tecnología de Postproducción 1"] },
  { nombre: "Montaje 2", correlativas: ["Montaje 1"] },
  { nombre: "Animación 3D 1", correlativas: ["Edición y Corrección Digital de Imagen"] },
  { nombre: "Composición Digital", correlativas: ["Edición y Corrección Digital de Imagen"] },
  { nombre: "Tecnología de Postproducción 3", correlativas: ["Tecnología de Postproducción 2"] }
],
"QUINTO AÑO": [
  { nombre: "Taller de Trabajo Final Integrador Mención Postproducción de Imagen", correlativas: ["Géneros Estilos Audiovisuales", "Gestión de proyectos Audiovisuales", "Estética", "Imagen, Tipografía e Identidad Cultural", "Semiótica"] },
  { nombre: "Animación 3D 2", correlativas: ["Animación 3D 1", "Composición Digital"] },
  { nombre: "Taller de Postproducción de Imagen", correlativas: ["Animación 3D 1", "Composición Digital"] },
  { nombre: "Práctica Preprofesional Mención Postproducción de Imagen", correlativas: ["Realización Integral Audiovisual 2"] },
  { nombre: "Optativa 2", correlativas: [] },
  { nombre: "Optativa 3", correlativas: [] }
 ]
};

let estadoMaterias = {}; // 0 = nada, 1 = cursada, 2 = aprobada
const tecnicaturaAnios = ["PRIMER AÑO", "SEGUNDO AÑO", "TERCER AÑO"];

function esMateriaDeTecnicatura(nombre) {
  return tecnicaturaAnios.some(anio =>
    materiasPorAnio[anio].some(m => m.nombre === nombre)
  );
}

function puedeCursarse(materia) {
  return materia.correlativas.every(cor => {
    const estado = estadoMaterias[cor] || 0;
    return estado >= 1;
  });
}

function renderMateriasUnidas() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const todosLosAnios = [
    ...tecnicaturaAnios,
    ...Object.keys(materiasPorAnio).filter(anio => !tecnicaturaAnios.includes(anio))
  ];

  for (const anio of todosLosAnios) {
    const materias = materiasPorAnio[anio];
    const columna = document.createElement("div");
    columna.className = "columna";

    const titulo = document.createElement("h2");
    titulo.innerText = anio;
    columna.appendChild(titulo);

    materias.forEach(m => {
      const div = document.createElement("div");
      div.className = "materia";
      div.innerText = m.nombre;

      const estado = estadoMaterias[m.nombre] || 0;

      if (estado === 2) {
        div.classList.add("aprobada");
      } else if (estado === 1) {
        div.classList.add("cursada");
      } else if (puedeCursarse(m)) {
        div.classList.add("habilitada");
      } else {
        div.classList.add("deshabilitada");
      }

      div.addEventListener("click", () => {
        const estadoActual = estadoMaterias[m.nombre] || 0;
        const nuevoEstado = (estadoActual + 1) % 3;
        estadoMaterias[m.nombre] = nuevoEstado;
        renderMateriasUnidas();
        actualizarProgreso();
      });

      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  }
}

function actualizarProgreso() {
  const totalTecnicatura = tecnicaturaAnios.reduce(
    (acc, anio) => acc + materiasPorAnio[anio].length,
    0
  );

  const aprobadasTecnicatura = Object.entries(estadoMaterias).filter(
    ([mat, estado]) => estado === 2 && esMateriaDeTecnicatura(mat)
  ).length;

  const totalLic = Object.keys(materiasPorAnio)
    .filter(anio => !tecnicaturaAnios.includes(anio))
    .reduce((acc, anio) => acc + materiasPorAnio[anio].length, 0);

  const aprobadasLic = Object.entries(estadoMaterias).filter(
    ([mat, estado]) =>
      estado === 2 &&
      !esMateriaDeTecnicatura(mat) &&
      materiasPorAnio[Object.keys(materiasPorAnio).find(anio => materiasPorAnio[anio].some(m => m.nombre === mat))] !== undefined
  ).length;

  const porcentajeTecnicatura = Math.round((aprobadasTecnicatura / totalTecnicatura) * 100);
  const porcentajeLic = Math.round((aprobadasLic / totalLic) * 100);

  document.getElementById("progreso-tecnicatura-barra").style.width = porcentajeTecnicatura + "%";
  document.getElementById("progreso-tecnicatura-texto").textContent =
    `Técnicatura en Audiovisión: ${porcentajeTecnicatura}% aprobado`;

  document.getElementById("progreso-licenciatura-barra").style.width = porcentajeLic + "%";
  document.getElementById("progreso-licenciatura-texto").textContent =
    `Licenciatura: ${porcentajeLic}% aprobado`;
}

renderMateriasUnidas();
actualizarProgreso();
