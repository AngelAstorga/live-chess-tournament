import style from "./home.module.css";
import RoundCard from "../../shared/RoundCard/RoundCard";
import SectionCard from "../../shared/SectionCard/SectionCard";
function Home() {
  return (
    <div className={style.HomeWrapper}>
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
        <h1 className={style.HomeMain__title}>ELITE QUADS 2025</h1>
        <div className={style.HomeMain__roundsWrapper}>
          <RoundCard />
          <RoundCard />
          <RoundCard />
          <RoundCard />
        </div>
      </div>
    </div>
  );
}
export default Home;
