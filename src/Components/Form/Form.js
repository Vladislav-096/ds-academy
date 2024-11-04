import { postData } from "../../api/PostData.js";
import { validations } from "../Validations/Validations.js";
import {
  formatFileName,
  formatFileFormat,
  formatFileSize,
} from "../Formats/Formats.js";

export let formData = [];
export const errorsList = document.createElement("ul");

export function createFileUploader(app) {
  function render() {
    app.innerHTML = "";
    const form = createForm();
    app.append(form);

    const filesContainer = form.querySelector(".files-container");
    form.insertBefore(errorsList, filesContainer);
    errorsList.classList.add("error-warning-list");

    formData.forEach((fileData) => {
      const card = createCard(fileData.id);
      const fileCard = createFileCard(fileData);
      card.append(fileCard);
      filesContainer.append(card);
    });
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

  function createCard(id) {
    const card = document.createElement("li");
    card.classList.add("card");
    card.draggable = true;
    card.dataset.id = id;

    return card;
  }

  function createFileCard(fileData) {
    const cardWrapper = document.createElement("div");
    const button = document.createElement("button");
    const picture = document.createElement("picture");
    const imgPreview = document.createElement("img");
    const descrBlock = document.createElement("div");
    const imgName = document.createElement("h2");
    const imgFormat = document.createElement("p");
    const imgSize = document.createElement("p");

    cardWrapper.classList.add("card-data");
    button.classList.add("btn-reset", "btn-remove");
    picture.classList.add("picture");
    descrBlock.classList.add("descr-block");
    imgPreview.classList.add("img-preview");
    imgName.classList.add("img-name");
    imgFormat.classList.add("img-format");
    imgSize.classList.add("img-size");

    imgPreview.src = fileData.img;
    imgPreview.draggable = false;
    imgName.textContent = fileData.name;
    imgFormat.textContent = fileData.format;
    imgSize.textContent = `${fileData.size} MB`;

    button.addEventListener("click", () => handleFileDelete(fileData));

    picture.append(imgPreview);
    descrBlock.append(imgName, imgFormat, imgSize);
    cardWrapper.append(button, picture, descrBlock);

    return cardWrapper;
  }

  async function createFileObject(file) {
    const reader = new FileReader();

    const card = createCard(file.lastModified);
    const loadingCard = createLoadingCard();
    const filesContainer = document.querySelector(".files-container");

    card.append(loadingCard);
    filesContainer.append(card);

    await new Promise((resolve) => setTimeout(() => resolve(), 1000));

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
      const fileCard = createFileCard(formDataObj);
      loadingCard.remove();
      card.append(fileCard);
    };
    reader.readAsDataURL(file);
  }

  function createLoadingCard() {
    const loaderWrapper = document.createElement("div");

    loaderWrapper.classList.add("loader-wrapper");
    for (let i = 0; i < 12; i++) {
      const loaderElement = document.createElement("div");
      loaderElement.classList.add("line");
      loaderWrapper.append(loaderElement);
    }

    return loaderWrapper;
  }

  function onChange(event) {
    const files = event.target.files;
    errorsList.innerHTML = "";
    let filesArray = Array.from(files);
    const validatedFilesArray = validations(filesArray);

    const validFilesCount = Math.min(
      validatedFilesArray.length,
      5 - formData.length
    );
    for (let i = 0; i < validFilesCount; i++) {
      createFileObject(validatedFilesArray[i]);
    }

    event.target.value = "";
  }
}
