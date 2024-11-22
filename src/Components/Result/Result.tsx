import styles from "./result.module.scss";

interface Result {
  finalScore: number;
  active: boolean;
  isTimeOver: boolean;
}

export const Result = ({ finalScore, active, isTimeOver }: Result) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${styles.content} ${active ? styles.active : ""}`}
    >
      {isTimeOver ? (
        <h2>Time is over</h2>
      ) : (
        <div>
          <h2>Score</h2>
          <p>{finalScore}</p>
        </div>
      )}
    </div>
  );
};
