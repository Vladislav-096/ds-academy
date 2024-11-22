import styles from "./result.module.scss";

interface Result {
  finalScore: number;
  active: boolean;
}

export const Result = ({ finalScore, active }: Result) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`${styles.content} ${active ? styles.active : ""}`}
    >
      <h2>Score</h2>
      <p>{finalScore}</p>
    </div>
  );
};
