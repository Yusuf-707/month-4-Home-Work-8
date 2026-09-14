const BASE_URL = "https://jsonplaceholder.typicode.com";

const form = document.getElementById("form");
const toast = document.getElementById("toast");

const container = document.getElementById("container");
container.setAttribute("class", "container");
// TODO DELETE FUNC
const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    console.log("Пользователь удалён");
  } catch (err) {
    console.error("ERROR", err.message);
  }
};

const renderUsers = (users = []) => {
  users.forEach((user) => {
    const box = document.createElement("div");

    const { id, name, email, address, phone, website } = user;

    box.innerHTML = `
            <h2>${name} <b>${id}: пользователя</b></h2>
            <h2><b>почта: </b>${email}</h2>
            <h2><b>адрес: </b>${address.street}</h2>
            <h2><b>номер телефона: </b>${phone}</h2>
            <h2><b>личный сайт: </b>${website}</h2>
            <button class="delete-btn">Удалить</button>
        `;

    const deleteBtn = box.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
      deleteUser(id);
    });

    container.append(box);
  });
};
// TODO GET FUNC
const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    renderUsers(data);
  } catch (err) {
    console.error("Error", err.message);
  }
};

// TODO POST FUNC
const createUser = async (e) => {
  e.preventDefault();
  const name = document.getElementById("form-name").value;
  const email = document.getElementById("form-email").value;
  const phone = document.getElementById("form-phone").value;
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
      }),
    });
    const data = await response.json();
    container.innerHTML = "";
    getUsers();
    form.reset();
    toast.textContent = `Пользователь: ${data.name} успешно создан`;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  } catch (err) {
    console.error("Oshibka pri sozdanii polzovatelya: ", err.message);
  }
};

form.addEventListener("submit", createUser);

getUsers();
