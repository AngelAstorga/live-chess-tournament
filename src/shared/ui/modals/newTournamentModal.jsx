import { useState, useRef } from "react";
import style from "./NewTournamentModal.module.css";
import imgUpload from "../../../assets/icons/Upload to Cloud.png";
function NewTournamentModal({ setIsOpen }) {
  const [fileName, setFileName] = useState("");
  const [tournamentData, setTournamentData] = useState(null);
  const [tournamentPayLoad, setTournamentPayLoad] = useState({
    tournamentName: "",
    tournamentLink: "",
    tournamentPlayers: [],
    tournamentDetails: [],
  });
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentLink, setTournamentLink] = useState("");
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
        setTournamentName(parsed.Overview["Tournament title"]);
        setTournamentPayLoad({
          ...tournamentPayLoad,
          tournamentName: parsed.Overview["Tournament title"],
        });
        console.log(parsed);
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };
    reader.readAsText(file);
  };
  const handleOpenPicker = () => {
    fileInputRef.current.click();
  };
  const getPlayers = (sections) => {
    let players = [];
    sections.forEach((section) => {
      section.Players.forEach((player) => {
        players.push({ Name: player.Name, id: player.ID });
      });
    });
    return players.filter((player, index, self) => {
      return index === self.findIndex((p) => p.id === player.id);
    });
  };
  async function handleSubmit(e) {
    e.preventDefault();
    if (tournamentPayLoad.tournamentName === "") {
      return null;
    }
    const players = getPlayers(tournamentData.Sections);
    const payLoad = JSON.stringify({
      tournamentData: { ...tournamentPayLoad, tournamentPlayers: players },
    });
    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: payLoad,
    };
    console.log(players);
    try {
      const resp = await fetch(
        "https://innovastorga.com/chesstournaments/php/putTournament.php",
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const newTournament = await resp.json();
      console.log(newTournament);
    } catch (err) {
      console.log("Error with sending tournament Data", err);
    }
  }
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
        <div className={style.NewTournamentModal__headerContainer}>
          <div className={style.NewTournamentModal__header}>
            <span className={style.NewTournamentModal__message}>
              Upload your sjson
            </span>
            <img
              onClick={() => {
                handleOpenPicker();
              }}
              className={style.NewTournamentModal__uploadIcon}
              src={imgUpload}
              alt=""
            />
          </div>
          <span className={style.NewTournamentModal__fileNameLabel}>
            Your file :{" "}
            <span className={style.NewTournamentModal__fileName}>
              {fileName}
            </span>
          </span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFilePick}
            style={{ display: "none" }}
          />
        </div>
        <form
          className={style.NewTournamentModal__form}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className={style.NewTournamentModal__formItem}>
            <label
              className={style.NewTournamentModal__label}
              htmlFor="tournamentName"
            >
              Tournament Name:
            </label>
            <input
              id="tournamentName"
              className={style.NewTournamentModal__tournamentInput}
              type="text"
              onChange={(e) => {
                setTournamentName(e.target.value);
              }}
              placeholder="Tournament Name"
              value={tournamentName}
            />
          </div>
          <div className={style.NewTournamentModal__formItem}>
            <label
              className={style.NewTournamentModal__label}
              htmlFor="tournamentLink"
            >
              Tournament Link:
            </label>
            <input
              id="tournamentLink"
              value={tournamentLink}
              className={style.NewTournamentModal__tournamentInput}
              type="text"
              placeholder="Tournament Link"
              onChange={(e) => {
                setTournamentLink(e.target.value);
              }}
            />
          </div>
          <button className={style.NewTournamentModal__button}>Create</button>
        </form>
      </div>
    </div>
  );
}
export default NewTournamentModal;
