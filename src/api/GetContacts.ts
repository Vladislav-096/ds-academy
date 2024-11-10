import { contacts } from "../Components/Layout/Layout";
import { API_URL } from "../Constants/Constants";

export const validateContactsData = (data: any): contacts => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Contacts data should be an object");
  }

  const requiredFields = [
    "whatsapp",
    "phone",
    "email",
    "instagram",
    "facebook",
    "youtube",
    "linkedin",
  ];
  requiredFields.forEach((field) => {
    if (typeof data[field] !== "string" || !data[field].trim()) {
      throw new Error(`${field} must be a non-empty string`);
    }
  });

  if (
    !Array.isArray(data.links) ||
    data.links.some((item: any) => {
      return (
        typeof item.label !== "string" ||
        !item.label.trim() ||
        typeof item.url !== "string" ||
        !item.url.trim()
      );
    })
  ) {
    throw new Error(
      'Links must be an array of objects with "label" and "url" properties'
    );
  }

  if (typeof data.subscription !== "object" || data.subscription === null) {
    throw new Error("Subscription must be an object");
  }
  if (
    typeof data.subscription["email-placeholder"] !== "string" ||
    !data.subscription["email-placeholder"].trim()
  ) {
    throw new Error('"email-placeholder" must be a non-empty string');
  }
  if (
    typeof data.subscription["submit-text"] !== "string" ||
    !data.subscription["submit-text"].trim()
  ) {
    throw new Error('"submit-text" must be a non-empty string');
  }

  return data as contacts;
};

export const GetContacts = async () => {
  return fetch(`${API_URL}/contacts`)
    .then((res) => res.json())
    .then(validateContactsData)
    .catch((err) => {
      console.log("GetContacts function error: ", err);
      throw err;
    });
};
