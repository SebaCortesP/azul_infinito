document.addEventListener("DOMContentLoaded", function () {
  const defaultUser = {
    firstName: "Usuario ",
    lastName: "Logueado ",
    birthDate: "1992-01-10",
    email: "alejo.perez@duoc.cl",
    password: "A12345678.",
    profile: "user",
  };

  localStorage.setItem("logged_user", JSON.stringify(defaultUser));

  // Si tampoco hay users, lo creamos
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify([defaultUser]));
  } else {
    const users = JSON.parse(localStorage.getItem("users"));
    const exists = users.some((user) => user.email === defaultUser.email);
    if (!exists) {
      users.push(defaultUser);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
  let loggedUser = JSON.parse(localStorage.getItem("logged_user"));
  const userNameElement = document.getElementById("user-name");
  if (userNameElement && loggedUser) {
    userNameElement.textContent = `${loggedUser.firstName} ${loggedUser.lastName}`;
  }
});
