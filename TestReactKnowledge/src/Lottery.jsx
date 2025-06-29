import { useState } from "react";
import { genTicekt, sum } from "./helper";
import Ticket from "./Ticket";
import './Lottery.css';
export default function Lottery({ n = 3, winningcondition }) {
  let [ticket, setTicket] = useState(genTicekt(n));
  let isWinning = winningcondition(ticket);
  let handleBuyNewTicket = () => {
    setTicket(genTicekt(n));
  };
  
  return (
    <div className="Lottery">
      <h1>Lottery Game</h1>
      <Ticket ticket={ticket} />
      <button onClick={handleBuyNewTicket}>Buy New Ticekt</button>
      <h2>{isWinning && "Congratulation You Win"}</h2>
    </div>
  );
}
