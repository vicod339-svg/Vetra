// ============================================
// CATEGORÍAS EN EL INICIO
// ============================================
const contCat = document.getElementById("categorias");
categorias.forEach(cat => {
  const a = document.createElement("a");
  a.href = `productos.html?cat=${cat.id}`;
  a.className = "card-categoria";
  a.innerHTML = `<span>${cat.icono}</span><h3>${cat.nombre}</h3>`;
  contCat.appendChild(a);
});

// ============================================
// PRODUCTOS DESTACADOS
// ============================================
const contDest = document.getElementById("destacados");
const destacados = productos.filter(p => p.disponible && p.stock > 0).slice(0, 4);
const favoritosActuales = obtenerFavoritos();

destacados.forEach(p => {
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
    <a href="${linkWhatsApp(p)}" target="_blank" class="btn-wa">💬 Consultar por WhatsApp</a>
  `;
  contDest.appendChild(card);
});

// Escuchar clicks en los corazones del inicio
document.querySelectorAll(".btn-favorito").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = parseInt(e.target.getAttribute("data-id"));
    toggleFavorito(id);
    // Cambiar el corazón visualmente al instante
    const esFav = obtenerFavoritos().includes(id);
    e.target.classList.toggle("activo", esFav);
    e.target.textContent = esFav ? "❤️" : "🤍";
  });
});

// Aplicar animaciones de scroll a los elementos generados
if (typeof aplicarAnimacionesScroll === "function") {
    aplicarAnimacionesScroll();
}