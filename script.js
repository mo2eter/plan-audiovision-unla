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
