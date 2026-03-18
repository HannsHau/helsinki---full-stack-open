import { useEffect, useState } from "react";

import type { Diary, DiaryProps } from "./types";
import { getAllDiaries } from "./diaryService";

const Diary = (props: Diary) => {
  return (
    <>
      <h2>{props.date}</h2>
      <li key={props.id + "_visi"}>visibility: {props.visibility}</li>
      <li key={props.id + "_weather"}>weather: {props.weather}</li>
      <br></br>
    </>
  );
};

const Diaries = (props: DiaryProps) => {
  return props.diaries.map((diary) => (
    <Diary key={diary.id + "_id"} {...diary} />
  ));
};

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <>
      <h1>Diary Entries</h1>
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
