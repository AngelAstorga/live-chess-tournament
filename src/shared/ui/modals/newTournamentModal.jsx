import { useState, useRef } from "react";
import style from "./NewTournamentModal.module.css";
import imgUpload from "../../../assets/icons/Upload to Cloud.png";
function NewTournamentModal({ setIsOpen }) {
  const [fileName, setFileName] = useState("");
  const [tournamentData, setTournamentData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFilePick = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file) setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const parsed = JSON.parse(text);
        setTournamentData(parsed);
        console.log("JSON content:", parsed);
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };
    reader.readAsText(file);
  };
  const handleOpenPicker = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className={style.NewTournamentModalWrapper}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className={style.NewTournamentModalContainer}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={style.NewTournamentModal__title}>
          <div>
            <span>upload your sjson</span>
            <img
              onClick={() => {
                handleOpenPicker();
              }}
              className={style.NewTournamentModal__uploadIcon}
              src={imgUpload}
              alt=""
            />
          </div>

          <span>your file:{fileName}</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFilePick}
            style={{ display: "none" }}
          />
        </div>

        <input
          className={style.NewTournamentModal__projectName}
          type="text"
          placeholder="Tournament Name"
        />
        <button className={style.NewTournamentModal__button}>Create</button>
      </div>
    </div>
  );
}
export default NewTournamentModal;
