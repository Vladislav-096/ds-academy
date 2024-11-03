const app = document.getElementById("app");
const BYTE_IN_MB = 1048576;
const errorsList = document.createElement("ul");

function createFileUploader() {
  let formData = [];

  function render() {
    app.innerHTML = "";
    const form = createForm();
    app.append(form);

    const filesContainer = form.querySelector(".files-container");
    form.insertBefore(errorsList, filesContainer);
    errorsList.classList.add("error-warning-list");

    formData.forEach((fileData) => {
      const fileCard = createFileCard(fileData);
      filesContainer.append(fileCard);
    });
    console.log("formData", formData);
  }
  render();

  function handleFileDelete(fileData) {
    formData = formData.filter((item) => item.id !== fileData.id);
    const error = errorsList.querySelector("#limit");
    if (error !== null) {
      error.remove();
    }
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
    const filesContainer = document.createElement("ul");
    const button = document.createElement("button");

    form.classList.add("form");
    label.classList.add("label");
    input.classList.add("input");
    input.id = "input";
    inputLabel.classList.add("input-label");
    inputLabel.setAttribute("for", input.id);
    filesContainer.classList.add("list-reset", "files-container");
    button.classList.add("btn-reset", "submit");

    filesContainer.addEventListener("dragstart", (e) => {
      // Проверяем, является ли целевой (родительский) элемент карточкой
      if (e.target.closest(".card")) {
        e.target.closest(".card").classList.add("selected");
      }
    });

    filesContainer.addEventListener("dragend", (e) => {
      if (e.target.closest(".card")) {
        e.target.closest(".card").classList.remove("selected");
      }
    });

    filesContainer.addEventListener("drop", (e) => {
      e.preventDefault();

      // Убираю класс у активного элемента
      const activeElement = document.querySelector(`.selected`);
      if (activeElement) {
        activeElement.classList.remove("selected");
      }

      // Обновляю массив
      const cards = Array.from(filesContainer.querySelectorAll(".card"));
      console.log("cards", cards);
      formData = cards.map((card) => {
        const id = parseInt(card.dataset.id);
        return formData.find((file) => file.id === id);
      });
    });

    filesContainer.addEventListener("dragover", (e) => {
      e.preventDefault();

      // Какой элемент сейчас перетаскивается
      const activeElement = document.querySelector(`.selected`);
      // Какой элемент под курсором пока я тащу activeElement. Элемент, на который указывает событие dragover (потому что e.target).
      const currentElement = e.target.closest(".card");

      // Проверяю не являются ли activeElement и currentElement одним и тем же элементом. Чтобы избежать попытки
      // перемещения элемента самого на себя.
      // Еще проверяю является ли выбранный элемент элементом списка
      const isMoveable =
        activeElement !== currentElement &&
        currentElement && // Проверка на null. Если не сделаю, то когда над пустой областью перетаскиваю карточку - будет ошибка
        currentElement.classList.contains("card");

      // Если условие не выполняется, прерываю выполнение функции, отменив все дальнейшие действия
      if (!isMoveable) {
        return;
      }

      // Для правильного позиционирования при перетаскивании
      const nextElement =
        currentElement === activeElement.nextElementSibling
          ? currentElement.nextElementSibling
          : currentElement;

      filesContainer.insertBefore(activeElement, nextElement);
    });

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

    input.addEventListener("change", (event) => onChange(event));

    form.append(label, input, inputLabel, filesContainer, button);
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

    card.draggable = true;
    card.dataset.id = fileData.id;
    imgPreview.src = fileData.img;
    imgPreview.draggable = false;
    button.textContent = "Remove";
    imgName.textContent = fileData.name;
    imgFormat.textContent = fileData.format;
    imgSize.textContent = fileData.size;

    button.addEventListener("click", () => handleFileDelete(fileData));

    picture.append(imgPreview);
    card.append(button, picture, imgName, imgFormat, imgSize);

    return card;
  }

  function createFileObject(file) {
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
  }

  function warningCreator(text) {
    const warningItem = document.createElement("li");
    warningItem.classList.add("warning");
    warningItem.textContent = text;
    errorsList.append(warningItem);
  }

  function limitErrorCreator() {
    const errorItem = document.createElement("li");
    errorItem.classList.add("error");
    errorItem.id = "limit";
    errorItem.textContent = "Превышено допустимое количество файлов: 5";
    errorsList.append(errorItem);
  }

  function onChange(event) {
    const files = event.target.files;
    errorsList.innerHTML = "";
    let filesArray = Array.from(files);

    filesArray = filesArray.filter((item) => {
      console.log("item", item);
      if (formatValidation(item)) {
        warningCreator(`Неверный формат '${item.name}' файла`);
        return false;
      }

      if (item.size >= BYTE_IN_MB) {
        warningCreator(`Привышен максимальный размер '${item.name}' файла`);
        return false;
      }

      const isFileAdded = formData.some(
        (elem) => elem.id === item.lastModified
      );
      console.log("isFileAdded", isFileAdded);
      if (isFileAdded) {
        warningCreator(`Файл '${item.name}' уже добавлен`);
        return false;
      }

      return true;
    });

    if (filesArray.length === 0) {
      return;
    }

    if (formData.length >= 5 || filesArray.length + formData.length > 5) {
      limitErrorCreator();
    }

    const validFilesCount = Math.min(filesArray.length, 5 - formData.length);
    for (let i = 0; i < validFilesCount; i++) {
      createFileObject(filesArray[i]);
    }
  }

  function formatValidation(item) {
    return (
      findFormat(item.name) !== "PNG" &&
      findFormat(item.name) !== "jpeg" &&
      findFormat(item.name) !== "jpg"
    );
  }

  function findFormat(str) {
    let result = str.split(".");
    return result[result.length - 1];
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
