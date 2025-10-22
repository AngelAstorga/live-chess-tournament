import style from "./TournamentCard.module.css";
function TournamentCard({ tournament, handleGetDetails }) {
  return (
    <div
      className={style.TournamentCardWrapper}
      onClick={() => {
        handleGetDetails(tournament.id);
      }}
    >
      {tournament.name}
    </div>
  );
}
export default TournamentCard;
