import PlayerCard from "../../shared/PlayerCard/PlayerCard";

function Ranking({ players }) {
  return (
    <div>
      <h1>Ranking</h1>
      <div>
        {players.map((player) => {
          return <PlayerCard player={player} />;
        })}
      </div>
    </div>
  );
}
export default Ranking;
