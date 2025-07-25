const materiasPorSemestre = { 1: ["Biología Optativa", "Química básica", "Bioética y Bienestar en Salud Animal", "Introducción a las ciencias veterinarias", "Libre Elección", "Inglés I"], 2: ["Histología y Embriología", "Anatomía Comparada", "Bioquímica", "Biofísica", "Inglés II"], 3: ["Biología Molecular avanzada", "Fisiología", "Optativo (Suelos y Plantas)", "Inmunología", "Bioestadística", "Libre Elección", "Inglés III"], 4: ["Genética", "Virología", "Bacteriología y Micología", "Parasitología", "Nutrición", "Libre Elección", "Inglés IV"], 5: ["Semiología", "Farmacología", "Mecanismos de enfermedad", "Imagenología", "Sociedades rurales", "Libre Elección"], 6: ["Cirugía I", "Patología clínica", "Patología Sistémica", "Optativo (SP1)", "Política Agropecuaria", "Libre Elección"], 7: ["Cirugía II", "Toxicología", "Epidemiología", "Medicina aviar", "Optativo (SP2)", "Planeación y Evaluación", "Extensión y Desarrollo Rural"], 8: ["Medicina interna de pequeños", "Medicina interna de Rumiantes", "Salud Pública", "Salud de Hato", "Teriogenología I", "Trabajo de campo Optativo"], 9: ["Medicina interna de Equinos", "Medicina interna de Porcinos", "Medicina interna de Silvestres", "Teriogenología II", "Línea de Profundización I", "Trabajo de Campo Optativo"], 10: ["Clínica de Grandes Animales", "Clínica de Pequeños Animales", "Clínica de la Reproducción", "Rotación por Laboratorios", "Línea de Profundización II"], 11: ["Prácticas Integradas de Campo"], 12: ["Trabajo de Grado"] };

const requisitos = { "Histología y Embriología": ["Biología Optativa"], "Anatomía Comparada": ["Biología Optativa"], "Bioquímica": ["Química básica"], "Biofísica": ["Química básica"], "Fisiología": ["Bioquímica", "Anatomía Comparada"], "Inmunología": ["Histología y Embriología"], "Virología": ["Inmunología"], "Bacteriología y Micología": ["Inmunología"], "Parasitología": ["Inmunología"], "Farmacología": ["Bioquímica"], "Patología clínica": ["Virología", "Bacteriología y Micología"], "Patología Sistémica": ["Parasitología", "Patología clínica"], "Cirugía II": ["Cirugía I"], "Medicina interna de pequeños": ["Patología Sistémica"], "Medicina interna de Rumiantes": ["Patología Sistémica"], "Medicina interna de Equinos": ["Medicina interna de Rumiantes"], "Medicina interna de Porcinos": ["Medicina interna de Rumiantes"], "Medicina interna de Silvestres": ["Medicina interna de Rumiantes"], "Clínica de Grandes Animales": ["Medicina interna de Rumiantes"], "Clínica de Pequeños Animales": ["Medicina interna de pequeños"], "Clínica de la Reproducción": ["Teriogenología II"], "Rotación por Laboratorios": ["Bacteriología y Micología"], "Prácticas Integradas de Campo": ["Clínica de Grandes Animales", "Clínica de Pequeños Animales"], "Trabajo de Grado": ["Prácticas Integradas de Campo"] };

const mallaDiv = document.getElementById("malla"); const mensajeDiv = document.getElementById("mensaje"); let aprobados = JSON.parse(localStorage.getItem("ramosAprobados") || "[]");

function crearMalla() { for (let i = 1; i <= 12; i++) { const columna = document.createElement("div"); columna.className = "semestre"; const titulo = document.createElement("h2"); titulo.textContent = Semestre ${i}; columna.appendChild(titulo);

materiasPorSemestre[i].forEach((ramo) => {
  const div = document.createElement("div");
  div.textContent = ramo;
  div.className = "ramo";

  if (aprobados.includes(ramo)) {
    div.classList.add("aprobado");
  } else if (!puedeAprobar(ramo)) {
    div.classList.add("bloqueado");
  }

  div.addEventListener("click", () => manejarClick(div, ramo));
  columna.appendChild(div);
});

mallaDiv.appendChild(columna);

} }

function puedeAprobar(ramo) { const reqs = requisitos[ramo]; if (!reqs) return true; return reqs.every((req) => aprobados.includes(req)); }

function manejarClick(div, ramo) { if (div.classList.contains("bloqueado")) { const faltan = requisitos[ramo].filter((r) => !aprobados.includes(r)); mostrarMensaje(No puedes aprobar "${ramo}". Faltan: ${faltan.join(", ")}); return; }

if (div.classList.contains("aprobado")) { div.classList.remove("aprobado"); aprobados = aprobados.filter((r) => r !== ramo); } else { if (!puedeAprobar(ramo)) return; div.classList.add("aprobado"); aprobados.push(ramo); }

actualizarBloqueos(); localStorage.setItem("ramosAprobados", JSON.stringify(aprobados)); }

function actualizarBloqueos() { document.querySelectorAll(".ramo").forEach((div) => { const ramo = div.textContent; if (!aprobados.includes(ramo) && !puedeAprobar(ramo)) { div.classList.add("bloqueado"); } else { div.classList.remove("bloqueado"); } }); }

function mostrarMensaje(texto) { mensajeDiv.textContent = texto; mensajeDiv.style.display = "block"; setTimeout(() => { mensajeDiv.style.display = "none"; }, 4000); }

crearMalla();


