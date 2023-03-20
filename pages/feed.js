import Toolbar from "../components/toolbar";
import styles from "../styles/Feed.module.css";

export default function Feed({ articles }) {
  return (
    <>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => {
          return (
            <>
              <div className={styles.section}>
                <a className={styles.link} href={article.url} target="_blank">
                  <h1 className={styles.title} key={index}>
                    {article.title}
                  </h1>
                  <p className={styles.desc}>{article.description}</p>
                  <img
                    className={styles.img}
                    src={article.urlToImage}
                    alt="photo"
                  />
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
  const date = new Date();
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
  articles = articles.filter((article) => {
    return article.urlToImage && article.title.includes("Taiwan");
  });
  return {
    props: { articles },
  };
};
