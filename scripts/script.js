const app = document.getElementById("app");

function createContainer() {
  const container = document.createElement("div");
  const header = document.createElement("h1");

  container.classList.add("container");
  header.classList.add("header");

  header.textContent = "The input multiple attribute";

  container.append(header);
  app.append(container);

  return container;
}

function createForm() {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const input = document.createElement("input");
  const errorMessage = document.createElement("p");
  const filesContainer = document.createElement("div");
  const button = document.createElement("button");

  form.classList.add("form");
  label.classList.add("label");
  input.classList.add("input");
  errorMessage.classList.add("error");
  filesContainer.classList.add("files-container");
  button.classList.add("btn-reset", "submit");

  form.action = "https://jsonplaceholder.typicode.com/posts";
  form.method = "POST";
  input.type = "file";
  input.name = "file";
  input.multiple = true;
  button.type = "submit";

  label.textContent =
    "Вы можете загрузить до 5 файлов JPG, JPEG, PNG, размер одного — до 10 МБ";
  button.textContent = "Submit";

  input.addEventListener("change", (e) =>
    showFiles(e, errorMessage, filesContainer)
  );

  form.append(label, input, errorMessage, filesContainer, button);
  createContainer().append(form);

  return form;
}

function showFiles(event, errorMessage, filesContainer) {
  const files = event.target.files;
  console.log("event.target.files", files);
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("reader", e);
      // const card = document.createElement("div");
      // const img = document.createElement("img");
      // img.src = e.target.result;
      // card.append(img);
      // filesContainer.append(card);
    };
    reader.readAsDataURL(files[i]); // Начинаем чтение файла как Data URL
  }
}

createForm();
