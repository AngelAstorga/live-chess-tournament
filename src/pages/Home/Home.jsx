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
import { useNavigate } from "react-router-dom";
function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [listTournaments, setLisTournaments] = useState([]);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [players, setPlayers] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const navigate = useNavigate();

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

  const handleVisitDismissal = (idTournament, tournamentDetails) => {
    if (idTournament != null) {
      navigate("/dismissal", {
        state: {
          tournamentDetails: tournamentDetails,
        },
      });
    }
  };

  async function getTournamentsDetails(idTournament) {
    const url = new URL(
      "https://innovastorga.com/chesstournaments/php/getTournamentsDetails.php"
    );
    url.searchParams.append("idTournament", idTournament);
    const options = {
      method: "GET",
      headers: {},
    };
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.message);
      }
      const tournamentDetails = await resp.json();
      //{idTournament:,nameTournament:,players:[]} structure
      setTournamentDetails({ ...tournamentDetails });
      console.log(tournamentDetails);
    } catch (err) {
      console.log("There's an error", err);
    }
  }
  return (
    <div className={style.HomeWrapper}>
      {isOpen && (
        <NewTournamentModal
          setIsOpen={setIsOpen}
          setLisTournaments={setLisTournaments}
          listTournaments={listTournaments}
        />
      )}
      <div className={style.HomeHeader}>
        {listTournaments.map((tournament) => {
          return (
            <TournamentCard
              key={tournament.idTournament}
              tournament={{
                name: tournament.nameTournament,
                id: tournament.idTournament,
              }}
              handleGetDetails={getTournamentsDetails}
            />
          );
        })}
      </div>
      <div className={style.HomeBody}>
        <div className={style.HomeMenu}>
          <h3 className={style.HomeMenu__sections}>Sections</h3>
          {tournamentDetails.sections != null ? (
            <div className={style.HomeMenu__sectionsWrapper}>
              <SectionCard />
              <SectionCard />
              <SectionCard />
              <SectionCard />
            </div>
          ) : (
            <div>No sections</div>
          )}
          <button
            onClick={() => {
              handleVisitDismissal(
                tournamentDetails.idTournament,
                tournamentDetails
              );
            }}
            className={style.HomeDismissalButton}
          >
            Dismissal
          </button>
        </div>
        <div className={style.HomeMain}>
          <div className={style.HomeMain__header}>
            {tournamentDetails.title != null ? (
              <h1 className={style.HomeMain__headerTitle}>
                {tournamentDetails.name}
              </h1>
            ) : (
              <h1 className={style.HomeMain__headerTitle}>
                CREATE A NEW TOURNAMENT
              </h1>
            )}

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
          {currentSection != null ? (
            <div className={style.HomeMain__roundsWrapper}>
              <RoundCard />
              <RoundCard />
              <RoundCard />
              <RoundCard />
            </div>
          ) : (
            <div className={style.HomeMain__roundsWrapper}> Pick a Section</div>
          )}
        </div>
        <div className={style.HomeRanking}>
          {currentSection != null ? (
            <Ranking players={players} />
          ) : (
            <div className={style.HomeMain__roundsWrapper}> </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
