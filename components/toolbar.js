import Link from "next/link";
import styles from "../styles/Toolbar.module.css";
import Image from "next/image";
export default function Toolbar() {
  return (
    <>
      <div className={styles.main}>
        <Link className={styles.feed} href="/">
          <Image
            src="https://www.twicon.page/imgs/taiwan-island.svg"
            width={60}
            height={60}
            className={styles.img}
            alt="tw-logo"
          ></Image>
        </Link>
        <div>
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
