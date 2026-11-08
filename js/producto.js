// ============================================
// LEER ID DEL PRODUCTO DE LA URL (?id=1)
// ============================================
const id = parseInt(new URLSearchParams(location.search).get("id"));
const p = productos.find(x => x.id === id);
const cont = document.getElementById("detalle");

let tallaSeleccionada = "";
let colorSeleccionado = "";

if (!p) {
  cont.innerHTML = "<p style='padding:3rem;text-align:center'>Producto no encontrado.</p>";
} else {
  // Generamos el HTML de las variantes
  let htmlVariantes = "";
  if (p.variantes) {
    if (p.variantes.tallas) {
      htmlVariantes += `
        <div class="grupo-variante">
          <p class="etiqueta-variante">Talla:</p>
          <div class="opciones-variante">
            ${p.variantes.tallas.map(t => `<button class="opcion-btn" data-tipo="talla" data-valor="${t}">${t}</button>`).join("")}
          </div>
        </div>
      `;
    }
    if (p.variantes.colores) {
      htmlVariantes += `
        <div class="grupo-variante">
          <p class="etiqueta-variante">Color:</p>
          <div class="opciones-variante">
            ${p.variantes.colores.map(c => `<button class="opcion-btn" data-tipo="color" data-valor="${c}">${c}</button>`).join("")}
          </div>
        </div>
      `;
    }
  }

  // Generamos el HTML de la galería de miniaturas
  let htmlMiniaturas = "";
  if (p.imgs.length > 1) {
    htmlMiniaturas = `
      <div class="galeria-miniaturas">
        ${p.imgs.map((img, index) => `
          <img src="${img}" class="miniatura ${index === 0 ? 'activa' : ''}" data-index="${index}" alt="Miniatura ${index + 1}">
        `).join("")}
      </div>
    `;
  }

  // Comprobar si es favorito para el botón
  const esFavorito = obtenerFavoritos().includes(p.id);

  // Pintamos la página completa
  cont.innerHTML = `
    <div class="galeria-contenedor">
      <img src="${p.imgs[0]}" id="img-principal" class="img-principal" alt="${p.nombre}">
      ${htmlMiniaturas}
    </div>
    
    <div class="info">
      <div class="titulo-con-favorito">
        <h2>${p.nombre}</h2>
        <button id="btn-fav-detalle" class="btn-favorito ${esFavorito ? 'activo' : ''}" data-id="${p.id}">
          ${esFavorito ? '❤️' : '🤍'}
        </button>
      </div>
      <p class="precio">$${p.precio.toFixed(2)}</p>
      <p class="estado ${claseStock(p)}">${textoStock(p)}</p>
      <p>${p.descripcion}</p>
      ${htmlVariantes}
      ${p.disponible && p.stock > 0
        ? `<a href="${linkWhatsApp(p)}" id="btn-wa-dinamico" target="_blank" class="btn-wa grande">💬 Consultar por WhatsApp</a>`
        : `<button class="btn-deshabilitado" disabled>No disponible</button>`}
    </div>
  `;

  // Lógica de la galería
  const imgPrincipal = document.getElementById("img-principal");
  const miniaturas = document.querySelectorAll(".miniatura");
  miniaturas.forEach(mini => {
    mini.addEventListener("click", (e) => {
      imgPrincipal.src = e.target.src;
      miniaturas.forEach(m => m.classList.remove("activa"));
      e.target.classList.add("activa");
    });
  });

  // Lógica de variantes
  const botonesOpcion = document.querySelectorAll(".opcion-btn");
  const btnWa = document.getElementById("btn-wa-dinamico");
  botonesOpcion.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tipo = e.target.getAttribute("data-tipo");
      const valor = e.target.getAttribute("data-valor");
      const hermanos = e.target.parentElement.querySelectorAll(".opcion-btn");
      hermanos.forEach(h => h.classList.remove("activo"));
      e.target.classList.add("activo");

      if (tipo === "talla") tallaSeleccionada = valor;
      if (tipo === "color") colorSeleccionado = valor;

      if (btnWa) {
        let textoExtra = "";
        if (tallaSeleccionada || colorSeleccionado) {
          textoExtra = " - ";
          if (tallaSeleccionada) textoExtra += `Talla: ${tallaSeleccionada} `;
          if (colorSeleccionado) textoExtra += `Color: ${colorSeleccionado}`;
        }
        btnWa.href = linkWhatsApp(p, textoExtra);
      }
    });
  });

  // Lógica del botón de favorito en la página de detalle
  const btnFavDetalle = document.getElementById("btn-fav-detalle");
  if (btnFavDetalle) {
    btnFavDetalle.addEventListener("click", (e) => {
      toggleFavorito(p.id);
      const ahoraEsFav = obtenerFavoritos().includes(p.id);
      btnFavDetalle.classList.toggle("activo", ahoraEsFav);
      btnFavDetalle.textContent = ahoraEsFav ? "❤️" : "🤍";
    });
  }
}