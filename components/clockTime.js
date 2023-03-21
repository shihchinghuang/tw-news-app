import React from "react";
import Clock from "react-live-clock";
import styles from "../styles/ClockTime.module.css";
export default function ClockTime() {
  return (
    <div className={styles.clock}>
      <Clock
        date={String(new Date())}
        format={"dddd | MMMM Do YYYY | h:mm:ss A"}
        timezone={"Asia/Taipei"}
        ticking={true}
        noSsr={true}
      />
      <p className={styles.desc}>Time Zone - Taiwan (GMT+8)</p>
    </div>
  );
}
