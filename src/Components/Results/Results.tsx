import { useContext } from "react";
import { ResultContext } from "../../context/ResultsContext";

export const Results = () => {
  const { games } = useContext<ResultContext>(ResultContext);
  console.log(games);

  return <table></table>;
};
