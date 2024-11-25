import { useContext } from "react";
import { ResultContext } from "../../context/ResultsContext";
import styles from "./result.module.scss";

export const Results = () => {
  const { games } = useContext<ResultContext>(ResultContext);

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let result = "";
    if (hours > 0) result += `${hours} h, `;
    if (minutes > 0 || hours > 0) result += `${minutes} min, `;
    result += `${remainingSeconds} sec`;

    return result;
  }

  const showResult = (value: boolean) => {
    if (value) {
      return "Win";
    }

    return "Loss";
  };

  return (
    <div className={styles.result}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.head}>Date</th>
            <th className={styles.head}>Difficulty</th>
            <th className={styles.head}>Score</th>
            <th className={styles.head}>Result</th>
            <th className={styles.head}>Description</th>
            <th className={styles.head}>Duration</th>
            <th className={styles.head}>Amount of Mistakes</th>
          </tr>
        </thead>
        <tbody>
          {games.map((item, index) => (
            <tr key={index}>
              <td className={styles.data}>{formatDate(item.date)}</td>
              <td className={styles.data}>{item.difficulty}</td>
              <td className={styles.data}>{item.score}</td>
              <td className={styles.data}>{showResult(item.result)}</td>
              <td className={styles.data}>{item.reason}</td>
              <td className={styles.data}>{formatDuration(item.duration)}</td>
              <td className={styles.data}>{item.mistakesCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
