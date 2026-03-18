import { useEffect, useState, type SyntheticEvent } from "react";

import type { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaries, createDiary } from "./diaryService";

import Diaries from "./components/Diaries";

const AddDiary = (props : {updateDiaries: (arg0: DiaryEntry) => void}) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const submit = (event: SyntheticEvent) => {
    event.preventDefault();

    const diary: NewDiaryEntry = {
      date, visibility, weather, comment
    }

    createDiary(diary)
      .then(data => {
        props.updateDiaries(data)
    })

    setDate('');
    setVisibility('');
    setWeather('');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={submit}>
        <div>
          date
          <input
            value={date}
            onChange={({ target }) => setDate(target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={visibility}
            onChange={({ target }) => setVisibility(target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={weather}
            onChange={({ target }) => setWeather(target.value)}
          />
        </div>
        <div>
          comment{" "}
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const updateDiaries = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary))
  }

  return (
    <>
      <AddDiary updateDiaries={updateDiaries}/>
      <Diaries diaries={diaries} />
    </>
  );
}

export default App;
