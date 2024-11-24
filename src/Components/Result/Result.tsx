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
      <h2 className={styles.heading}>Your result</h2>
      <p className={styles.result}>{finalScore}</p>
      {isTimeOver && <p className={styles.loss}>Time is over</p>}
    </div>
  );
};
