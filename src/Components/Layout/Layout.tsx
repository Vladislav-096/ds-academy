import { BrowserRouter } from "react-router-dom";
import { Main } from "../Main/Main";
import { Header } from "../Header/Header";

export const Layout = () => {
  return (
    <BrowserRouter>
      <div className="page">
        <Header />
        <Main />
      </div>
    </BrowserRouter>
  );
};
