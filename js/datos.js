// ============================================
// CONFIGURACIÓN — EDITA AQUÍ TU WHATSAPP
// ============================================
const WHATSAPP = "5354525901"; 

// ============================================
// CATEGORÍAS
// ============================================
const categorias = [
  { id: "ropa", nombre: "Ropa", icono: "👕" },
  { id: "belleza", nombre: "Belleza", icono: "💄" },
  { id: "electrodomesticos", nombre: "Electrodomésticos", icono: "🔌" },
];

// ============================================
// PRODUCTOS
// ============================================
const productos = [
  {
    id: 1,
    nombre: "Camiseta Oversize",
    categoria: "ropa",
    precio: 18.00,
    imgs: ["img/camiseta-1.jpg", "img/camiseta-2.jpg"],
    disponible: true,
    stock: 5,
    badge: "NUEVO", // <-- Etiqueta visual
    descripcion: "Camiseta de algodón 100%, corte holgado.",
    variantes: { tallas: ["S", "M", "L"], colores: ["Blanco", "Negro"] }
  },
  {
    id: 2,
    nombre: "Gloss Labial Hidratante",
    categoria: "belleza",
    precio: 9.50,
    imgs: ["img/labial.jpg"],
    disponible: true,
    stock: 12,
    badge: "OFERTA", // <-- Etiqueta visual
    descripcion: "Brillo intenso con ácido hialurónico.",
    variantes: { colores: ["Transparente", "Rosa"] }
  },
  {
    id: 3,
    nombre: "Jeans Mom Fit",
    categoria: "ropa",
    precio: 28.00,
    imgs: ["img/jeans-1.jpg", "img/jeans-2.jpg"],
    disponible: true,
    stock: 2,
    descripcion: "Mezclilla de alta calidad, tiro alto.",
    variantes: { tallas: ["26", "28", "30"], colores: ["Azul"] }
  },
  {
    id: 4,
    nombre: "Secador Profesional 2000W",
    categoria: "electrodomesticos",
    precio: 45.00,
    imgs: ["img/secador.jpg"],
    disponible: false,
    stock: 0,
    descripcion: "Secador iónico con 3 temperaturas."
  }
];

// ============================================
// Helpers generales
// ============================================
function linkWhatsApp(producto, extra = "") {
  const msg = `Hola, me interesa: ${producto.nombre}${extra} ($${producto.precio.toFixed(2)})`;
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

// ============================================
// Lógica de Favoritos (localStorage)
// ============================================
function obtenerFavoritos() {
  const guardados = localStorage.getItem("favoritos");
  return guardados ? JSON.parse(guardados) : [];
}

function guardarFavoritos(lista) {
  localStorage.setItem("favoritos", JSON.stringify(lista));
}

function toggleFavorito(id) {
  let favs = obtenerFavoritos();
  if (favs.includes(id)) {
    favs = favs.filter(favId => favId !== id);
  } else {
    favs.push(id);
  }
  guardarFavoritos(favs);
}