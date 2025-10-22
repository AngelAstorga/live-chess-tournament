import style from "./PlayerCard.module.css";
function PlayerCard({ player }) {
  return (
    <div className={style.PlayerCardWrapper}>
      <span className={style.PlayerCard__name}>{player.name}</span>
      <h3 className={style.PlayerCard__points}>{player.points}</h3>
    </div>
  );
}
export default PlayerCard;
