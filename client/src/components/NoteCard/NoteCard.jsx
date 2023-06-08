import { useState } from "react";
import { deleteNote, getNotes, updateNote } from "../../services/API/apiService";
import styles from './NoteCard.module.css';
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const NoteCard = ({ title, id, notesList, setNotesList }) => {
  const [isInput, setIsInput] = useState(false);
  const [value, setValue] = useState(title);
  const [isOpen, setIsOpen] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const updateNoteHandler = async () => {
    if (value.length < 3) {
      return
    };

    const newNote = await updateNote(id, value);

    if (newNote) {
      const newList = await getNotes();
      setNotesList(newList);
      inputStateToggle();
    };
  };

  const trimTitle = (value) => {
    return value.length < 20 ? value : value?.slice(1, 20) + '...';
  };

  const inputStateToggle = () => setIsInput(prevState => !prevState);

  const deleteNoteHandler = async () => {
    const isDelete = await deleteNote(id);

    if (isDelete) {
      const filteredList = notesList.filter((note) => note._id !== id);
      setNotesList(filteredList);
    }
  };

  return (
    <>
      <div className={styles.card}>
        {isInput ?
          <>
            <input
              value={value}
              placeholder="Update text"
              onChange={onChange}
              className={styles.input}
            />
            <div className={styles.button_wrap}>
              <span className={styles.update_button} onClick={updateNoteHandler}>
                &#10004;
              </span>
              <span className={styles.cancel_button} onClick={inputStateToggle}>
                &#9747;
              </span>
            </div>
          </>
          :
          <>
            <p onDoubleClick={inputStateToggle} className={styles.title}>
              <abbr title="Double click for update">
                {trimTitle(title)}
              </abbr>
            </p>
            <p onClick={() => setIsOpen(true)} className={styles.close_button}>&#9747;</p>
          </>
        }
      </div>
      {isOpen &&
        <ConfirmModal
          noteTitle={title}
          setIsOpen={setIsOpen}
          confirmHandler={deleteNoteHandler}
        />}
    </>
  );
};

export default NoteCard;