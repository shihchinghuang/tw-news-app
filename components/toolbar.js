import Link from "next/link";
import styles from "../styles/Toolbar.module.css";
import Image from "next/image";
import ClockTime from "./clockTime";
export default function Toolbar() {
  return (
    <>
      <div className={styles.main}>
        <Link href="/feed" className={styles.link}>
          <div>
            <h1 className={styles.header}>Taiwan Matters</h1>
            <div className={styles.icon}>
              <Image
                src="https://www.twicon.page/imgs/taiwan-island.svg"
                width={30}
                height={30}
                className={styles.img}
                alt="tw-logo"
              ></Image>
            </div>
          </div>
        </Link>
        <ClockTime />
        <div className={styles.right}>
          <div>
            <Link className={styles.link} href="/feed">
              Feed
            </Link>
          </div>
          <div>
            <Link className={styles.link} href="/info">
              Info
            </Link>
          </div>
          <div>
            <Link className={styles.link} href="/about">
              About
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
