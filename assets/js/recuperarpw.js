document.addEventListener("DOMContentLoaded", function () {
  const existingUsers = JSON.parse(localStorage.getItem("users"));

  if (!existingUsers || existingUsers.length === 0) {
    const defaultUsers = [
      {
        firstName: "Seba",
        lastName: "Cortés",
        birthDate: "1992-01-10",
        email: "seba.cortesp@duocuc.cl",
        password: "A12345678.",
        profile: "admin",
      },
      {
        firstName: "Rodrigo",
        lastName: "Díaz",
        birthDate: "1995-06-21",
        email: "rodrigo.diazv@duocuc.cl",
        password: "A12345678.",
        profile: "user",
      },
      {
        firstName: "Juan",
        lastName: "Pérez",
        birthDate: "1988-12-05",
        email: "felipe.guerrerom@duocuc.cl",
        password: "A12345678.",
        profile: "user",
      },
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
    console.log("Usuarios predeterminados cargados en localStorage.");
  }
  const form = document.querySelector("form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    emailInput.classList.remove("is-valid", "is-invalid");
    passwordInput.classList.remove("is-valid", "is-invalid");
    confirmPasswordInput.classList.remove("is-valid", "is-invalid");
    const errors = [];

    // Validar formato de correo electrónico
    if (!validateEmail(email)) {
      emailInput.classList.add("is-invalid");
      errors.push("El formato del correo electrónico no es válido.");
    } else {
      emailInput.classList.add("is-valid");
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      passwordInput.classList.add("is-invalid");
      confirmPasswordInput.classList.add("is-invalid");
      errors.push("Las contraseñas no coinciden.");
    } else {
      confirmPasswordInput.classList.add("is-valid");
    }

    // Validar formato de contraseña
    if (!validatePassword(password)) {
      passwordInput.classList.add("is-invalid");
      if (!errors.includes("Las contraseñas no coinciden.")) {
        errors.push(
          "La contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, un número y un símbolo."
        );
      }
    } else if (password === confirmPassword) {
      passwordInput.classList.add("is-valid");
    }

    if (errors.length > 0) {
      showAlert(errors.join("<br>"), "danger");
      return;
    }

    showAlert("Contraseña actualizada exitosamente.", "success");
    // form.reset();
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{}|\\:;"'<>,.?/~`-]).{8,16}$/;
    return regex.test(password);
  }

  function showAlert(message, type = "danger") {
    let alertContainer = document.getElementById("alertContainer");

    if (!alertContainer) {
      alertContainer = document.createElement("div");
      alertContainer.id = "alertContainer";
      document.body.prepend(alertContainer);
    }

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;

    setTimeout(() => {
      alertContainer.innerHTML = "";
    }, 5000);
  }
});
