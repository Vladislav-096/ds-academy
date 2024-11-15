import React from "react";

interface RunningLine {
  amountOfwords: number;
  backgroundColor: string;
  text: string;
  elementClass: string;
  separatorColor?: string;
}

export const RunningLine = ({
  amountOfwords,
  backgroundColor,
  text,
  elementClass,
  separatorColor,
}: RunningLine) => {
  function textBlock() {
    let blockOftext = [];

    for (let i = 0; i < amountOfwords; i++) {
      blockOftext.push(
        <React.Fragment key={i}>
          <div>
            <h2 className="marquee__list-text">{text}</h2>
          </div>
          <div className="marquee__list-separator">
            <img
              src={
                separatorColor
                  ? "./src/assets/star-white.svg"
                  : "./src/assets/star-black.svg"
              }
              alt="Star Sign Separator"
            />
          </div>
        </React.Fragment>
      );
    }

    return blockOftext;
  }

  function textLists() {
    let listOfText = [];

    for (let i = 0; i < 3; i++) {
      listOfText.push(
        <div key={i} className="marquee__list">
          {textBlock()}
        </div>
      );
    }

    return listOfText;
  }

  return (
    <div className={elementClass}>
      <div style={{ backgroundColor: backgroundColor }} className="marquee">
        <div className="marquee__content">{textLists()}</div>
      </div>
    </div>
  );
};
