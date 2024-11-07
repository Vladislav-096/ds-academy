import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { GetMenu } from "../../api/GetMenu";

// menu
export interface menuHeader {
  label: string;
  url: string;
}

interface menuFooterItems {
  label: string;
  url: string;
}

interface menuFooter {
  label: string;
  items: menuFooterItems[];
}

interface menu {
  logo: string;
  header: menuHeader[];
  footer: menuFooter[];
}

export const Layout = () => {
  const [menu, setMenu] = useState<menu>();

  const getMenu = async () => {
    try {
      let result = await GetMenu();
      setMenu(result);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  return (
    <div className="layout">
      <Header logo={menu?.logo || ""} header={menu?.header || []} />
      <Main />
      <Footer />
    </div>
  );
};

