import style from "./home.module.css";
import RoundCard from "../../shared/RoundCard/RoundCard";
import SectionCard from "../../shared/SectionCard/SectionCard";
import TournamentCard from "../../shared/TournamentCard/TournamentCard";
import NewTournamentModal from "../../shared/ui/modals/newTournamentModal";
import Ranking from "../../features/Ranking/Ranking";
import imgPlus from "../../assets/icons/plus.png";
import imgUpdate from "../../assets/icons/Sync.png";
import imgLink from "../../assets/icons/Link.png";
import { useEffect, useState } from "react";
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [listTournaments, setLisTournaments] = useState([]);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [players, setPlayers] = useState([]);

  async function loadTournaments(idUser) {
    const payLoad = JSON.stringify({
      idUser: idUser,
    });
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payLoad,
    };
    try {
      const resp = await fetch(
        "https://innovastorga.com/chesstournaments/php/getTournaments.php",
        options
      );
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const tournaments = await resp.json();
      setLisTournaments(tournaments.tournaments);
      console.log(tournaments);
    } catch (err) {
      console.log("There's an error", err);
    }
  }

  useEffect(() => {
    loadTournaments(1);
  }, []);

  return (
    <div className={style.HomeWrapper}>
      {isOpen && <NewTournamentModal setIsOpen={setIsOpen} />}
      <div className={style.HomeHeader}>
        {listTournaments.map((tournament) => {
          return (
            <TournamentCard
              key={tournament.idTournament}
              tournament={{ name: tournament.nameTournament }}
            />
          );
        })}
      </div>
      <div className={style.HomeBody}>
        <div className={style.HomeMenu}>
          <h3 className={style.HomeMenu__sections}>Sections</h3>
          <div className={style.HomeMenu__sectionsWrapper}>
            <SectionCard />
            <SectionCard />
            <SectionCard />
            <SectionCard />
          </div>
        </div>
        <div className={style.HomeMain}>
          <div className={style.HomeMain__header}>
            <h1 className={style.HomeMain__headerTitle}>ELITE QUADS 2025</h1>
            <div className={style.HomeMain__headerOptions}>
              <div
                className={style.HomeMain__headerOptionContainer}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <img
                  className={style.HomeMain__headerOption}
                  src={imgPlus}
                  alt=""
                />
              </div>
              <div className={style.HomeMain__headerOptionContainer}>
                <img
                  className={style.HomeMain__headerOption}
                  src={imgUpdate}
                  alt=""
                />
              </div>
              <div className={style.HomeMain__headerOptionContainer}>
                <img
                  className={style.HomeMain__headerOption}
                  src={imgLink}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className={style.HomeMain__roundsWrapper}>
            <RoundCard />
            <RoundCard />
            <RoundCard />
            <RoundCard />
          </div>
        </div>
        <div className={style.HomeRanking}>
          <Ranking players={players} />
        </div>
      </div>
    </div>
  );
}
export default Home;
