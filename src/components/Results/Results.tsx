import { useContext, useEffect, useState } from "react";
import { Result, ResultContext } from "../../context/ResultsContext";
import styles from "./result.module.scss";

export const Results = () => {
  const { games } = useContext<ResultContext>(ResultContext);
  const [tableData, setTableData] = useState<Result[]>(games);
  const [sortDirection, setSortDirection] = useState<string>("");
  const [sortType, setSortType] = useState<string>("");

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const sortData = () => {
    let sortedData = [...tableData];

    switch (sortType) {
      case "date":
        sortedData.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        });
        break;

      case "difficulty":
        sortedData.sort((a, b) => {
          const difficultyOrder = ["easy", "medium", "hard"];
          return sortDirection === "asc"
            ? difficultyOrder.indexOf(a.difficulty) -
                difficultyOrder.indexOf(b.difficulty)
            : difficultyOrder.indexOf(b.difficulty) -
                difficultyOrder.indexOf(a.difficulty);
        });
        break;

      case "score":
        sortedData.sort((a, b) => {
          return sortDirection === "asc"
            ? a.score - b.score
            : b.score - a.score;
        });
        break;

      case "result":
        sortedData.sort((a, b) => {
          return sortDirection === "asc"
            ? (a.result ? 1 : 0) - (b.result ? 1 : 0)
            : (b.result ? 1 : 0) - (a.result ? 1 : 0);
        });
        break;

      case "description":
        sortedData.sort((a, b) => {
          return sortDirection === "asc"
            ? a.reason.localeCompare(b.reason)
            : b.reason.localeCompare(a.reason);
        });
        break;

      case "duration":
        sortedData.sort((a, b) => {
          return sortDirection === "asc"
            ? a.duration - b.duration
            : b.duration - a.duration;
        });
        break;

      case "mistakes":
        sortedData.sort((a, b) => {
          return sortDirection === "asc"
            ? a.mistakesCount - b.mistakesCount
            : b.mistakesCount - a.mistakesCount;
        });
        break;

      default:
        break;
    }

    setTableData(sortedData);
  };

  const formatDateToString = (date: Date) => {
    const newDate = new Date(date);

    const day = String(newDate.getDate()).padStart(2, "0");
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const year = newDate.getFullYear();
    const hours = String(newDate.getHours()).padStart(2, "0");
    const minutes = String(newDate.getMinutes()).padStart(2, "0");

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

  useEffect(() => {
    if (games) {
      setTableData(games);
    }
  }, [games]);

  useEffect(() => {
    sortData();
  }, [sortDirection]);

  return (
    <div className={styles.result}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("date");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "date"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Date
            </th>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("difficulty");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "difficulty"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Difficulty
            </th>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("score");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "score"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Score
            </th>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("result");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "result"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Result
            </th>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("description");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "description"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Description
            </th>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("duration");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "duration"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Duration
            </th>
            <th
              onClick={() => {
                toggleSortDirection();
                setSortType("mistakes");
              }}
              className={`${styles.head} ${
                sortDirection === "asc" && sortType === "mistakes"
                  ? ""
                  : styles["row-up"]
              }`}
            >
              Amount of Mistakes
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td className={styles.data}>{formatDateToString(item.date)}</td>
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
