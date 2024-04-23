var resultado = '';
var entrar = 0;

document.addEventListener('DOMContentLoaded', function() {
  var conversionEntrada = document.getElementById('conversionEntrada');
  var medida = document.getElementById('medida');

  conversionEntrada.addEventListener('change', function() {
    var canversonFin = conversionEntrada.value;
      switch (canversonFin) {
        case 'millas':
          medida.textContent = 'millas';
          break;
        case 'kilómetros':
          medida.textContent = 'kilómetros';
          break;
        case 'metros':
          medida.textContent = 'metros';
          break;
        case 'pies':
          medida.textContent = 'pies';
          break;
        case 'pulgadas':
          medida.textContent = 'pulgadas';
          break;
        case 'centimetros':
          medida.textContent = 'centimetros';
          break;
        }
  });

  var numEntrada = document.getElementById('numEntrada');
  var resultadoFin = document.getElementById('resultadoFin');

  numEntrada.addEventListener('input', convertir);

  conversionEntrada.addEventListener('change', convertir);

  function convertir() {
    var canversonFin = conversionEntrada.value;
    var valor = numEntrada.value;
    if (valor != 0) {
      switch (canversonFin) {
        case 'millas':
          var miles = (valor * 0.621371).toFixed(2);
          resultado = miles + ' millas.';
          break;
        case 'kilómetros':
          var kilometers = (valor / 0.621371).toFixed(2);
          resultado = kilometers + ' kilómetros.';
          break;
        case 'metros':
          var meters = (valor * 0.3048).toFixed(2);
          resultado = meters + ' metros.';
          break;
        case 'pies':
          var feet = (valor / 0.3048).toFixed(2);
          resultado = feet + ' pies.';
          break;
        case 'pulgadas':
          var inches = (valor * 0.393701).toFixed(2);
          resultado = inches + ' pulgadas.';
          break;
        case 'centimetros':
          var centimeters = (valor / 0.393701).toFixed(2);
          resultado = centimeters + ' centímetros.';
          break;
        }
        resultadoFin.textContent = resultado;
    } else {
      resultadoFin.textContent = '';
      resultado = '';
    }
  }

  mostrarMedidas()
});

function repetir(){
    if(resultado.includes(resultado)) {
      console.log("se repite");
    return;
  }
}

function guardarLocalStorage() {
  if (resultado != '') {
    var guardadoJSON = localStorage.getItem('guardado');
    var guardado = guardadoJSON ? JSON.parse(guardadoJSON) : [];

    var isDuplicate = guardado.some(function(guardado) {
      return guardado === resultado;
    });

    if(!isDuplicate){
      if (guardado.length >= 10) {
        guardado.shift();
      }
  
      guardado.push(resultado)
  
      var actualizarGuardadoJSON = JSON.stringify(guardado);
  
      localStorage.setItem('guardado', actualizarGuardadoJSON);

      guardarConversionMYSQL(resultado);

      mostrarMedidas();
    }
  }
}

function borrarGuardado(guardar){
  var guardadoJSON = localStorage.getItem('guardado');
  if(guardadoJSON) {
    guardado = JSON.parse(guardadoJSON);

    var actualizarGuardado = guardado.filter(function(item) {
      return item !== guardar;
    });

    var actualizarGuardadoJSON = JSON.stringify(actualizarGuardado);

    localStorage.setItem('guardado', actualizarGuardadoJSON);

    mostrarMedidas();
  }
}

function mostrarMedidas() {
  var listaMedidas = document.getElementById('listaMedidas');
  listaMedidas.innerHTML = '';
  var guardadoJSON = localStorage.getItem('guardado');
  if(guardadoJSON) {
    var guardado = JSON.parse(guardadoJSON);

    guardado.forEach(function(guardar) {
      var li = document.createElement('li');
      li.textContent = guardar;

      var botonBorrar = document.createElement('button');
      botonBorrar.textContent = "borrar";
      botonBorrar.onclick = (function(guardar) {
        return function() {
          borrarGuardado(guardar);
        };
      })(guardar);
      li.appendChild(botonBorrar);

      listaMedidas.appendChild(li);  
    });
    
  }  
}

function guardarConversionMYSQL(conversion) {
  fetch('php/guardar_conversion.php', {
    method: 'POST',
    body: 'registro=' + encodeURIComponent(conversion),
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.text())
  .catch(error => {
    console.error('Error mysql:', error);
  });
}