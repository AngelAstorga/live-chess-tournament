import style from "./home.module.css";
import RoundCard from "../../shared/RoundCard/RoundCard";
import SectionCard from "../../shared/SectionCard/SectionCard";
import TournamentCard from "../../shared/TournamentCard/TournamentCard";
import imgPlus from "../../assets/icons/plus.png";
import imgUpdate from "../../assets/icons/Sync.png";
import imgLink from "../../assets/icons/Link.png";
function Home() {
  return (
    <div className={style.HomeWrapper}>
      <div className={style.HomeHeader}>
        <TournamentCard tournament={{ name: "tournament 1" }} />
        <TournamentCard tournament={{ name: "tournament 2" }} />
        <TournamentCard tournament={{ name: "tournament 3" }} />
        <TournamentCard tournament={{ name: "tournament 4" }} />
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
              <div className={style.HomeMain__headerOptionContainer}>
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
      </div>
    </div>
  );
}
export default Home;
