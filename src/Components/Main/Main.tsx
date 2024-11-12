import { useEffect, useState } from "react";
import { GetSections } from "../../api/GetSections";
import { HeroSection } from "../HeroSection/HeroSection";
import { PopularSection } from "../PopularSection/PopularSection";
import { WebinarsSection } from "../WebinarsSection/WebinarsSection";
import { SubscriptionSection } from "../SubscriptionSection/SubscriptionSection";
import "./Main.scss";

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

export interface sectionsProposalsItemsAuthor {
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

export interface sectionsSubscription {
  title: string;
  text: string;
  "email-placeholder": string;
  "submit-text": string;
  "agreement-text": string;
  ticker: sectionTicker;
}

export interface sections {
  main: sectionsMain;
  content: sectionsConten;
  proposals: sectionsProposals;
  subscription: sectionsSubscription;
  ticker: sectionTicker;
}

export const Main = () => {
  const [sections, setSections] = useState<sections>();

  useEffect(() => {
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
      <div className="subscription-marquee">
        <div
          style={{ backgroundColor: sections?.proposals.ticker.color }}
          className="marquee"
        >
          <div className="marquee__content">
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
            <ul className="list-reset marquee__list">
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
              <li>
                <h2 className="marquee__list-text">
                  {sections?.proposals.ticker.text}
                </h2>
              </li>
              <li className="marquee__list-separator">
                <img
                  src="./src/assets/star-black.svg"
                  alt="Star Sign Separator"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
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
      <SubscriptionSection subscription={sections?.subscription} />
    </main>
  );
};
