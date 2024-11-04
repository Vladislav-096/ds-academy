import { BYTE_IN_MB } from "../../Constants/Constants.js";

export function formatFileName(str) {
  let result = str.split(".");
  result.splice(result.length - 1, 1);
  return result.join(".");
}

export function formatFileFormat(str) {
  let result = str.split(".");
  result.splice(0, result.length - 1);
  return result.join("");
}

export function formatFileSize(num) {
  let result = Number(num) / BYTE_IN_MB;
  return result.toFixed(1);
}
