import { BYTE_IN_MB } from "../../Constants/Constants.js";
import { errorsList, formData } from "../../Components/Form/Form.js";

export function validations(filesArray) {
  filesArray = filesArray.filter((item) => {
    if (formatValidation(item)) {
      warningCreator(`Неверный формат '${item.name}' файла`);
      return false;
    }

    if (item.size >= BYTE_IN_MB) {
      warningCreator(`Привышен максимальный размер '${item.name}' файла`);
      return false;
    }

    const isFileAdded = formData.some((elem) => elem.id === item.lastModified);
    if (isFileAdded) {
      warningCreator(`Файл '${item.name}' уже добавлен`);
      return false;
    }

    return true;
  });

  if (filesArray.length === 0) {
    return [];
  }

  if (formData.length >= 5 || filesArray.length + formData.length > 5) {
    limitErrorCreator();
  }

  return filesArray;
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
