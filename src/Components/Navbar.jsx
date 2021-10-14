//  Navbar component - the navigation bar on top
// holds user direction and toggle for it

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useData } from "../Context/dataContext";

export default function Navbar() {
  const { setToggleDirections } = useData();
  return (
    <nav className="nav nav__main">
      <h1 className="nav__heading">Findr</h1>
      <div className="nav nav__options">
        <FontAwesomeIcon
          icon={faQuestion}
          size="lg"
          onClick={() => setToggleDirections(true)}
        />
      </div>
    </nav>
  );
}
