//Constructor para seguro
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;

};

Seguro.prototype.cotizarSeguro = function(){
    /*
    Seguros 
    1=americano 1.15
    2=asiatico 1.05
    3=europeo 1.35

    */
    
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    
        }

    

    //Leer el anio
    const diferenciaAnios = new Date().getFullYear() - this.anio;
    //cada anio de diferencia se reduce 3% el valor del seguro

    cantidad -= ((diferenciaAnios *3) * cantidad) / 100;

    /*
    seguro basico 30% mas
    seguro completo 50% mas
    
    */ 
    
    if (this.tipo==='basico'){

        cantidad *= 1.3;
    }else{

        cantidad *= 1.5;
    }

    return cantidad;

    }

//aca va lo que se muestra

function Interfaz(){};

//mensaje que se imprime en el HTML
Interfaz.prototype.mostrarError = function(mensaje, tipo){
    const div = document.createElement('div');
    
    if (tipo === 'error'){
        div.classList.add('mensaje','error');
    }else{
        div.classList.add('mensaje','correcto');
    }

    div.innerHTML = `${mensaje}`;

    formulario. insertBefore(div, document.querySelector('form-group')) 

    setTimeout(function(){

        document.querySelector('.mensaje').remove();

    },2000)
};


//Imprime resultado de la cotizacion

Interfaz.prototype.mostrarResultado = function(seguro, total){

    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break; 
    }
    
    const div = document.createElement('div');

    //Inserto la info

    div.innerHTML = `
    <p class='header' > Tu resumen </p>
    Marca: ${marca} </br>
    Año: ${seguro.anio} </br>
    Tipo del seguro: ${seguro.tipo} </br>
    Total: $${total} </br>
    `;

    resultado.appendChild(div);

}


//Event Listeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value; //retorna el value del option

    //leer el anio seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    //crear instancia de interfaz
    const interfaz = new Interfaz();

    //Revisamos que los datos no esten vacio

    if(marcaSeleccionada === '' || anioSeleccionado === ''){
        const resultados = document.querySelector('#resultado div')
        if (resultados != null){
            resultados.remove()
        }
        interfaz.mostrarError('Faltan datos, ingresar faltantes', 'error');

    }else{
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div')
        if (resultados != null){
            resultados.remove()
        }

        seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        
        //Cotizar el seguro
        const cantidad = seguro.cotizarSeguro(seguro)

        //mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);

        
    }


})






//por cuestiones de la empresa solo podemos almacenar autos de hasta 20 anios atras
const max = new Date().getFullYear(),
    min = max-20;



const selectAnios = document.getElementById('anio');


for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);


}






