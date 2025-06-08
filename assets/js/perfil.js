document.addEventListener("DOMContentLoaded", function () {
  // Simulamos un usuario ya logueado
  let loggedUser = {
    firstName: "Usuario",
    lastName: "Logueado",
    birthDate: "1992-01-10",
    email: "alejo.perez@duoc.cl",
    password: "A12345678.",
    profile: "user",
  };

  const form = document.getElementById("profileForm");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");

  const currentPasswordInput = document.getElementById("currentPassword");
  const newPasswordInput = document.getElementById("newPassword");
  const confirmNewPasswordInput = document.getElementById("confirmNewPassword");

  const userNameElement = document.getElementById("user-name");
  if (userNameElement) {
    userNameElement.textContent = `${loggedUser.firstName} ${loggedUser.lastName}`;
  }

  if (!loggedUser) {
    showAlert("No has iniciado sesión.", "danger");
    form.style.display = "none";
    return;
  }

  // Cargar datos en los inputs
  firstNameInput.value = loggedUser.firstName;
  lastNameInput.value = loggedUser.lastName;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newFirstName = firstNameInput.value.trim();
    const newLastName = lastNameInput.value.trim();
    const currentPassword = currentPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    const errors = [];

    // Validaciones básicas
    if (newFirstName.length < 2) {
      errors.push("Nombre inválido.");
    }
    if (newLastName.length < 2) {
      errors.push("Apellido inválido.");
    }

    let updatePassword = false;

    if (!currentPassword) {
      errors.push(
        "Debes ingresar tu contraseña actual para confirmar los cambios."
      );
    } else if (currentPassword !== loggedUser.password) {
      errors.push("La contraseña actual es incorrecta.");
    }

    const isAnyPasswordFieldFilled =
      currentPassword || newPassword || confirmNewPassword;

    if (isAnyPasswordFieldFilled) {
      // Requiere los 3 campos completos
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        errors.push("Debes completar todos los campos de contraseña.");
      } else {
        if (newPassword !== confirmNewPassword) {
          errors.push("Las contraseñas nuevas no coinciden.");
        }
        if (!validatePassword(newPassword)) {
          errors.push(
            "La nueva contraseña debe tener entre 8 y 16 caracteres, al menos una mayúscula, un número y un símbolo."
          );
        } else {
          updatePassword = true;
        }
      }
    }

    if (errors.length > 0) {
      showAlert(errors.join("<br>"), "danger");
      return;
    }

    // Actualizar los datos del usuario simulado
    loggedUser.firstName = newFirstName;
    loggedUser.lastName = newLastName;

    if (updatePassword) {
      loggedUser.password = newPassword;
    }

    // Mostrar mensaje
    showAlert("Perfil actualizado correctamente.", "success");

    // Reiniciar formulario
    form.reset();
    firstNameInput.value = newFirstName;
    lastNameInput.value = newLastName;
  });

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
