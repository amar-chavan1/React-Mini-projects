import "./App.css";
import Lottery from "./Lottery.jsx";
import Ticket from "./Ticket.jsx";
import {sum} from "./helper.js";

function App() {
  let winningCondition = (ticket) => {
    return sum(ticket) === 20;
  };

  return (
    <>
      <Lottery n={4} winningcondition={winningCondition} />
    </>
  );
}

export default App;
