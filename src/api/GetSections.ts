import { API_URL } from "../Constants/Constants";

export const GetSections = async () => {
  return fetch(`${API_URL}/sections`)
    .then((res) => res.json())
    .catch((err) => {
      console.log("GetSections function error: ", err);
      throw err;
    });
};
