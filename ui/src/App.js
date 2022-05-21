import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

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

  const deleteNote = (id) => {
    axios.delete(
      'http://localhost:9090/api/note/' + id, {
        withCredentials: false
      }
    ).then(() => {
      setIsUpdate(!isDelete)
    })
  }

  return (
    <div className="App">

      <div class="content">
        {!!notes && notes.map((note, index) => (
          <div className="note">
            <div className="title" key={'note_' + index}>{note.title}</div>
            <div className="text" key={'noteText_' + index}>{note.info}</div>
            <button className="del" onClick={() => deleteNote(note.id)}>Удалить</button>
          </div>   
        ))}
      </div>

      <div className="footer">
        <div className="setTitle">
          <div>Заголовок</div>
          <input ref={inputTitle} type="text"/>
        </div>
        
        <div className="set_text">
          <div>Описание</div>
          <input ref={inputInfo} type="text"/>
        </div>
        
        <div className="add_button_block">
          <button className="add_button" onClick={() => addNote()}>Добавить</button>
        </div>
      </div>

    </div>
  );
}

export default App;
