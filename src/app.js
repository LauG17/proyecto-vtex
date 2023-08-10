import $ from 'jquery';
import db  from "./firebaseco";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

$(document).ready(function() {
  const clienteCollection = collection(db , "cliente");
  console.log(clienteCollection);

  // Función para obtener el promedio de edades
  function calcularPromedioEdades() {
    return new Promise((resolve, reject) => {
      const clientesCollection = collection(db, "cliente");
  
      getDocs(clientesCollection)
        .then((querySnapshot) => {
          let totalEdades = 0;
          let totalClientes = 0;
  
          querySnapshot.forEach((doc) => {
            const clienteData = doc.data();
            if (clienteData.edad !== undefined && !isNaN(clienteData.edad)) {
              totalEdades += clienteData.edad;
              totalClientes++;
            }
          });
  
          if (totalClientes > 0) {
            const promedioEdades = totalEdades / totalClientes;
            resolve(promedioEdades); // Devolver el promedio calculado
          } else {
            reject("No se encontraron edades válidas para calcular el promedio.");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // Función para obtener la desviacion de edades
  function calcularMedia(arr) {
    const suma = arr.reduce((total, num) => total + num, 0);
    return suma / arr.length;
  }

  // Función para obtener la desviación estándar de un conjunto de números
  function calcularDesviacionEstandar(arr) {
    const media = calcularMedia(arr);
    const sumatoriaCuadrados = arr.reduce((total, num) => total + Math.pow(num - media, 2), 0);
    const varianza = sumatoriaCuadrados / arr.length;
    return Math.sqrt(varianza);
  }

  const clientesCollection = collection(db, "cliente");

  // Obtener edades de los clientes y calcular desviación estándar
  const edades = [];

  getDocs(clientesCollection).then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const clienteData = doc.data();
      if (clienteData.edad !== undefined && !isNaN(clienteData.edad)) {
        edades.push(clienteData.edad);
      }
    });

    if (edades.length > 0) {
      const desviacionEstandar = calcularDesviacionEstandar(edades);
      document.querySelector(".desviacion-clientes p").append(desviacionEstandar);
      console.log("Desviación estándar de edades:", desviacionEstandar);
      // Puedes mostrar el resultado en una etiqueta HTML o realizar otra acción
    } else {
      console.log("No se encontraron edades válidas para calcular la desviación estándar.");
    }
    }).catch((error) => {
    console.error("Error al obtener los datos:", error);
  });


    const getUsersPromise = ( ) => {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await getDocs(clienteCollection);
          const usersData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          resolve(usersData);
        } catch (error) {
          reject(error);
        }
      });
    };
    
    getUsersPromise().then((users) => {
      // Aquí puedes usar los datos de usuarios que has obtenido
      calcularPromedioEdades()
        .then((promedioCli) => {
          document.querySelector(".promedio-clientes p").append(promedioCli);
        })
        .catch((error) => {
          console.log(error);
      });
    
      users.forEach((user) => {
        const row = $('<tr>');
    
        // Crear celdas y asignar valores
        $('<td>').text(user.nombre).appendTo(row);
        $('<td>').text(user.apellido).appendTo(row);
    
        // Crear el botón "Ver Detalle" con el ID del cliente como atributo
        const verDetalleButton = $('<button>').text('Ver Detalle')
          .attr('data-cliente-id', user.id)
          .click(verDetalleClickHandler);
        $('<td>').append(verDetalleButton).appendTo(row);
    
        // Agregar la fila a la tabla
        $('#clienteTable tbody').append(row);
      });
    }).catch((error) => {
      // Aquí manejas los errores en caso de que ocurra alguno
      console.log(error)
    });  

  // Función para manejar el clic en el botón "Ver Detalle"
  function verDetalleClickHandler() {
    const clienteId = $(this).attr('data-cliente-id');
    // Aquí puedes implementar la lógica para mostrar los detalles del cliente
    // Puedes acceder al ID del cliente (clienteId) para realizar consultas adicionales si es necesario.
    console.log('Clic en Ver Detalle del cliente:', clienteId);
  }
});
