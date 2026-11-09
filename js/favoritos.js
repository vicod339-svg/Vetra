document.addEventListener("productosListos", () => {
  const contenedorFavs = document.getElementById("lista-favoritos");
  const idsFavoritos = obtenerFavoritos();
  const idsCategoriasActivas = categorias.map(c => c.id);
  
  const productosFavoritos = productos.filter(p => 
    idsFavoritos.includes(p.id) && idsCategoriasActivas.includes(p.categoria)
  );

  if (productosFavoritos.length === 0) {
    contenedorFavs.innerHTML = `
      <p class="sin-resultados">
        Aún no tienes productos en favoritos.<br>
        <a href="productos.html">Explorar el catálogo</a> y toca el ❤️ para guardarlos aquí.
      </p>
    `;
  } else {
    productosFavoritos.forEach(p => {
      const card = document.createElement("div");
      card.className = "card-producto";
      
      card.innerHTML = `
        ${p.badge ? `<span class="etiqueta ${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
        <button class="btn-favorito activo" data-id="${p.id}" onclick="event.preventDefault()">❤️</button>
        <a href="producto.html?id=${p.id}">
          <img src="${p.imgs[0]}" alt="${p.nombre}">
        </a>
        <h3>${p.nombre}</h3>
        <p class="precio">${formatearPrecio(p)}</p>
        <p class="estado ${claseStock(p)}">${textoStock(p)}</p>
        ${p.disponible && p.stock > 0
          ? `<a href="${linkWhatsApp(p)}" target="_blank" class="btn-wa">💬 Consultar por WhatsApp</a>`
          : `<button class="btn-deshabilitado" disabled>No disponible</button>`}
      `;
      contenedorFavs.appendChild(card);
    });

    document.querySelectorAll(".btn-favorito").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.target.getAttribute("data-id"));
        toggleFavorito(id);
        location.reload();
      });
    });
    
    if (typeof aplicarAnimacionesScroll === "function") {
        aplicarAnimacionesScroll();
    }
  }
});