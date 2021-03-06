// User Directions Component - the user directions shown in the start

import {
  faAngleLeft,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useData } from "../Context/dataContext";
import { images } from "../Util";

export default function UserDirections() {
  // current index for the information
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setToggleDirections } = useData();

  // function to change slide of user directions
  function sliderhandler(type) {
    if (type === "left") {
      if (currentIndex >= 1) {
        setCurrentIndex((prev) => prev - 1);
      }
    } else {
      if (currentIndex < images.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
    }
  }
  return (
    <div className="directions">
      <div className="user-direction">
        <h2>Welcome to Findr!</h2>
        <section className="user-direction__section">
          <FontAwesomeIcon
            icon={faAngleLeft}
            size="2x"
            className="scroll"
            onClick={() => sliderhandler("left")}
          />
          <div className="user-direction__image">
            <img src={images[currentIndex].image} alt="" />
            <h4>{images[currentIndex].description}</h4>
          </div>
          <FontAwesomeIcon
            icon={faAngleRight}
            size="2x"
            className="scroll"
            onClick={() => sliderhandler("right")}
          />
        </section>
      </div>
      <button className="directions__close">
        <FontAwesomeIcon
          icon={faTimes}
          size="3x"
          onClick={() => setToggleDirections(false)}
        />
      </button>
    </div>
  );
}
