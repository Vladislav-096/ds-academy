import { useEffect, useState } from "react";
import { GetSections } from "../../api/GetSections";
import { GetMenu } from "../../api/GetMenu";
import { HeroSection } from "../HeroSection/HeroSection";
import { PopularSection } from "../PopularSection/PopularSection";
import { WebinarsSection } from "../WebinarsSection/WebinarsSection";

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

export interface sectionsMain {
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

export interface sectionsConten {
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

export interface sectionsProposals {
  title: string;
  "browse-all-text": string;
  items: sectionsProposalsItems[];
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

export const Main = () => {
  const [sections, setSections] = useState<sections>();

  useEffect(() => {
    GetMenu();
    getSections();
  }, []);

  const getSections = async () => {
    try {
      let result = await GetSections();
      setSections(result);
    } catch (error) {
      console.error("Error fetching sections data:", error);
      throw error;
    }
  };

  return (
    <main className="main">
      <picture className="line-bg-picture line-bg-first-picture">
        <source
          media="(max-width: 577px)"
          srcSet="./src/assets/line-bg-1.2.svg"
        />
        <img
          className="line-bg-image"
          src="./src/assets/line-bg-1.svg"
          alt=""
        />
      </picture>
      <picture className="line-bg-picture line-bg-second-picture">
        <source
          media="(max-width: 992px)"
          srcSet="./src/assets/line-bg-2.1.svg"
        />
        <img
          className="line-bg-image"
          src="./src/assets/line-bg-2.svg"
          alt=""
        />
      </picture>
      <HeroSection hero={sections?.main} />
      <PopularSection popular={sections?.content} />
      <WebinarsSection webinars={sections?.proposals} />
    </main>
  );
};
