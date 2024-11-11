import { sections } from "../Components/Main/Main";
import { API_URL } from "../Constants/Constants";
import { validateResponse } from "./validationResponse";

const validateSectionsData = (data: any): sections => {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid data format");
  }

  const validateSection = (section: any, requiredItems: string[]) => {
    if (!section || typeof section !== "object") {
      throw new Error("Section data is missing or malformed");
    }

    requiredItems.forEach((item) => {
      if (!(item in section)) {
        throw new Error(`Missing required item: ${item}`);
      }
    });

    return section;
  };

  const validateItem = (item: any, id: string) => {
    if (!item.title || typeof item.title !== "string") {
      throw new Error("Item title is invalid");
    }
    if (!item.text || typeof item.text !== "string") {
      throw new Error("Item text is invalid");
    }
    if (!item.accent || typeof item.accent !== "string") {
      throw new Error("Item accent is invalid");
    }
    if (!item.date || typeof item.date !== "string") {
      throw new Error("Item date is invalid");
    }
    if (!item.duration || typeof item.duration !== "number") {
      throw new Error("Item duration is invalid");
    }
    if (
      (!item["browse-text"] && id === "main") ||
      (typeof item["browse-text"] !== "string" && id === "main")
    ) {
      throw new Error("Item browse-text is invalid");
    }
    if (
      !item.size ||
      !["full-size", "compact", "full-image"].includes(item.size)
    ) {
      throw new Error("Item size is invalid");
    }
    if (
      !Array.isArray(item.tags) ||
      item.tags.some((tag: string) => typeof tag !== "string")
    ) {
      throw new Error("Item tags are invalid");
    }
    if (
      !item.img ||
      typeof item.img.url !== "string" ||
      ![
        "arch",
        "semi-squared-rounded",
        "semi-squared-cloud",
        "cloud",
        "corner-squared-cloud",
        "corner-squared-rounded",
      ].includes(item.img.shape)
    ) {
      throw new Error("Item img is invalid");
    }
    if (
      !item.stamp ||
      !["circle", "star", "cookie", "signboard", "donut"].includes(
        item.stamp.type
      ) ||
      !["top-left", "top-right"].includes(item.stamp.position)
    ) {
      throw new Error("Item stamp is invalid");
    }
  };

  const main = validateSection(data.main, ["items", "ticker"]);
  main.items.forEach((item: any) => validateItem(item, "main"));

  const content = validateSection(data.content, ["items", "ticker"]);
  content.items.forEach((item: any) => validateItem(item, "content"));

  if (data.proposals) {
    if (!data.proposals.title || typeof data.proposals.title !== "string") {
      throw new Error("Proposals title is invalid");
    }
    if (
      !data.proposals["browse-all-text"] ||
      typeof data.proposals["browse-all-text"] !== "string"
    ) {
      throw new Error("Proposals browse-all-text is invalid");
    }
    if (!Array.isArray(data.proposals.items)) {
      throw new Error("Proposals items are invalid");
    }

    data.proposals.items.forEach((item: any) => {
      if (!item.background || typeof item.background !== "string") {
        throw new Error("Proposal background is invalid");
      }
      if (
        !item.author ||
        typeof item.author !== "object" ||
        !item.author.name ||
        !item.author.position
      ) {
        throw new Error("Proposal author is invalid");
      }
      if (!item.text || typeof item.text !== "string") {
        throw new Error("Proposal text is invalid");
      }
      if (
        !Array.isArray(item.tags) ||
        item.tags.some((tag: string) => typeof tag !== "string")
      ) {
        throw new Error("Proposal tags are invalid");
      }
      if (!item.date_from || typeof item.date_from !== "string") {
        throw new Error("Proposal date_from is invalid");
      }
      if (!item.date_to || typeof item.date_to !== "string") {
        throw new Error("Proposal date_to is invalid");
      }
      if (!item.time || typeof item.time !== "string") {
        throw new Error("Proposal time is invalid");
      }
    });

    validateSection(data.proposals, ["ticker"]);
  }

  const subscription = validateSection(data.subscription, [
    "title",
    "text",
    "email-placeholder",
    "submit-text",
    "agreement-text",
    "ticker",
  ]);
  if (!subscription.title || typeof subscription.title !== "string") {
    throw new Error("Subscription title is invalid");
  }
  if (!subscription.text || typeof subscription.text !== "string") {
    throw new Error("Subscription text is invalid");
  }
  if (
    !subscription["email-placeholder"] ||
    typeof subscription["email-placeholder"] !== "string"
  ) {
    throw new Error("Subscription email-placeholder is invalid");
  }
  if (
    !subscription["submit-text"] ||
    typeof subscription["submit-text"] !== "string"
  ) {
    throw new Error("Subscription submit-text is invalid");
  }
  if (
    !subscription["agreement-text"] ||
    typeof subscription["agreement-text"] !== "string"
  ) {
    throw new Error("Subscription agreement-text is invalid");
  }

  return data;
};

export const GetSections = async () => {
  return fetch(`${API_URL}/sections`)
    .then(validateResponse)
    .then((res) => res.json())
    .then(validateSectionsData)
    .catch((err) => {
      console.log("GetSections function error: ", err);
      throw err;
    });
};
