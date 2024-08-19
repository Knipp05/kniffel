import React from "react";
import DiceBoard from "./components/DiceBoard";
import playerInit from "./playerInit";
import "./style.css";
import ScoreBoard from "./components/ScoreBoard";
import header from "./media/app--header-4.jpg";
import PlayerForm from "./components/PlayerForm";
import diceInit from "./diceInit";

function App() {
  const [players, setPlayers] = React.useState(playerInit);
  const [dice, setDice] = React.useState(diceInit);
  const [diceValues, setDiceValues] = React.useState([0, 0, 0, 0, 0, 0]);
  const [currentStatus, setCurrentStatus] = React.useState({
    currentPlayer: 0,
    currentTurn: 0,
  });
  const [gameStatus, setGameStatus] = React.useState("not started");
  function checkIfGameFinished(): void {
    players[players.length - 1].points.every((points) => points >= 0) &&
      setGameStatus("finished");
  }
  function addPoints(
    playerId: number,
    pointId: number,
    pointVal: number
  ): void {
    let newPoints = { ...players[playerId] }.points;
    let bonus = 0;
    newPoints[pointId] = pointVal;
    if (pointId <= 5) {
      bonus = calcUpperPoints(playerId) >= 63 ? 35 : 0;
      newPoints[13] = bonus;
    }
    setPlayers((oldPlayers) =>
      oldPlayers.map((player) => {
        if (player.id === playerId) {
          return {
            ...player,
            points: newPoints,
          };
        } else return player;
      })
    );
  }
  function handleUpgradeChange(upgradeId: number, configId: number) {
    let newUpgrades = { ...players[currentStatus.currentPlayer] }.upgrades;
    newUpgrades[upgradeId][configId] = !newUpgrades[upgradeId][configId];
    setPlayers((oldPlayers) =>
      oldPlayers.map((player) => {
        if (player.id === currentStatus.currentPlayer) {
          return { ...player, upgrades: newUpgrades };
        } else return player;
      })
    );
  }
  function nextPlayer(): void {
    setCurrentStatus((oldStatus) =>
      oldStatus.currentPlayer < players.length - 1
        ? { currentPlayer: oldStatus.currentPlayer + 1, currentTurn: 0 }
        : { currentPlayer: 0, currentTurn: 0 }
    );
    setDiceValues([0, 0, 0, 0, 0, 0]);
    setDice(diceInit);
    checkIfGameFinished();
  }
  function nextTurn(): void {
    setCurrentStatus((oldStatus) => {
      return { ...oldStatus, currentTurn: oldStatus.currentTurn + 1 };
    });
  }
  function calcUpperPoints(playerId: number): number {
    let sum = 0;
    players[playerId].points
      .slice(0, 6)
      .forEach((points) => (points >= 0 ? (sum += points) : 0));
    return sum;
  }
  function sumPlayerPoints(playerId: number): number {
    let sum = 0;
    players[playerId].points.forEach(
      (point: number) => point >= 0 && (sum += point)
    );
    return sum;
  }
  function getWinner(): string {
    let finalPoints = [0, 0];
    players.forEach((player) =>
      sumPlayerPoints(player.id) > finalPoints[1]
        ? (finalPoints = [player.id, sumPlayerPoints(player.id)])
        : 0
    );
    return players[finalPoints[0]].name;
  }
  return (
    <main className="app">
      <img
        className={
          gameStatus === "not started"
            ? "app--header-img"
            : "app--header-img-hidden"
        }
        src={header}
        width="100%"
      />
      <div
        className={
          gameStatus === "not started"
            ? "app--playerform"
            : "app--playerform-hidden"
        }
      >
        <PlayerForm
          players={players}
          setPlayers={setPlayers}
          setGameStatus={setGameStatus}
        />
      </div>
      <div
        className={
          gameStatus === "not started"
            ? "scoreboard--hidden"
            : "scoreboard--shown"
        }
      >
        <ScoreBoard
          players={players}
          nextPlayer={nextPlayer}
          gameStatus={gameStatus}
          diceValues={diceValues}
          currentStatus={currentStatus}
          addPoints={addPoints}
          sumPlayerPoints={sumPlayerPoints}
          calcUpperPoints={calcUpperPoints}
          handleUpgradeChange={handleUpgradeChange}
        />
      </div>
      {gameStatus === "finished" && (
        <h1 id="app--finished">Spiel beendet! {getWinner()} gewinnt!</h1>
      )}
      {gameStatus === "started" && (
        <div className="app--game">
          <DiceBoard
            currentStatus={currentStatus}
            nextTurn={nextTurn}
            setDiceValues={setDiceValues}
            dice={dice}
            setDice={setDice}
          />
        </div>
      )}
    </main>
  );
}

export default App;
