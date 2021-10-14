// User Directions Component - the user directions shown in the start

import {
  faAngleLeft,
  faAngleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react/cjs/react.development";
import { useData } from "../Context/dataContext";
import { images } from "../Util";
import format_image from "../images/format_image.PNG";
import add_value from "../images/add_value.PNG";
import add_relation from "../images/add_relation.PNG";
import format_color_and_submit from "../images/format_color_and_submit.PNG";

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
            <img
              src="https://rukminim1.flixcart.com/flap/844/140/image/6d467cb751b1729f.jpg?q=50"
              alt=""
            />
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
