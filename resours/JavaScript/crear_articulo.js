document.addEventListener('DOMContentLoaded', function () {
    const formAgregarPersonaje = document.getElementById('form-agregar-personaje');
    formAgregarPersonaje.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre-personaje').value.trim();
        const descripcion = document.getElementById('descripcion-personaje').value.trim();
        const imagen = document.getElementById('imagen-personaje').value.trim();

        const nuevoPersonaje = {
            nombre: nombre,
            descripcion: descripcion,
            imagen: imagen
        };

        // Recuperar los personajes existentes del localStorage
        let personajes = JSON.parse(localStorage.getItem('personajes')) || [];
        // Agregar el nuevo personaje
        personajes.push(nuevoPersonaje);
        // Guardar de nuevo en localStorage
        localStorage.setItem('personajes', JSON.stringify(personajes));

        // Redirigir a la página de todos los personajes
        window.location.href = '/personajes/todos-los-personajes.html';
    });
});
