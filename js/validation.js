(function () {
  "use strict";

  var form = document.getElementById("loginForm");

  form.addEventListener("input", function (event) {
    if (event.target.validity.valid) {
      event.target.classList.add("is-valid");
      event.target.classList.remove("is-invalid");
    } else {
      event.target.classList.remove("is-valid");
      event.target.classList.add("is-invalid");
    }
  });

  form.addEventListener("submit", function (event) {
    if (form.checkValidity()) {
      console.log("Form submitted successfully!");
    } else {
      event.preventDefault();
      event.stopPropagation();
    }

    form.classList.add("was-validated");
  });
})();
