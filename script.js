const materias = [
  // PRIMER AÑO
  { nombre: "Introducción a los Estudios Audiovisuales", correlativas: [] },
  { nombre: "Historia de los Medios", correlativas: [] },
  { nombre: "Taller de Escritura", correlativas: [] },
  { nombre: "Narrativa Audiovisual", correlativas: ["Introducción a los Estudios Audiovisuales"] },

  // SEGUNDO AÑO
  { nombre: "Guion", correlativas: ["Narrativa Audiovisual"] },
  { nombre: "Cámara e Iluminación I", correlativas: ["Introducción a los Estudios Audiovisuales"] },
  { nombre: "Sonido I", correlativas: ["Introducción a los Estudios Audiovisuales"] },
  { nombre: "Montaje", correlativas: ["Narrativa Audiovisual"] },

  // TERCER AÑO
  { nombre: "Cámara e Iluminación II", correlativas: ["Cámara e Iluminación I"] },
  { nombre: "Sonido II", correlativas: ["Sonido I"] },
  { nombre: "Postproducción", correlativas: ["Montaje"] },

  
];

let aprobadas = new Set();

function puedeCursarse(materia) {
  return materia.correlativas.every(cor => aprobadas.has(cor));
}

function renderMaterias() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

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
    contenedor.appendChild(div);
  });
}

renderMaterias();
