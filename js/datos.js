const WHATSAPP = "5354525901"; 

let categorias = [
  { id: "ropa", nombre: "Ropa", icono: "👕" },
  { id: "belleza", nombre: "Belleza", icono: "💄" },
  { id: "electrodomesticos", nombre: "Electrodomésticos", icono: "🔌" }
];

let productos = [
  {
    "id": 1,
    "nombre": "Producto de Prueba",
    "precio": 10,
    "moneda": "USD",
    "categoria": "ropa",
    "stock": 5,
    "badge": "NUEVO",
    "disponible": true,
    "imgs": ["https://raw.githubusercontent.com/vicod339-svg/Vetra/main/img/camiseta-1.jpg"],
    "descripcion": "Este es un producto de prueba.",
    "variantes": { "tallas": ["S"], "colores": ["Negro"] }
  }
];

// ============================================
// HELPERS (El Admin los reescribirá, no los borres)
// ============================================
function formatearPrecio(p) {
  if (p.moneda === "CUP") return `$${p.precio.toFixed(2)} CUP`;
  return `$${p.precio.toFixed(2)} USD`;
}

function linkWhatsApp(producto, extra = "") {
  const precioTexto = formatearPrecio(producto);
  const msg = `Hola, me interesa: ${producto.nombre}${extra} (${precioTexto})`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function textoStock(p) {
  if (!p.disponible || p.stock === 0) return "❌ Agotado";
  if (p.stock <= 5) return `🔥 ¡Solo quedan ${p.stock}!`;
  return "✅ Disponible";
}

function claseStock(p) {
  if (!p.disponible || p.stock === 0) return "agotado";
  if (p.stock <= 5) return "poco-stock";
  return "disponible";
}

function obtenerFavoritos() {
  const guardados = localStorage.getItem("favoritos");
  return guardados ? JSON.parse(guardados) : [];
}
function guardarFavoritos(lista) { localStorage.setItem("favoritos", JSON.stringify(lista)); }
function toggleFavorito(id) {
  let favs = obtenerFavoritos();
  if (favs.includes(id)) favs = favs.filter(favId => favId !== id);
  else favs.push(id);
  guardarFavoritos(favs);
}

// Avisar a la tienda que los datos están listos
document.dispatchEvent(new Event('productosListos'));