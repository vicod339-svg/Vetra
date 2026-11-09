const WHATSAPP = "5354525901"; 

let categorias = [
  { id: "ropa", nombre: "Ropa", icono: "👕" },
  { id: "belleza", nombre: "Belleza", icono: "💄" },
  { id: "electrodomesticos", nombre: "Electrodomésticos", icono: "🔌" },
];

let productos = [];

async function cargarDatos() {
  try {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
    const { getDatabase, ref, onValue } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js");

    const firebaseConfig = {
      apiKey: "AIzaSyAjuNIn7LCeP6QFIFU2LuELsU6SbdAGFnk",
      authDomain: "vetrashop.firebaseapp.com",
      databaseURL: "https://vetrashop-default-rtdb.firebaseio.com",
      projectId: "vetrashop",
      storageBucket: "vetrashop.firebasestorage.app",
      messagingSenderId: "612577114697",
      appId: "1:612577114697:web:7a9d1a97ae8f4c750f5d98"
    };

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    // 1. Escuchar Categorías
    const catRef = ref(db, 'categorias');
    onValue(catRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Si por alguna razón llega como objeto, lo convertimos a array
        categorias = Array.isArray(data) ? data : Object.values(data);
      }
      
      // 2. Escuchar Productos
      const prodRef = ref(db, 'productos');
      onValue(prodRef, (snapshotProd) => {
        const dataProd = snapshotProd.val();
        if (dataProd) {
          productos = Array.isArray(dataProd) ? dataProd : Object.values(dataProd);
        } else {
          productos = [];
        }
        
        // 3. Avisar a la página
        document.dispatchEvent(new Event('productosListos'));
      });
    });
    
  } catch (error) {
    console.error("Error Firebase:", error);
  }
}

cargarDatos();

// Helpers
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