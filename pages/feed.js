import Toolbar from "../components/toolbar";
import styles from "../styles/Feed.module.css";
import Head from "next/head";

export default function Feed({ articles, data }) {
  let headlineImg =
    data.length === 0 || !data || data[0].multimedia.length === 0
      ? null
      : data[0].multimedia.filter((item) => item.subtype === "facebookJumbo");
  return (
    <>
      <Head>
        <title>Taiwan Matters</title>
      </Head>
      <Toolbar />
      {data.length === 0 || !data ? (
        ""
      ) : (
        <>
          <div className={styles.headline}>
            <p className={styles.headlineDesc}>
              🌟 Recently, this matters the most:
            </p>

            <a
              className={styles.headlineLink}
              href={data[0].web_url}
              target="_blank"
            >
              <div className={styles.headlineStory}>
                <div>
                  {headlineImg ? (
                    <img
                      className={styles.headlineImg}
                      src={`https://www.nytimes.com/${headlineImg[0]?.url}`}
                      alt="photo"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <p className={styles.headlineTitle}>
                    {data[0].headline.main}
                  </p>
                  <p className={styles.desc}>
                    {data[0].abstract}
                    <br />
                    {data[0].lead_paragraph}
                  </p>
                  <div className={styles.headlineSrc}>
                    <p>{data[0].pub_date.split("T").join(" ").slice(0, 16)}</p>
                    <p>
                      {data[0].source ? data[0].source : "The New York Times"}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
          <img src="/down-arrow.png" className={styles.downArrow} />
        </>
      )}
      <div className={styles.main}>
        {articles.map((article, key) => {
          return (
            <>
              <div className={styles.section} key={key}>
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
  let day = date.getDate() - 2;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  const apiResponseNews = await fetch(
    `https://newsapi.org/v2/everything?q=taiwan&from=${year}-${month}-${day}&language=en&sortBy=popularity`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    }
  );
  const apiJsonNews = await apiResponseNews.json();
  let { articles } = apiJsonNews;
  const apiResponseNYT = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=taiwan&page=1&sort=newest&api-key=${process.env.NEXT_PUBLIC_NEWSFROMNYT_KEY}`
  );
  let apiJsonNYT = await apiResponseNYT.json();
  let data = apiJsonNYT.response.docs;

  data = data.filter(
    (item) =>
      item.abstract.includes("Taiwan") ||
      item.lead_paragraph.includes("Taiwan") ||
      item.snippet.includes("Taiwan")
  );

  articles = articles.filter(
    (article) => article.urlToImage && article.title.includes("Taiwan")
  );
  return {
    props: { articles, data },
  };
};
