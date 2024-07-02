document.addEventListener('DOMContentLoaded', function () {
    // Función para manejar el mini menú
    document.querySelectorAll('.contenedor-com-art_personajes').forEach(function (dropdown) {
        var trigger = dropdown.querySelector('.contenido-articulo_personajes');
        var menu = dropdown.querySelector('.dropdown-personajes-content');
        var timeout;

        trigger.addEventListener('mouseover', function () {
            clearTimeout(timeout);
            menu.style.display = 'block';
        });

        trigger.addEventListener('mouseout', function () {
            timeout = setTimeout(function () {
                menu.style.display = 'none';
            }, 500); // Ajusta el tiempo (en milisegundos) que el menú permanece visible aquí
        });

        menu.addEventListener('mouseover', function () {
            clearTimeout(timeout);
            menu.style.display = 'block';
        });

        menu.addEventListener('mouseout', function () {
            timeout = setTimeout(function () {
                menu.style.display = 'none';
            }, 500); // Ajusta el tiempo (en milisegundos) que el menú permanece visible aquí
        });
    });

    // Funcionalidad para mostrar y ocultar descripciones largas
    document.querySelectorAll('.toggle-description').forEach(button => {
        button.addEventListener('click', function () {
            const shortDesc = this.previousElementSibling.previousElementSibling;
            const longDesc = this.previousElementSibling;
            if (longDesc.style.display === 'none' || !longDesc.style.display) {
                longDesc.style.display = 'inline';
                shortDesc.style.display = 'none';
                this.textContent = 'Mostrar menos';
            } else {
                longDesc.style.display = 'none';
                shortDesc.style.display = 'inline';
                this.textContent = 'Mostrar más';
            }
        });
    });

    // Funcionalidad para cargar personajes desde el localStorage
    const contenedorPersonajes = document.getElementById('contenedor-personajes');
    if (contenedorPersonajes) {
        const personajes = JSON.parse(localStorage.getItem('personajes')) || [];

        personajes.forEach(personaje => {
            let newCharacterElement = document.createElement('div');
            newCharacterElement.classList.add('contenedor-com-art_personajes');
            newCharacterElement.innerHTML = `
                <input type="checkbox" class="select-article-checkbox" data-nombre="${personaje.nombre}">
                <img class="img-art_personajes" src="${personaje.imagen}" alt="${personaje.nombre}" data-character-info="${personaje.descripcion}">
                <p class="contenido-articulo_personajes">${personaje.nombre}</p>
                <div class="dropdown-personajes">
                    <div class="dropdown-personajes-content contenido-articulo_personajes">
                        <a class="mas-texto">${personaje.descripcion}</a>
                        <a href="/personajes/Super-Smash-Bros.(1999).html#${personaje.nombre.toLowerCase().replace(/ /g, '-')}">${personaje.nombre} (Nintendo 64)</a>
                    </div>
                </div>
            `;
            contenedorPersonajes.appendChild(newCharacterElement);
        });
    }

    // Validación del formulario de contacto
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevenir el envío del formulario

            const nombre = document.getElementById('nombre').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            let errorMessage = '';

            if (!validateName(nombre)) {
                errorMessage += 'El nombre es obligatorio y debe tener al menos 3 caracteres.\n';
            }

            if (!validateEmail(correo)) {
                errorMessage += 'El correo no es válido.\n';
            }

            if (!validateMessage(mensaje)) {
                errorMessage += 'El comentario es obligatorio y debe tener al menos 10 caracteres.\n';
            }

            if (errorMessage !== '') {
                mostrarError(errorMessage);
            } else {
                alert('Formulario enviado correctamente');
                form.reset(); // Resetear el formulario después de la validación
            }
        });

        function validateName(name) {
            return name.length >= 3;
        }

        function validateEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }

        function validateMessage(message) {
            return message.length >= 10;
        }

        function mostrarError(mensaje) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.innerText = mensaje;
            document.body.appendChild(errorDiv);
            setTimeout(() => errorDiv.remove(), 5000);
        }
    }

    // Funcionalidad para eliminar artículos seleccionados
    const deleteButton = document.getElementById('delete-selected-articles');
    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            const selectedCheckboxes = document.querySelectorAll('.select-article-checkbox:checked');
            const nombresAEliminar = Array.from(selectedCheckboxes).map(checkbox => checkbox.getAttribute('data-nombre'));

            let personajes = JSON.parse(localStorage.getItem('personajes')) || [];
            personajes = personajes.filter(personaje => !nombresAEliminar.includes(personaje.nombre));
            localStorage.setItem('personajes', JSON.stringify(personajes));

            // Recargar la página para reflejar los cambios
            location.reload();
        });
    }
});
