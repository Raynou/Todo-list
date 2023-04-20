const container = document.getElementsByClassName("container");
const addCard = document.getElementById("addCard");
const todoName = document.getElementById("todoName");
const todoDescription = document.getElementById("todoDescription");
const modal = document.getElementById("editModal");
const url = "http://localhost:5555/api/database";

renderInfo();

addCard.addEventListener("click", async () => {
  const name = todoName.value;
  const description = todoDescription.value;
  await addTodo({
    name: name,
    description: description,
  });
});

async function addTodo({ name, description }) {
  const todo = {
    name: name,
    description: description,
  };
  await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(todo),
  });
}

async function updateTodo({ id, name, description }) {
  const body = {
    id: id,
    name: name,
    description: description,
  };
  await fetch(url, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
  renderInfo();
}

async function deleteTodo(id) {
  const body = {
    id: id,
  };
  await fetch(url, {
    method: "DELETE",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

async function getTodo() {
  const todos = await fetch(url);
  return todos.json();
}

async function renderInfo() {
  const todos = await getTodo();
  todos.forEach((todo) => {
    const [id, name, description] = Object.values(todo);
    createCard(id, name, description);
  });
}

async function getTodoById(id) {
  const todo = await fetch(`${url}/${id}`);
  return todo.json();
}

async function fillModal(id) {
  const todo = await getTodoById(id);
  const [_, name, description] = Object.values(todo);
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modifyTodo = document.getElementById("modifyTodo");
  modalTitle.value = name;
  modalDescription.value = description;
  modifyTodo.addEventListener("click", async () =>
    await updateTodo({ id: id, name: modalTitle.value, description: modalDescription.value })
  );
}

function createCard(id, name, description) {
  const card = document.createElement("div");
  card.className = "card w-100";
  card.style = "width: 18rem";
  card.setAttribute("id", id);
  const cardHeader = createCardHeader(card.id, name);
  const cardBody = createCardBody(card.id, description);

  card.appendChild(cardHeader);
  card.appendChild(cardBody);

  const container = document.getElementById("container");
  container.appendChild(card);
}

function createCardHeader(id, name) {
  const cardHeader = document.createElement("div");
  cardHeader.className =
    "card-header d-flex justify-content-between align-items-center";

  const cardTitle = document.createElement("h5");
  cardTitle.innerText = `${name}`;

  const deleteButton = document.createElement("button");
  deleteButton.className = "close";
  deleteButton.ariaLabel = "Close";
  deleteButton.addEventListener("click", async () => {
    deleteTodo(id);
  });

  const spanDelete = document.createElement("span");
  spanDelete.ariaHidden = true;
  spanDelete.innerHTML = "&times;";

  deleteButton.appendChild(spanDelete);
  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(deleteButton);

  return cardHeader;
}

function createCardBody(id, description) {
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardText = document.createElement("p");
  cardText.className = "cardText";
  cardText.innerText = `${description}`;

  const showModal = document.createElement("a");
  showModal.className = "btn btn-primary";
  showModal.innerText = "Edit todo";
  showModal.setAttribute("data-bs-toggle", "modal");
  showModal.setAttribute("data-bs-target", "#exampleModal");
  showModal.addEventListener("click", () => {
    fillModal(id);
  });

  cardBody.appendChild(cardText);
  cardBody.appendChild(showModal);

  return cardBody;
}
