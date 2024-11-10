import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { GetMenu } from "../../api/GetMenu";
import { GetContacts } from "../../api/GetContacts";

// menu
export interface menuHeader {
  label: string;
  url: string;
}

interface menuFooterItems {
  label: string;
  url: string;
}

export interface menuFooter {
  label: string;
  items: menuFooterItems[];
}

export interface menu {
  logo: string;
  header: menuHeader[];
  footer: menuFooter[];
}

interface contactsLinks {
  label: string;
  url: string;
}

interface contactsSubmitText {
  "email-placeholder": string;
  "submit-text": string;
}

export interface contacts {
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
  links: contactsLinks[];
  subscription: contactsSubmitText;
}

export const Layout = () => {
  const [menu, setMenu] = useState<menu>();
  const [contacts, setContacts] = useState<contacts>();

  const getMenu = async () => {
    try {
      let result = await GetMenu();
      setMenu(result);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  };

  const getContacts = async () => {
    try {
      let result = await GetContacts();
      setContacts(result);
    } catch (error) {
      console.error("Error fetching contacts data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMenu();
    getContacts();
  }, []);

  return (
    <div className="layout">
      <Header logo={menu?.logo || ""} header={menu?.header || []} />
      <Main />
      <Footer contacts={contacts} footer={menu?.footer || []} />
    </div>
  );
};
