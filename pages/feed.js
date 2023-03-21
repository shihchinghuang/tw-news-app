import Toolbar from "../components/toolbar";
import styles from "../styles/Feed.module.css";
import Head from "next/head";

export default function Feed({ articles }) {
  return (
    <>
      <Head>
        <title>Taiwan Matters</title>
      </Head>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => {
          return (
            <>
              <div className={styles.section} key={index}>
                <a className={styles.link} href={article.url} target="_blank">
                  <h1 className={styles.title}>{article.title}</h1>
                  <p className={styles.desc}>{article.description}</p>

                  <img
                    className={styles.img}
                    src={article.urlToImage}
                    alt="photo"
                  />
                  <div className={styles.footer}>
                    <p>
                      {article.publishedAt.split("T").join(" ").slice(0, 16)}
                    </p>
                    <p>{article.source.name}</p>
                  </div>
                </a>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  let date = new Date();
  let day = date.getDate() - 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const apiResponse = await fetch(
    `https://newsapi.org/v2/everything?q=taiwan&from=${year}-${month}-${day}&language=en&sortBy=popularity`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );
  const apiJson = await apiResponse.json();
  let { articles } = apiJson;
  articles = articles.filter(
    (article) => article.urlToImage && article.title.includes("Taiwan")
  );
  return {
    props: { articles },
  };
};
