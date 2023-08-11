import $ from 'jquery';
import db  from "./firebaseco";
import { collection, addDoc } from "@firebase/firestore"; 

$(document).ready(function() {
  // Validacion del formulario antes de enviarlo
  function validateForm() {
    const nombre = $('#nombre').val();
    const apellido = $('#apellido').val();
    const edad = parseInt($('#edad').val(), 10);

    if (!/^[A-Za-z]+$/.test(nombre) || nombre.length > 20) {
      alert("El nombre debe contener solo letras y no debe exceder los 20 caracteres.");
      return false;
    }

    if (!/^[A-Za-z]+$/.test(apellido) || apellido.length > 20) {
      alert("El apellido debe contener solo letras y no debe exceder los 20 caracteres.");
      return false;
    }

    if (isNaN(edad) || edad < 1 || edad > 100) {
      alert("La edad debe ser un número entero entre 1 y 100.");
      return false;
    }

    return true;
  }

  // Configurar el formulario para capturar los datos y registrar en Firestore
  $('#clienteForm').submit(function(event) {
    event.preventDefault(); // Evitar que el formulario se envie automáticamente

    // Validar el formulario antes de registrar los datos
    if (!validateForm()) {
      return;
    }

    const nombre = $('#nombre').val();
    const apellido = $('#apellido').val();
    const edad = parseInt($('#edad').val(), 10);
    const fechaNacimiento = $('#fechanac').val();

    // Registrar los datos en Firestore
    const clienteCollection = collection(db, "cliente"); // Utiliza la función collection de Firestore
      addDoc(clienteCollection, {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        fechanac: fechaNacimiento
      })
      .then(function(docRef) {
        console.log("Cliente registrado con ID: ", docRef.id);
        alert("Cliente registrado exitosamente.");
        $('#clienteForm')[0].reset(); // Limpiar el formulario
      })
      .catch(function(error) {
        console.error("Error al registrar el cliente: ", error);
      });
    });
});