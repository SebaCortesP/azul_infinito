document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener campos
    const firstNameEl = document.getElementById("firstName");
    const lastNameEl = document.getElementById("lastName");
    const birthDateEl = document.getElementById("age");
    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    const confirmPasswordEl = document.getElementById("confirm-password");

    // Valores
    const firstName = firstNameEl.value.trim();
    const lastName = lastNameEl.value.trim();
    const birthDate = birthDateEl.value;
    const email = emailEl.value.trim();
    const password = passwordEl.value;
    const confirmPassword = confirmPasswordEl.value;

    const errors = [];

    // Reset clases
    [firstNameEl, lastNameEl, birthDateEl, emailEl, passwordEl, confirmPasswordEl].forEach(el => {
      el.classList.remove("is-invalid", "is-valid");
    });

    // Validaciones
    if (firstName.length < 2) {
      markInvalid(firstNameEl);
      errors.push("Nombre inválido.");
    } else {
      markValid(firstNameEl);
    }

    if (lastName.length < 2) {
      markInvalid(lastNameEl);
      errors.push("Apellido inválido.");
    } else {
      markValid(lastNameEl);
    }

    const age = calculateAge(birthDate);
    if (isNaN(age) || age < 18) {
      markInvalid(birthDateEl);
      errors.push("Debes ser mayor de edad.");
    } else {
      markValid(birthDateEl);
    }

    if (!validateEmail(email)) {
      markInvalid(emailEl);
      errors.push("Correo electrónico inválido.");
    } else {
      markValid(emailEl);
    }

    if (password !== confirmPassword) {
      markInvalid(confirmPasswordEl);
      errors.push("Las contraseñas no coinciden.");
    }

    if (!validatePassword(password)) {
      markInvalid(passwordEl);
      errors.push("La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, un número y un símbolo.");
    }

    if (errors.length > 0) {
      showAlert(errors.join("<br>"), "danger");
      return;
    }

    markValid(passwordEl);
    markValid(confirmPasswordEl);

    // Registro exitoso simulado
    showAlert(`¡Registro exitoso! Bienvenido/a ${firstName} ${lastName}.`, "success");
    form.reset();

    // Limpiar clases visuales
    [firstNameEl, lastNameEl, birthDateEl, emailEl, passwordEl, confirmPasswordEl].forEach(el => {
      el.classList.remove("is-valid");
    });
  });

  function calculateAge(birthDate) {
    if (!birthDate) return NaN;
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\[\]{}|\\:;"'<>,.?/~`-]).{8,16}$/;
    return regex.test(password);
  }

  function markInvalid(element) {
    element.classList.add("is-invalid");
  }

  function markValid(element) {
    element.classList.add("is-valid");
  }

  function showAlert(message, type = "danger") {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = "";

    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alert.role = "alert";
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    `;
    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.classList.remove("show");
      alert.classList.add("hide");
      setTimeout(() => alert.remove(), 300);
    }, 5000);
    setTimeout(() => {
      window.location.href = "user.html";
    }, 1500);
  }
});
  