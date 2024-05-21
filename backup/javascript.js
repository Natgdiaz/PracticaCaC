document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const interests = document.querySelectorAll('input[name="interests"]:checked');

    const formData = new FormData(event.target);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Validaciones
    if (!validateUsername(username)) {
        alert('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Por favor, ingresa un correo electrónico válido.');
        return;
    }

    if (!validatePassword(password)) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    if (!validateDob(dob)) {
        alert('Por favor, ingresa una fecha de nacimiento válida.');
        return;
    }

    if (!gender) {
        alert('Por favor, selecciona tu género.');
        return;
    }

    if (interests.length === 0) {
        alert('Por favor, selecciona al menos un interés.');
        return;
    }

    alert('Registro exitoso');
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        // Manejo de la respuesta del servidor
        if (data.success) {
            alert('Registro exitoso!');
            window.location.href = 'index.html';
        } else {
            alert('Error en el registro: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function validateUsername(username) {
    return username.length >= 3;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateDob(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    return birthDate < today;
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}