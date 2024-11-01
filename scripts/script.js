const app = document.getElementById("app");
let formData = [];
console.log("formData", formData);

const handlers = {
  onDelete({ obj, element }) {
    element.remove();

    formData = formData.filter((item) => item.id !== obj.id);
    console.log("formData", formData);
  },
};

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

function createForm({ onDelete }) {
  const form = document.createElement("form");
  const label = document.createElement("label");
  const inputLabel = document.createElement("label");
  const input = document.createElement("input");
  const errorMessage = document.createElement("p");
  const filesContainer = document.createElement("ul");
  const button = document.createElement("button");

  form.classList.add("form");
  label.classList.add("label");
  input.classList.add("input");
  input.id = "input";
  inputLabel.classList.add("input-label");
  inputLabel.setAttribute("for", input.id);
  errorMessage.classList.add("error");
  filesContainer.classList.add("list-reset", "files-container");
  button.classList.add("btn-reset", "submit");

  // form.action = "https://jsonplaceholder.typicode.com/posts";
  // form.method = "POST";
  form.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  input.type = "file";
  input.name = "file";
  input.multiple = true;
  button.type = "submit";
  button.addEventListener("click", () => postData(formData));

  label.textContent =
    "Вы можете загрузить до 5 файлов JPG, JPEG, PNG, размер одного — до 10 МБ";
  inputLabel.textContent = "Add file";
  button.textContent = "Submit";

  input.addEventListener("change", (e) =>
    showFiles(e, errorMessage, filesContainer, { onDelete })
  );

  form.append(label, input, inputLabel, errorMessage, filesContainer, button);
  createContainer().append(form);

  return form;
}
createForm(handlers);

function showFiles(event, errorMessage, filesContainer, { onDelete }) {
  const files = event.target.files;
  console.log("event.target.files", files);
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log("reader", e);
      const card = document.createElement("li");
      const button = document.createElement("button");
      const picture = document.createElement("picture");
      const imgPreview = document.createElement("img");
      const imgName = document.createElement("h2");
      const imgFormat = document.createElement("p");
      const imgSize = document.createElement("p");

      card.classList.add("card");
      button.classList.add("btn-remove");
      picture.classList.add("picture");
      imgPreview.classList.add("img-preview");
      imgName.classList.add("img-name");
      imgFormat.classList.add("img-format");
      imgSize.classList.add("img-size");

      const img = e.target.result;
      const name = formatFileName(files[i].name);
      const format = formatFileFormat(files[i].name);
      const size = formatFileSize(files[i].size);

      imgPreview.src = img;
      button.textContent = "Remove";
      imgName.textContent = name;
      imgFormat.textContent = format;
      imgSize.textContent = size;

      let formDataObj = { id: files[i].lastModified, img, name, format, size };
      formData.push(formDataObj);
      console.log("formData", formData);

      button.addEventListener("click", () =>
        onDelete({ obj: formDataObj, element: card })
      );

      picture.append(imgPreview);
      card.append(button, picture, imgName, imgFormat, imgSize);
      filesContainer.append(card);
    };
    reader.readAsDataURL(files[i]);
  }
}

function formatFileName(str) {
  let result = str.split(".");
  result.splice(result.length - 1, 1);
  return result.join(".");
}

function formatFileFormat(str) {
  let result = str.split(".");
  result.splice(0, result.length - 1);
  return result.join("");
}

function formatFileSize(num) {
  const BYTE_IN_MB = 1048576;
  let result = Number(num) / BYTE_IN_MB;
  return result.toFixed(1);
}

// api
async function postData(data) {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}
