const btn = document.getElementById('btn');
const selectTamaño = document.getElementById('tamaño');
const selectFormato = document.getElementById('formato');
const contenedor = document.getElementById('contenedor');
const cuadrados = document.querySelectorAll('.cuadrado');

// Función para generar color HEX aleatorio
function generarColorHEX() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Función para convertir HEX a HSL
function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// Función para cambiar el tamaño de la paleta
function cambiarTamaña() {
  const tamaño = selectTamaño.value;
  contenedor.className = `grid-${tamaño}`;
  
  cuadrados.forEach((cuadrado, index) => {
    if (index < tamaño) {
      cuadrado.classList.remove('hidden');
    } else {
      cuadrado.classList.add('hidden');
    }
  });
}

// Función para generar colores
function generarColores() {
  const tamaño = selectTamaño.value;
  const formato = selectFormato.value;
  
  for (let i = 0; i < tamaño; i++) {
    const colorHex = generarColorHEX();
    const colorHsl = hexToHsl(colorHex);
    const colorMuestra = formato === 'hex' ? colorHex : colorHsl;
    
    cuadrados[i].style.backgroundColor = colorHex;
    cuadrados[i].textContent = colorMuestra;
  }

  mostrarToast("¡paleta generada con éxito!");
}

// Función para mostrar toast
function mostrarToast(mensaje) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = mensaje;
  document.body.appendChild(toast);

  // Mostrar el toast
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Ocultar y eliminar después de 3 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Eventos
btn.addEventListener('click', generarColores);
selectTamaño.addEventListener('change', cambiarTamaña);

// Inicializar
cambiarTamaña();
generarColores();