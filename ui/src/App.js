import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputTitle = useRef(null)
  const inputInfo = useRef(null)

  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes', {
        withCredentials: false
      }).then(r => {
        console.log(r.data);
        setNotes(r.data);
      });
  }, [isUpdate]);

  const addNote = () => {
    axios.post(
      'http://localhost:9090/api/note/add', {
        title: inputTitle.current.value,
        info: inputInfo.current.value,
      }, {
        withCredentials: false
      }
    ).then(() => {
      setIsUpdate(!isUpdate)
    })
  }

  return (
    <div className="App">

    <label>Заголовок</label>
    <input ref={inputTitle} type="text"/>
    <label>Описание</label>
    <input ref={inputInfo} type="text"/>
    <button onClick={() => addNote()}>Добавить</button>

    {!!notes && notes.map((note, index) => (
      <div key={'note_' + index}>{note.title}</div>
    ))}

    </div>
  );
}

export default App;
