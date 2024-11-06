import { Header } from "../Header/Header";
import { Main } from "../Main/Main";
import { Footer } from "../Footer/Footer";
import { useEffect, useState } from "react";
import { GetMenu } from "../../api/GetMenu";
import { GetSections } from "../../api/GetSections";

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

// sections
interface sectionItemsImg {
  url: string;
  shape: string;
}

interface sectionItemsStamp {
  word: string;
  type: string;
  position: string;
}

interface sectionMainItems extends sectionsContenItems {
  "browse-text": string;
}

interface sectionTicker {
  text: string;
  color: string;
}

interface sectionsMain {
  items: sectionMainItems[];
  ticker: sectionTicker;
}

interface sectionsContenItems {
  title: string;
  text: string;
  accent: string;
  date: string;
  duration: number;
  size: string;
  tags: string[];
  img: sectionItemsImg;
  stamp: sectionItemsStamp;
}

interface sectionsConten {
  items: sectionsContenItems[];
  ticker: sectionTicker;
}

interface sectionsProposalsItemsAuthor {
  img: string;
  name: string;
  position: string;
}

interface sectionsProposalsItems {
  background: string;
  author: sectionsProposalsItemsAuthor;
  text: string;
  tags: string[];
  date_from: string;
  date_to: string;
  time: string;
}

interface sectionsProposals {
  title: string;
  "browse-all-text": string;
  items: sectionsProposalsItems;
  ticker: sectionTicker;
}

interface sectionsSubscription {
  title: string;
  text: string;
  "email-placeholder": string;
  "submit-text": string;
  "agreement-text": string;
  ticker: sectionTicker;
}

interface sections {
  main: sectionsMain;
  content: sectionsConten;
  proposals: sectionsProposals;
  subscription: sectionsSubscription;
  ticker: sectionTicker;
}

export const Layout = () => {
  const [menu, setMenu] = useState<menu>();
  const [sections, setSections] = useState<sections>();

  const getMenu = async () => {
    try {
      let result = await GetMenu();
      setMenu(result);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  };

  const getSections = async () => {
    try {
      let result = await GetSections();
      setSections(result);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  };

  useEffect(() => {
    getMenu();
    getSections();
  }, []);

  return (
    <div className="layout">
      <Header logo={menu?.logo || ""} header={menu?.header || []} />
      <Main />
      <Footer />
    </div>
  );
};
