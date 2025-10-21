import style from "./TournamentCard.module.css";
function TournamentCard({ tournament }) {
  return <div className={style.TournamentCardWrapper}>{tournament.name}</div>;
}
export default TournamentCard;
