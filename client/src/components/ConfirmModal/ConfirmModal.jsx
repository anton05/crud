import styles from './ConfirmModal.module.css';

const ConfirmModal = ({ setIsOpen, confirmHandler, noteTitle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Are you really want to delete {noteTitle} note?</p>
        <div className={styles.buttons}>
          <button className={styles.confirm_button} onClick={() => confirmHandler()}>
            &#10004;
          </button>
          <button className={styles.close_button} onClick={() => setIsOpen(false)}>
            &#9747;
          </button>
        </div>
      </div>
    </div>
  )
};

export default ConfirmModal;