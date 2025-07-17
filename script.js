const materias = [
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
  { nombre: "Inglés I", correlativas: [] },

  "SEGUNDO AÑO": [
  { nombre: "Lenguaje Audiovisual 2", correlativas: ["Lenguaje Audiovisual 1", "Fotografía e Iluminación en Audiovisuales"] },
  { nombre: "Audición y Análisis Musical", correlativas: ["Taller de Lectura y Escritura profesional", "Educación Auditiva"] },
  { nombre: "Taller de Edición de Sonido", correlativas: ["Elementos de Audio", "Registro de Sonido en Audiovisuales"] },
  { nombre: "Taller de Montaje", correlativas: ["Lenguaje Audiovisual 1", "Montaje 1"] },
  { nombre: "Realización Integral Audiovisual 1", correlativas: ["Lenguaje Audiovisual 2", "Taller de Edición de Sonido", "Taller de Montaje"] },
  { nombre: "Arte y Sociedad", correlativas: ["Audición y Análisis Musical"] },
  { nombre: "Guión", correlativas: ["Lenguaje Audiovisual 2"] },
  { nombre: "Taller de Composición Sonora", correlativas: ["Audición y Análisis Musical", "Taller de Edición de Sonido"] },

  "TERCER AÑO": [
  { nombre: "Banda Sonora", correlativas: ["Taller de Composición Sonora"] },
  { nombre: "Géneros Estilos Audiovisuales", correlativas: ["Arte y Sociedad"] },
  { nombre: "Taller de Experimentación Audiovisual", correlativas: ["Lenguaje Audiovisual 2", "Taller de Composición Sonora"] },
  { nombre: "Realización Integral Audiovisual 2", correlativas: ["Realización Integral Audiovisual 1", "Guión"] },
  { nombre: "Ética Profesional", correlativas: ["Taller de Lectura y Escritura profesional"] },

  "SEMINARIOS": [
  { nombre: "Seminario de Pensamiento Nacional y Latinoamericano", correlativas: [] },
  { nombre: "Seminario de Justicia y Derechos Humanos", correlativas: [] },

  "CICLO DE FORMACIÓN ORIENTADA": [
  { nombre: "Gestión de proyectos Audiovisuales", correlativas: ["Realización Integral Audiovisual 2"] },
  { nombre: "Estética", correlativas: ["Arte y Sociedad"] },
  { nombre: "Comunicación Audiovisual", correlativas: ["Taller de Lectura y Escritura profesional"] },
  { nombre: "Tecnología de Postproducción 1", correlativas: ["Tecnología de la Imagen", "Electrónica de las Comunicaciones"] },
  { nombre: "Imagen, Tipografía e Identidad Cultural", correlativas: ["Taller de Lectura y Escritura profesional"] },

  "CUARTO AÑO": [
  { nombre: "Semiótica", correlativas: ["Taller de Lectura y Escritura profesional"] },
  { nombre: "Inglés II", correlativas: ["Inglés I"] },
  { nombre: "Metodología de Investigación", correlativas: ["Taller de Lectura y Escritura profesional"] },
  { nombre: "Edición y Corrección Digital de Imagen", correlativas: ["Tecnología de la Imagen", "Fotografía e Iluminación en Audiovisuales", "Taller de Montaje"] },
  { nombre: "Tecnología de Postproducción 2", correlativas: ["Tecnología de Postproducción 1"] },
  { nombre: "Montaje 2", correlativas: ["Montaje 1"] },
  { nombre: "Animación 3D 1", correlativas: ["Edición y Corrección Digital de Imagen"] },
  { nombre: "Composición Digital", correlativas: ["Edición y Corrección Digital de Imagen"] },
  { nombre: "Tecnología de Postproducción 3", correlativas: ["Tecnología de Postproducción 2"] },
  { nombre: "Optativa 1", correlativas: [] },

  "QUINTO AÑO": [
  { nombre: "Taller de Trabajo Final Integrador Mención Postproducción de Imagen", correlativas: ["Géneros Estilos Audiovisuales", "Gestión de proyectos Audiovisuales", "Estética", "Imagen, Tipografía e Identidad Cultural", "Semiótica"] },
  { nombre: "Animación 3D 2", correlativas: ["Animación 3D 1", "Composición Digital"] },
  { nombre: "Taller de Postproducción de Imagen", correlativas: ["Animación 3D 1", "Composición Digital"] },
  { nombre: "Práctica Preprofesional Mención Postproducción de Imagen", correlativas: ["Realización Integral Audiovisual 2"] },
  { nombre: "Optativa 2", correlativas: [] },
  { nombre: "Optativa 3", correlativas: [] }
];

let aprobadas = new Set();

function puedeCursarse(materia) {
  return materia.correlativas.every(cor => aprobadas.has(cor));
}

function renderMaterias() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  for (const [anio, materias] of Object.entries(materiasPorAnio)) {
    const columna = document.createElement("div");
    columna.className = "columna";

    const titulo = document.createElement("h2");
    titulo.innerText = anio;
    columna.appendChild(titulo);

    materias.forEach(m => {
      const div = document.createElement("div");
      div.className = "materia";

      if (aprobadas.has(m.nombre)) {
        div.classList.add("aprobada");
      } else if (puedeCursarse(m)) {
        div.classList.add("habilitada");
        div.addEventListener("click", () => {
          aprobadas.add(m.nombre);
          renderMaterias();
        });
      } else {
        div.classList.add("deshabilitada");
      }

      div.innerText = m.nombre;
      columna.appendChild(div);
    });

    contenedor.appendChild(columna);
  }
}

renderMaterias();
