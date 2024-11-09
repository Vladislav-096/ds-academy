import { API_URL } from "../Constants/Constants";

export const GetContacts = async () => {
  return fetch(`${API_URL}/contacts`)
    .then((res) => res.json())
    .catch((err) => {
      console.log("GetContacts function error: ", err);
      throw err;
    });
};
