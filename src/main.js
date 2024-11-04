import { createFileUploader } from "./Components/Form/Form.js";

const init = () => {
  const app = document.getElementById("app");

  createFileUploader(app);
};

init();
