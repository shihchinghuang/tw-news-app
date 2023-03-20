import Toolbar from "../components/toolbar";

export default function About() {
  return (
    <>
      <Toolbar></Toolbar>
      <p>Hi there!</p>
      <p>Would love to connect through</p>
    </>
  );
}

export const getServerSideProps = async () => {
  const date = new Date();
  let day = date.getDate() - 1;
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const apiResponse = await fetch();

  // {
  //   headers: {
  //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_WEATHER_KEY}`,
  //   },
  // }
  const apiJson = await apiResponse.json();
  let { weather } = apiJson;
  console.log(apiResponse);
  return {
    props: { weather },
  };
};

/*
[{"name":"Taiwan ROC","place_id":"taiwan-1668284","adm_area1":null,"adm_area2":null,"country":"Taiwan ROC","lat":"24.0N","lon":"121.0E","timezone":"Asia/Taipei","type":"country"},{"name":"Taiwan","place_id":"taiwan-7280291","adm_area1":"Taiwan","adm_area2":null,"country":"Taiwan ROC","lat":"24.15114N","lon":"120.70541E","timezone":"Asia/Taipei","type":"administrative_area"},{"name":"New Taipei City","place_id":"new-taipei","adm_area1":"Taipei","adm_area2":"New Taipei City","country":"Taiwan ROC","lat":"24.94702N","lon":"121.58175E","timezone":"Asia/Taipei","type":"administrative_area"},{"name":"Formosa","place_id":"taiwan-1668285","adm_area1":null,"adm_area2":null,"country":"Taiwan ROC","lat":"23.83847N","lon":"120.96614E","timezone":"Asia/Taipei","type":"island"}]

*/
