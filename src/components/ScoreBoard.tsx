import React from "react";
import PlayerSheet from "./PlayerSheet";
import CreateIcon from "@mui/icons-material/Create";
import diceImages from "../diceImages";
import UpgradePopup from "./UpgradePopup";
export default function ScoreBoard(props: any) {
  const [toggleUpgradeForms, setToggleUpgradeForms] = React.useState([
    false,
    false,
    false,
  ]);
  const playerColumns = props.players.map((player: any) => (
    <PlayerSheet
      key={player.name}
      playerData={player}
      diceValues={props.diceValues}
      addPoints={props.addPoints}
      currentStatus={props.currentStatus}
      nextPlayer={props.nextPlayer}
      gameStatus={props.gameStatus}
      sumPlayerPoints={props.sumPlayerPoints}
      calcUpperPoints={props.calcUpperPoints}
    />
  ));
  function handleToggleUpgradeForms(index: number) {
    setToggleUpgradeForms((oldToggles) => {
      let newToggles = [...oldToggles];
      newToggles[index] = !newToggles[index];
      return newToggles;
    });
  }
  return (
    <div className="scoreboard">
      {props.players[0].name && (
        <table className="app--table">
          <tbody>
            <tr id="app--table-overview">
              <td>
                <b>Name</b>
              </td>
              <td>
                <img src={diceImages[0]} className="score--img" />
                <b>Einser</b>
              </td>
              <td>
                <img src={diceImages[1]} className="score--img" />
                <b>Zweier</b>
              </td>
              <td>
                <img src={diceImages[2]} className="score--img" />
                <b>Dreier</b>
              </td>
              <td>
                <img src={diceImages[3]} className="score--img" />
                <b>Vierer</b>
              </td>
              <td>
                <img src={diceImages[4]} className="score--img" />
                <b>Fünfer</b>
              </td>
              <td>
                <img src={diceImages[5]} className="score--img" />
                <b>Sechser</b>
              </td>
              <td className="app--table-trenner">
                <b>Bonus</b>
              </td>
              <td>
                <b>Dreierpasch</b>
              </td>
              <td>
                <b>Viererpasch</b>
              </td>
              <td>
                <b>Full House</b>
              </td>
              <td>
                <b>Kleine Straße</b>
                {props.currentStatus.currentTurn === 0 &&
                  props.players[props.currentStatus.currentPlayer].points[9] ===
                    -1 && (
                    <div
                      className="table--div-upgrade"
                      onClick={() => handleToggleUpgradeForms(0)}
                    >
                      <CreateIcon />
                    </div>
                  )}
                <UpgradePopup
                  open={toggleUpgradeForms[0]}
                  handleToggleUpgradeForm={handleToggleUpgradeForms}
                  playerData={props.players[props.currentStatus.currentPlayer]}
                  upgradeId={0}
                  handleUpgradeChange={props.handleUpgradeChange}
                />
              </td>
              <td>
                <b>Große Straße</b>
                {props.currentStatus.currentTurn === 0 &&
                  props.players[props.currentStatus.currentPlayer]
                    .points[10] === -1 && (
                    <div
                      className="table--div-upgrade"
                      onClick={() => handleToggleUpgradeForms(1)}
                    >
                      <CreateIcon />
                    </div>
                  )}
                <UpgradePopup
                  open={toggleUpgradeForms[1]}
                  handleToggleUpgradeForm={handleToggleUpgradeForms}
                  playerData={props.players[props.currentStatus.currentPlayer]}
                  upgradeId={1}
                  handleUpgradeChange={props.handleUpgradeChange}
                />
              </td>
              <td>
                <b>Kniffel</b>
                {props.currentStatus.currentTurn === 0 &&
                  props.players[props.currentStatus.currentPlayer]
                    .points[11] === -1 && (
                    <div
                      className="table--div-upgrade"
                      onClick={() => handleToggleUpgradeForms(2)}
                    >
                      <CreateIcon />
                    </div>
                  )}
                <UpgradePopup
                  open={toggleUpgradeForms[2]}
                  handleToggleUpgradeForm={handleToggleUpgradeForms}
                  playerData={props.players[props.currentStatus.currentPlayer]}
                  upgradeId={2}
                  handleUpgradeChange={props.handleUpgradeChange}
                />
              </td>
              <td>
                <b>Chance</b>
              </td>
              <td>
                <b>Gesamt</b>
              </td>
            </tr>
            {playerColumns}
          </tbody>
        </table>
      )}
    </div>
  );
}
