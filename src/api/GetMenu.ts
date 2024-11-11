import { menu } from "../Components/Layout/Layout";
import { API_URL } from "../Constants/Constants";
import { validateResponse } from "./validationResponse";

export const validateMenuData = (data: any): menu => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Menu data should be an object");
  }

  if (typeof data.logo !== "string" || !data.logo.trim()) {
    throw new Error("Logo must be a non-empty string");
  }

  if (
    !Array.isArray(data.header) ||
    data.header.some((item: any) => {
      return (
        typeof item.label !== "string" ||
        !item.label.trim() ||
        typeof item.url !== "string" ||
        !item.url.trim()
      );
    })
  ) {
    throw new Error(
      'Header must be an array of objects with "label" and "url" properties'
    );
  }

  if (
    !Array.isArray(data.footer) ||
    data.footer.some((footerItem: any) => {
      return (
        typeof footerItem.label !== "string" ||
        !footerItem.label.trim() ||
        !Array.isArray(footerItem.items) ||
        footerItem.items.some((item: any) => {
          return (
            typeof item.label !== "string" ||
            !item.label.trim() ||
            typeof item.url !== "string" ||
            !item.url.trim()
          );
        })
      );
    })
  ) {
    throw new Error(
      'Footer must be an array of objects with "label" and "items" array (containing objects with "label" and "url")'
    );
  }

  return data as menu;
};

export const GetMenu = async () => {
  return fetch(`${API_URL}/menu`)
    .then(validateResponse)
    .then((res) => res.json())
    .then(validateMenuData)
    .catch((err) => {
      console.log("GetMenu function error: ", err);
      throw err;
    });
};
