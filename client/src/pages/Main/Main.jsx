import { useEffect, useState } from "react";
import { createNote, getNotes } from "../../services/API/apiService";
import NoteCard from "../../components/NoteCard/NoteCard";
import styles from './Main.module.css';

const Main = () => {
  const [value, setValue] = useState('');
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    getNotes().then(res => setNotesList(res.data));
  }, []);

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const createNoteHandler = async (value) => {
    if (value.length < 3) return;

    const res = await createNote(value);
    const newNote = res.data;

    if (!newNote) return;

    setNotesList([...notesList, newNote]);
    setValue('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.input_wrap}>
        <input
          placeholder="Write some word..."
          className={styles.input}
          value={value}
          onChange={onInputChange}
        />
        <button className={styles.button} onClick={() => createNoteHandler(value)}>
          Create
        </button>
      </div>

      <div className={styles.list_wrap}>
        {!!notesList && notesList.map((item) => (
          <NoteCard
            key={item._id}
            id={item._id}
            title={item.title}
            setNotesList={setNotesList}
            notesList={notesList}
          />
        ))}
      </div>
    </div>
  )
};

export default Main;