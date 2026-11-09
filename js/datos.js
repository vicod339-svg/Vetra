const WHATSAPP = "5354525901"; 

// Variables globales
let categorias = [];
let productos = [];

async function cargarDatos() {
  try {
    // ⚠️ AQUÍ ESTÁ EL TRUCO: Usamos la URL completa de tu GitHub (raw) para leer el JSON
    // Esto evita errores de rutas en el navegador.
    const urlJSON = "https://raw.githubusercontent.com/vicod339-svg/Vetra/main/productos.json";
    
    // Le añadimos un pequeño truco de tiempo para que el navegador no guarde en caché datos viejos
    const respuesta = await fetch(urlJSON + "?v=" + Date.now());
    
    if (!respuesta.ok) throw new Error("No se pudo cargar el catálogo de GitHub.");
    
    const data = await respuesta.json();
    
    categorias = data.categorias || [];
    productos = data.productos || [];
    
    // Avisamos a la tienda que ya puede dibujar
    document.dispatchEvent(new Event('productosListos'));
    
  } catch (error) {
    console.error("Error al cargar:", error);
    
    // Si hay un error, mostramos un cartel en la página para saber qué pasa
    const contDest = document.getElementById("destacados");
    if (contDest) {
        contDest.innerHTML = `<div style="background:#ffdede; color:#c62828; padding:1rem; border-radius:8px; width:100%; grid-column: 1 / -1; font-size:0.9rem;">
          <strong>Error al cargar los productos:</strong><br>${error.message}
        </div>`;
    }
  }
}

// Iniciamos la carga
cargarDatos();

// ============================================
// HELPERS
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