import Toolbar from "../components/toolbar";
import ClockTime from "../components/clockTime";
import moment from "moment";
import Image from "next/image";
import styles from "../styles/Info.module.css";
export default function Info({ data }) {
  return (
    <>
      <Toolbar></Toolbar>
      <ClockTime />
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.location}>Taipei City, Taiwan</p>
          <p className={styles.temp}>
            {Math.round(data.main.temp * 10) / 10}&deg;C
          </p>
          <div className={styles.flex_wrap}>
            <p className={styles.desc}>Highest</p>
            <p className={styles.desc}>Lowest</p>
          </div>
          <div className={styles.flex_wrap}>
            <p className={styles.temp_max}>
              {Math.round(data.main.temp_max * 10) / 10}&deg;C
            </p>
            <p className={styles.temp_min}>
              {Math.round(data.main.temp_min * 10) / 10}&deg;C
            </p>
          </div>
          <div className={styles.flex_wrap}>
            <p className={styles.desc}>Sunrise</p>
            <p className={styles.desc}>Sunset</p>
          </div>
          <div className={styles.flex_wrap}>
            <p className={styles.sun}>
              {moment.unix(data.sys.sunrise).tz("Asia/Taipei").format("LT")}
            </p>
            <p className={styles.sun}>
              {moment.unix(data.sys.sunset).tz("Asia/Taipei").format("LT")}
            </p>
          </div>
        </div>
        <div className={styles.right}>
          <Image
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            width={100}
            height={100}
            alt="Weather Icon"
          />
          <p className={styles.weather}>{data.weather[0].main}</p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=25.105497&lon=121.597366&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&units=metric`
  );
  const data = await res.json();
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
