import $ from 'jquery';
import db  from "./firebaseco";
import {
  getDoc ,
  doc,
} from "firebase/firestore";

$(document).ready(function() {

    function  agregarFechaAleatoria(fecha) {
        // Convertir la fecha en formato "yyyy-MM-dd" a un objeto Date
        const fechaObj = new Date(
          parseInt(fecha.split('-')[0]),  // Año
          parseInt(fecha.split('-')[1]) - 1,  // Mes 
          parseInt(fecha.split('-')[2])  // Día
        );
      
        // Generar un número aleatorio de 1 a 100 para los años a agregar
        const anosAleatorios = Math.floor(Math.random() * 100) + 1;
      
        // Agregar los años aleatorios a la fecha
        fechaObj.setFullYear(fechaObj.getFullYear() + anosAleatorios);
      
        // Generar un número aleatorio de 1 a 12 para los meses a agregar
        const mesesAleatorios = Math.floor(Math.random() * 12) + 1;
      
        // Agregar los meses aleatorios a la fecha
        fechaObj.setMonth(fechaObj.getMonth() + mesesAleatorios);
      
        // Generar un número aleatorio de 1 a 30 para los días a agregar
        const diasAleatorios = Math.floor(Math.random() * 30) + 1;
      
        // Agregar los días aleatorios a la fecha
        fechaObj.setDate(fechaObj.getDate() + diasAleatorios);
      
        // Obtener los componentes de la nueva fecha (año, mes y día)
        const nuevoAno = fechaObj.getFullYear();
        const nuevoMes = fechaObj.getMonth() + 1;  // 
        const nuevoDia = fechaObj.getDate();
      
        // Formatear la nueva fecha en el formato "yyyy-MM-dd"
        const nuevaFecha = `${nuevoAno}-${nuevoMes.toString().padStart(2, '0')}-${nuevoDia.toString().padStart(2, '0')}`;
      
        return nuevaFecha;
      }
            
        // Función para realizar la proyeccion y el detalle del cliente"
        function hacerProyeccion() {
            if (window.location.pathname.includes('proyeccion.html')) {
                const urlParams = new URLSearchParams(window.location.search);
                const clienteId = urlParams.get('id');
        
                if (clienteId) {
                    const clienteDocRef = doc(db, 'cliente', clienteId);
                    //Ingresar datos de cliente por ID
                    getDoc(clienteDocRef)
                    .then((docSnapshot) => {
                        if (docSnapshot.exists()) {
                            const clienteData = docSnapshot.data();
                            $('#nombreCliente').text(clienteData.nombre);
                            $('#apellidoCliente').text(clienteData.apellido);
                            $('#edadCliente').text(clienteData.edad);
                            $('#fechanacCliente').text(clienteData.fechanac);
                            // Genera la fecha de muerte aleatoria
                            $('#fechamuerCliente').text(agregarFechaAleatoria(clienteData.fechanac));
                        } else {
                        console.log("El cliente no existe.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error al obtener los datos del cliente:", error);
                    });
                }
            }
        }

        hacerProyeccion();
});