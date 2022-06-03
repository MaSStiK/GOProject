import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const inputTitle = useRef(null)
  const inputInfo = useRef(null)

  let isEdit = false;

  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes', {
        withCredentials: false
      }).then(r => {
        console.log(r.data);
        let dataSorted = [];
        r.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
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

  const deleteNote = (note_id) => {
    console.log("Delete: " + note_id)
    axios.delete(
      'http://localhost:9090/api/note/' + note_id, {
        withCredentials: false
      }
    ).then(() => {
      setIsUpdate(!isUpdate)
      setIsDelete(!isDelete)
    })
  }

  const editNote = (note_id) => {
    console.log("Edit: " + note_id)
    axios.put(
      'http://localhost:9090/api/note/edit', {
        id: note_id,
        created_at: "2022-04-16T00:00:00",
        title: inputTitle.current.value,
        info: inputInfo.current.value
      }, {
        withCredentials: false
      }
    ).then(() => {
      setIsUpdate(!isUpdate)
    })
  }

  return (
    <div className="App">

      <div className="bg"></div>

      <div className="content">
        {!!notes && notes.map((note, index) => (
          <div className="note_full" id={"note_" + note.id} key={'note_' + index}>
            <div className="note" key={'note_' + index}>
              <div className="title" key={'note_' + index}>{note.title}</div>
              <div className="text" key={'noteText_' + index}>{note.info}</div>
            </div>
            <div className="buttons">
              <img className="del_img" src="https://avatanplus.com/files/resources/original/5968a2c8f2ed115d40bbe123.png" alt="" onClick={() => deleteNote(note.id)}></img>
              <img className="edit_img" src="http://simpleicon.com/wp-content/uploads/pencil.png" alt="" onClick={() => editNote(note.id)}></img>
            </div>
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
