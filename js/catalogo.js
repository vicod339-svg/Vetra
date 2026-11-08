// ============================================
// ESTADO
// ============================================
const params = new URLSearchParams(location.search);
const catActiva = params.get("cat") || "todas";
let textoBusqueda = "";
let ordenActivo = "recientes";

// ============================================
// FILTROS POR CATEGORÍA
// ============================================
const filtros = document.getElementById("filtros");
const todas = [{ id: "todas", nombre: "Todas" }, ...categorias];

todas.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat.nombre;
  btn.className = cat.id === catActiva ? "filtro activo" : "filtro";
  btn.onclick = () => location.href = `productos.html?cat=${cat.id}`;
  filtros.appendChild(btn);
});

// ============================================
// UTILIDAD: normaliza texto
// ============================================
function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ============================================
// RENDERIZAR PRODUCTOS
// ============================================
const contenedor = document.getElementById("catalogo");
const contador = document.getElementById("contador-resultados");

function renderizar() {
  let lista = catActiva === "todas" ? [...productos] : productos.filter(p => p.categoria === catActiva);

  if (textoBusqueda.trim() !== "") {
    const q = normalizar(textoBusqueda.trim());
    lista = lista.filter(p => normalizar(p.nombre).includes(q));
  }

  if (ordenActivo === "precio-asc") lista.sort((a, b) => a.precio - b.precio);
  else if (ordenActivo === "precio-desc") lista.sort((a, b) => b.precio - a.precio);
  else if (ordenActivo === "nombre") lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

  if (textoBusqueda.trim() !== "") {
    contador.textContent = `${lista.length} resultado${lista.length === 1 ? "" : "s"} para "${textoBusqueda}"`;
  } else {
    contador.textContent = "";
  }

  contenedor.innerHTML = "";
  
  const favoritosActuales = obtenerFavoritos();

  if (lista.length === 0) {
    contenedor.innerHTML = `<p class="sin-resultados">No encontramos productos que coincidan.<br>Prueba con otra palabra o <a href="productos.html">ver todo el catálogo</a>.</p>`;
    return;
  }

  lista.forEach(p => {
    const esFavorito = favoritosActuales.includes(p.id);
    const card = document.createElement("div");
    card.className = "card-producto";
    
    // AQUÍ ESTÁ LA MAGIA DE LAS ETIQUETAS
    card.innerHTML = `
      ${p.badge ? `<span class="etiqueta ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
      <button class="btn-favorito ${esFavorito ? 'activo' : ''}" data-id="${p.id}">${esFavorito ? '❤️' : '🤍'}</button>
      <a href="producto.html?id=${p.id}">
        <img src="${p.imgs[0]}" alt="${p.nombre}">
      </a>
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio.toFixed(2)}</p>
      <p class="estado ${claseStock(p)}">${textoStock(p)}</p>
      ${p.disponible && p.stock > 0
        ? `<a href="${linkWhatsApp(p)}" target="_blank" class="btn-wa">💬 Consultar por WhatsApp</a>`
        : `<button class="btn-deshabilitado" disabled>No disponible</button>`}
    `;
    contenedor.appendChild(card);
  });

  // Escuchar clicks en los corazones
  document.querySelectorAll(".btn-favorito").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); 
      const id = parseInt(e.target.getAttribute("data-id"));
      toggleFavorito(id);
      renderizar(); 
    });
  });

  // Aplicar animaciones de scroll a los elementos generados
  if (typeof aplicarAnimacionesScroll === "function") {
      aplicarAnimacionesScroll();
  }
}

// ============================================
// EVENTOS
// ============================================
document.getElementById("buscador").addEventListener("input", (e) => {
  textoBusqueda = e.target.value;
  renderizar();
});

document.getElementById("orden").addEventListener("change", (e) => {
  ordenActivo = e.target.value;
  renderizar();
});

// ============================================
// PRIMER RENDER
// ============================================
renderizar();
