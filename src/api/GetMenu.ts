import { API_URL } from "../Constants/Constants";

export const GetMenu = async () => {
  return fetch(`${API_URL}/menu`)
    .then((res) => res.json())
    .catch((err) => {
      console.log("GetMenu function error: ", err);
      throw err;
    });
};
