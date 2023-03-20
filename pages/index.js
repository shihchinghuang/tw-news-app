import Head from "next/head";
import styles from "../styles/Home.module.css";
import Toolbar from "../components/toolbar";
import Feed from "./feed";
import About from "./about";

export default function Home() {
  return (
    <>
      <About />
    </>
  );
}
