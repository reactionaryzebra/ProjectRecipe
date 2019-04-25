const register = document.querySelector("#register-btn");
const login = document.querySelector("#login-btn");

const checkValid = e => {
  console.log(e.target);
  const formData = JSON.stringify({
    username: document.querySelector("#register-username").value,
    password: document.querySelector("#register-username").value
  });
  e.preventDefault();
  fetch("/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: formData
  })
    .then(res => res.json())
    .then(
      data => (document.querySelector(".register-message").innerText = data)
    )
    .catch(err => console.log(err));
};

register.addEventListener("click", checkValid);
register.addEventListener("click", checkValid);
