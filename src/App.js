import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Table from "./Components/Table";
import ConditionalFormatter from "./Components/ConditionalFormat";
import UserDirections from "./Components/UserDirections";
import { useData } from "./Context/dataContext";
import Loader from "./Components/Loader";

function App() {
  const { toggleDirections, loader } = useData();
  return (
    <div className="App">
      <Navbar />
      {/* {toggleDirections && <UserDirections />} */}
      {loader ? (
        <Loader />
      ) : (
        <div className="content">
          <Table />
          <ConditionalFormatter />
        </div>
      )}
    </div>
  );
}

export default App;
