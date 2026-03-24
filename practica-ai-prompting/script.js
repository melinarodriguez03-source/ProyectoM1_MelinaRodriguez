const btn = document.getElementById('btn');
const cuadrados = document.querySelectorAll('.cuadrado');

// Función para generar un color hexadecimal aleatorio
function generarColorAleatorio() {
  const letras = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letras[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Función para cambiar los colores de todos los cuadrados
function cambiarColores() {
  cuadrados.forEach(cuadrado => {
    cuadrado.style.backgroundColor = generarColorAleatorio();
  });
}

// Agregar evento al botón
btn.addEventListener('click', cambiarColores);