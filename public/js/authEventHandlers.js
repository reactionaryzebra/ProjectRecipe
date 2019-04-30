const register = document.querySelector("#register-btn");
const login = document.querySelector("#login-btn");

const checkValid = async e => {
  try {
    const typeOfButton = e.target.id.slice(0, -4);
    let formData;
    if (typeOfButton === "register") {
      formData = JSON.stringify({
        username: document.querySelector(`#${typeOfButton}-username`).value,
        password: document.querySelector(`#${typeOfButton}-password`).value,
        passwordConfirm: document.querySelector(
          `#${typeOfButton}-password-confirm`
        ).value
      });
    } else {
      formData = JSON.stringify({
        username: document.querySelector(`#${typeOfButton}-username`).value,
        password: document.querySelector(`#${typeOfButton}-password`).value
      });
    }

    e.preventDefault();
    const jsonData = await fetch(`/auth/${typeOfButton}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: formData,
      redirect: "follow"
    })
    const data = await jsonData.json()
    if (data.created) {
      window.location.href = `/users/${data.id}`;
    } else {
      document.querySelector(`.${typeOfButton}-message`).innerText = data;
    }
  } catch (err) {
    throw new Error(err)
  };
}


register.addEventListener("click", checkValid);
login.addEventListener("click", checkValid);