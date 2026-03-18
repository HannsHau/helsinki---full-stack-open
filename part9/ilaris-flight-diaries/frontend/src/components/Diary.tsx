import type { DiaryEntry } from "../types";

const Diary = (props: DiaryEntry) => {
  return (
    <>
      <h3>{props.date}</h3>
      <li key={props.id + "_visi"}>visibility: {props.visibility}</li>
      <li key={props.id + "_weather"}>weather: {props.weather}</li>
      <br></br>
    </>
  );
};

export default Diary