import { validateResponse } from "./validationResponse";

interface formData {
  mail: string;
}

export const postData = async (data: formData) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then(validateResponse)
    .then(() => undefined)
    .catch((error) => {
      console.log("postData error: ", error);
      throw error;
    });
};
