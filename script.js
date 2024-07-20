$(document).ready(function(){
  // Mostrar el Mensaje de la Galeria
  $('#mostrarMensaje').show();

  // Evitar que se dispare el clic en el enlace de YouTube
  $('#dedicatoria').click(function(event){
    event.stopPropagation();
  });

  // Al hacer clic en la página mostrará las imágenes
  $(document).click(function(){
    $('#mostrarMensaje').fadeOut(function(){
      $('#imageGallery').fadeIn();
    });
  });
});

// Movimientos de Imagenes
const pictures = document.querySelectorAll('.Picture');
var previousTouch = undefined;

function updateElementPosition(element, event) {
  var movementX, movementY;

  if (event.type === 'touchmove') {
    const touch = event.touches[0];
    movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
    movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
    previousTouch = touch;
  } else {
    movementX = event.movementX;
    movementY = event.movementY;
  }
  
  const elementY = parseInt(element.style.top || 0) + movementY;
  const elementX = parseInt(element.style.left|| 0) + movementX;

  element.style.top = elementY + "px";
  element.style.left = elementX + "px";
}

function startDrag(element, event) {
  event.preventDefault();
  const updateFunction = (event) => updateElementPosition(element, event);
  const stopFunction = () => stopDrag({update: updateFunction, stop: stopFunction});
  document.addEventListener("mousemove", updateFunction);
  document.addEventListener("touchmove", updateFunction);
  document.addEventListener("mouseup", stopFunction);
  document.addEventListener("touchend", stopFunction);
}

function stopDrag(functions) {
  event.preventDefault();
  previousTouch = undefined;
  document.removeEventListener("mousemove", functions.update);
  document.removeEventListener("touchmove", functions.update);
  document.removeEventListener("mouseup", functions.stop);
  document.removeEventListener("touchend", functions.stop);
}

pictures.forEach(picture => {
  const range = 100;
  const randomX = Math.random() * (range * 2) - range;
  const randomY = Math.random() * (range * 2) - range;
  const randomRotate = Math.random() * (range / 2) - range / 4;
  const startFunction = (event) => startDrag(picture, event);
  picture.style.top = `${randomY}px`;
  picture.style.left = `${randomX}px`;
  picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
  picture.addEventListener("mousedown", startFunction);
  picture.addEventListener("touchstart", startFunction);
});

// Transiciones al pasar de una pestaña a otra
$('.hero-btn').click(function(){
  if(!$('.hero-btn').parent().hasClass('active')){
    $(this).parent().stop().addClass('active');
    setTimeout(function(){  
      $('.hero-btn').parent().removeClass('active'); 
      iniciarTransicion();
    }, 2500);
  }
});

function iniciarTransicion() {
  $('body').addClass('fade-out');
  setTimeout(function(){
    window.location.href = "galeria.html";
  }, 500);
}


