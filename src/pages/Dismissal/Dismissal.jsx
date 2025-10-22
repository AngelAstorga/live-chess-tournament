import PlayerCard from "../../shared/PlayerCard/PlayerCard";
import style from "./Dismissal.module.css";
import { useLocation } from "react-router-dom";
function Dismissal() {
  const location = useLocation();
  const tournamentDetails = location.state?.tournamentDetails;
  console.log("###players", tournamentDetails.players);

  return (
    <div className={style.DismissalWrapper}>
      {" "}
      {tournamentDetails.players.length > 0 ? (
        <div>
          {tournamentDetails.players.map((player) => {
            return <PlayerCard key={player.idPlayer} player={player} />;
          })}
        </div>
      ) : (
        <div>No Players</div>
      )}
    </div>
  );
}
export default Dismissal;
