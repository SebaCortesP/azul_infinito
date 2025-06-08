document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const emailEl = document.getElementById("email");
    const passwordEl = document.getElementById("password");
    const roleEl = document.getElementById("role");

    const email = emailEl.value.trim();
    const password = passwordEl.value;
    const role = roleEl.value;

    // Limpiar clases previas
    emailEl.classList.remove("is-valid", "is-invalid");
    passwordEl.classList.remove("is-valid", "is-invalid");
    roleEl.classList.remove("is-valid", "is-invalid");

    const errors = [];

    // Validación de email
    if (!validateEmail(email)) {
      markInvalid(emailEl);
      errors.push("El formato del correo electrónico no es válido.");
    } else {
      markValid(emailEl);
    }

    // Validación de contraseña
    if (!password) {
      markInvalid(passwordEl);
      errors.push("La contraseña no puede estar vacía.");
    } else {
      markValid(passwordEl);
    }

    // Validación de rol
    if (!role) {
      markInvalid(roleEl);
      errors.push("Debe seleccionar un tipo de usuario.");
    } else {
      markValid(roleEl);
    }

    if (errors.length > 0) {
      showAlert(errors.join("<br>"), "danger");
      return;
    }

    // Simulación de inicio de sesión
    showAlert("¡Inicio de sesión exitoso!", "success");

    setTimeout(() => {
      if (role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }
    }, 1500);
  });

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function markInvalid(el) {
    el.classList.add("is-invalid");
  }

  function markValid(el) {
    el.classList.add("is-valid");
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
  }
});
