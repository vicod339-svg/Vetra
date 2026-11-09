function renderizarInicio() {
  // Categorías
  const contCat = document.getElementById("categorias");
  if (!contCat) return;
  contCat.innerHTML = ""; 
  
  categorias.forEach(cat => {
    const a = document.createElement("a");
    a.href = `productos.html?cat=${cat.id}`;
    a.className = "card-categoria";
    a.innerHTML = `<span>${cat.icono}</span><h3>${cat.nombre}</h3>`;
    contCat.appendChild(a);
  });

  // Destacados
  const contDest = document.getElementById("destacados");
  if (!contDest) return;
  contDest.innerHTML = ""; 
  
  const idsCategoriasActivas = categorias.map(c => c.id);
  const destacados = productos
    .filter(p => p.disponible && p.stock > 0 && idsCategoriasActivas.includes(p.categoria))
    .slice(0, 4);
    
  const favoritosActuales = obtenerFavoritos();

  if (destacados.length === 0) {
    contDest.innerHTML = "<p style='text-align:center; width:100%; grid-column: 1/-1; padding: 2rem; color: #666;'>Pronto añadiremos nuevos productos destacados.</p>";
  }

  destacados.forEach(p => {
    const esFavorito = favoritosActuales.includes(p.id);
    const card = document.createElement("div");
    card.className = "card-producto";
    
    card.innerHTML = `
      ${p.badge ? `<span class="etiqueta ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
      <button class="btn-favorito ${esFavorito ? 'activo' : ''}" data-id="${p.id}">${esFavorito ? '❤️' : '🤍'}</button>
      <a href="producto.html?id=${p.id}">
        <img src="${p.imgs[0]}" alt="${p.nombre}">
      </a>
      <h3>${p.nombre}</h3>
      <p class="precio">${formatearPrecio(p)}</p>
      <p class="estado ${claseStock(p)}">${textoStock(p)}</p>
      <a href="${linkWhatsApp(p)}" target="_blank" class="btn-wa">💬 Consultar por WhatsApp</a>
    `;
    contDest.appendChild(card);
  });

  document.querySelectorAll(".btn-favorito").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = parseInt(e.target.getAttribute("data-id"));
      toggleFavorito(id);
      const esFav = obtenerFavoritos().includes(id);
      e.target.classList.toggle("activo", esFav);
      e.target.textContent = esFav ? "❤️" : "🤍";
    });
  });

  if (typeof aplicarAnimacionesScroll === "function") {
      aplicarAnimacionesScroll();
  }
}

// ESTO ES LO QUE HACE QUE FUNCIONE:
// Escucha el aviso de datos.js y dibuja la página
document.addEventListener("productosListos", renderizarInicio);