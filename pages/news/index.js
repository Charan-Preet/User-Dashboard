import { useEffect, useState, useContext } from "react";
import Card from "../../reuseables/Cards";
import Modal from "react-awesome-modal";
import PopUp from "../../reuseables/Popup";
import DataContext from "../../context";

export default function News({ posts }) {
  const { openPopUp, isPopUpOpen } = useContext(DataContext);
  const [clickEntry, setClickEntry] = useState(null);

  useEffect(() => {
    //handeling click through event-deligation
    document.querySelector("#card")?.addEventListener("click", (e) => {
      if (e.target.matches(".full-story-button")) {
        setClickEntry(e.target.attributes.id.value);
        openPopUp();
      }
    });
  }, []);

  const displayCards = posts.map((data) => <Card data={data} key={data.id} />);

  const checkFullStory = () => {
    return (
      <Modal visible={isPopUpOpen} width="600" height="500" effect="fadeInUp">
        <PopUp telemetryData={clickEntry} />
      </Modal>
    );
  };

  return (
    <>
      {checkFullStory()}
      <h1 className="f1 lh-title tc">News</h1>
      <h1 className="f4 lh-copy tc bg-light-gray">
        But still reading Nuxt.js docs is better...
      </h1>
      <div className="flex flex-wrap justify-around" id="card">
        {displayCards}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const res = await fetch(url);
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
