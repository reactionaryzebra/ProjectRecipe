const register = document.querySelector("#register-btn");
const login = document.querySelector("#login-btn");

const checkValid = e => {
  const typeOfButton = e.target.id.slice(0, -4);
  const formData = JSON.stringify({
    username: document.querySelector(`#${typeOfButton}-username`).value,
    password: document.querySelector(`#${typeOfButton}-password`).value
  });
  e.preventDefault();
  fetch(`/users/${typeOfButton}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: formData,
    redirect: "follow"
  })
    .then(res => res.json())
    .then(data => {
      if (data.created) {
        window.location.href = `/users/${data.id}`;
      } else {
        document.querySelector(`.${typeOfButton}-message`).innerText = data;
      }
    })
    .catch(err => console.log(err));
};

register.addEventListener("click", checkValid);
login.addEventListener("click", checkValid);
