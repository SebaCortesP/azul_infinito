document.addEventListener("DOMContentLoaded", function () {
  const defaultUser = {
    firstName: "Admin",
    lastName: "Istrador",
    birthDate: "1992-01-10",
    email: "seba.cortes@duoc.cl", 
    password: "A12345678.",
    profile: "admin",
  };

  const userNameElement = document.getElementById("user-name");

  if (userNameElement) {
    userNameElement.textContent = `${defaultUser.firstName} ${defaultUser.lastName}`;
  }
});
