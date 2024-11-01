const app = document.getElementById("app");

function createFileUploader() {
  let formData = [];
  
  function render() {
    app.innerHTML = "";
    const form = createForm();
    app.append(form);
    console.log("formData", formData);


    const filesContainer = form.querySelector(".files-container");
    formData.forEach((fileData) => {
      const fileCard = createFileCard(fileData);
      filesContainer.append(fileCard);
    });
  }
  render();

  function handleFileDelete(fileData) {
    formData = formData.filter((item) => item.id !== fileData.id);
    render();
  }

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

    input.addEventListener("change", (event) => {
      const files = event.target.files;
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = e.target.result;
          const name = formatFileName(file.name);
          const format = formatFileFormat(file.name);
          const size = formatFileSize(file.size);

          let formDataObj = {
            id: file.lastModified,
            img,
            name,
            format,
            size,
          };
          formData.push(formDataObj);
          render();
        };
        reader.readAsDataURL(file);
      });
    });

    form.append(label, input, inputLabel, errorMessage, filesContainer, button);
    createContainer().append(form);

    return form;
  }

  function createFileCard(fileData) {
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

    imgPreview.src = fileData.img;
    button.textContent = "Remove";
    imgName.textContent = fileData.name;
    imgFormat.textContent = fileData.format;
    imgSize.textContent = fileData.size;

    button.addEventListener("click", () => handleFileDelete(fileData));

    picture.append(imgPreview);
    card.append(button, picture, imgName, imgFormat, imgSize);

    return card;
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
}

createFileUploader();
