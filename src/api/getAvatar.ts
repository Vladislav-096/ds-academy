import { API_URL } from "../constants/constants";
import { validateResponse } from "./validationResponse";

export interface getAvatar {
  seed: string;
}

export const GetAvatar = async ({ seed }: getAvatar) => {
  return fetch(`${API_URL}?seed=${seed}&radius=11&size=111`)
    .then(validateResponse)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob))
    .catch((err) => {
      console.log("getAvatar function error: ", err);
      throw err;
    });
};

