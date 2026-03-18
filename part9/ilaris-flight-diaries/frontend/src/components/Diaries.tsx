import type { DiaryProps } from "../types";
import Diary from "./Diary";

const Diaries = (props: DiaryProps) => {
  return (
    <div>
      <h2>Diary Entries</h2>
      {props.diaries.map((diary) => (
        <Diary key={diary.id + "_id"} {...diary} />
      ))}
    </div>
  );
};

export default Diaries;
