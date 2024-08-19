import "../style.css";
export default function PlayerSheet(props: any) {
  function checkValidPoints(pointId: number): number | false {
    if (
      props.playerData.id === props.currentStatus.currentPlayer &&
      props.playerData.points[pointId] === -1 &&
      props.gameStatus === "started"
    ) {
      switch (pointId) {
        case 0:
          return props.diceValues[0] > 0 ? props.diceValues[0] : 0;
        case 1:
          return props.diceValues[1] > 0 ? props.diceValues[1] * 2 : 0;
        case 2:
          return props.diceValues[2] > 0 ? props.diceValues[2] * 3 : 0;
        case 3:
          return props.diceValues[3] > 0 ? props.diceValues[3] * 4 : 0;
        case 4:
          return props.diceValues[4] > 0 ? props.diceValues[4] * 5 : 0;
        case 5:
          return props.diceValues[5] > 0 ? props.diceValues[5] * 6 : 0;
        case 6: //Dreierpasch
          return props.diceValues.includes(3) ||
            props.diceValues.includes(4) ||
            props.diceValues.includes(5)
            ? sumUpDice()
            : 0;
        case 7: //Viererpasch
          return props.diceValues.includes(4) || props.diceValues.includes(5)
            ? sumUpDice()
            : 0;
        case 8: //Full House
          return props.diceValues.includes(2) && props.diceValues.includes(3)
            ? 25
            : 0;
        case 9: //Kleine Straße
          return calcStrasse(4);
        case 10: //Große Straße
          return calcStrasse(5);
        case 11: //Kniffel
          return props.diceValues.includes(5) ? 50 : 0;
        case 12:
          return sumUpDice();
        default:
          return false;
      }
    } else return false;
  }
  function givePoints(pointId: number): void {
    let validPoints = checkValidPoints(pointId);
    if (validPoints !== false && validPoints > 0) {
      props.addPoints(props.playerData.id, pointId, validPoints);
      props.nextPlayer();
    } else if (validPoints !== false && validPoints === 0) {
      if (props.currentStatus.currentTurn > 0) {
        props.addPoints(props.playerData.id, pointId, validPoints);
        props.nextPlayer();
      }
    }
  }
  function style(pointId: number): string {
    let validPoints = checkValidPoints(pointId);
    if (validPoints && validPoints > 0) {
      return "playerSheet--contains";
    } else if (props.playerData.points[pointId] === 0) {
      return "playerSheet--blocked";
    } else if (props.playerData.points[pointId] > 0) return "playerSheet--done";
    else return "playerSheet--nothing";
  }
  function showPoints(pointId: number): number {
    let validPoints = checkValidPoints(pointId);
    if (validPoints && validPoints > 0) {
      return validPoints;
    } else if (props.playerData.points[pointId] === -1) {
      return 0;
    } else return props.playerData.points[pointId];
  }
  function calcStrasse(strasseSize: number): number {
    let possiblePoints = strasseSize === 4 ? 30 : 40;
    let streak = 0;
    let firstIndex = 0;
    let lastIndex = 5;
    if (strasseSize === 4) {
      !props.playerData.upgrades[0][0] ? (firstIndex = 1) : 0;
      !props.playerData.upgrades[0][1] ? 0 : 0; // TODO!!!
      !props.playerData.upgrades[0][2] ? (lastIndex = 4) : 0;
      props.playerData.upgrades[0].map((upgrade: boolean) =>
        !upgrade ? (possiblePoints += 5) : 0
      );
    }
    if (strasseSize === 5) {
      !props.playerData.upgrades[1][0] ? (firstIndex = 1) : 0;
      !props.playerData.upgrades[1][1] ? (lastIndex = 4) : 0;
      props.playerData.upgrades[1].map((upgrade: boolean) =>
        !upgrade ? (possiblePoints += 10) : 0
      );
    }
    for (let i = firstIndex; i <= lastIndex; i++) {
      if (props.diceValues[i] > 0) streak += 1;
      else streak = 0;
      if (streak === strasseSize) return possiblePoints;
    }
    return 0;
  }
  function sumUpDice(): number {
    let sum = 0;
    for (let i = 0; i <= 5; i++) {
      sum = sum + props.diceValues[i] * (i + 1);
    }
    return sum;
  }
  return (
    <tr>
      <td
        className={
          props.playerData.id === props.currentStatus.currentPlayer
            ? "playerSheet--active"
            : ""
        }
      >
        <b>{props.playerData.name}</b>
      </td>
      <td className={style(0)} onClick={() => givePoints(0)}>
        {showPoints(0)}
      </td>
      <td className={style(1)} onClick={() => givePoints(1)}>
        {showPoints(1)}
      </td>
      <td className={style(2)} onClick={() => givePoints(2)}>
        {showPoints(2)}
      </td>
      <td className={style(3)} onClick={() => givePoints(3)}>
        {showPoints(3)}
      </td>
      <td className={style(4)} onClick={() => givePoints(4)}>
        {showPoints(4)}
      </td>
      <td className={style(5)} onClick={() => givePoints(5)}>
        {showPoints(5)}
      </td>
      <td>
        {props.playerData.points[13]}{" "}
        {props.calcUpperPoints(props.playerData.id) < 63
          ? `(${63 - props.calcUpperPoints(props.playerData.id)})`
          : ""}
      </td>
      <td className={style(6)} onClick={() => givePoints(6)}>
        {showPoints(6)}
      </td>
      <td className={style(7)} onClick={() => givePoints(7)}>
        {showPoints(7)}
      </td>
      <td className={style(8)} onClick={() => givePoints(8)}>
        {showPoints(8)}
      </td>
      <td className={style(9)} onClick={() => givePoints(9)}>
        {showPoints(9)}
        {showPoints(9) > 0 && showPoints(9) !== 30 ? "*" : ""}
      </td>
      <td className={style(10)} onClick={() => givePoints(10)}>
        {showPoints(10)}
        {showPoints(10) > 0 && showPoints(10) !== 40 ? "*" : ""}
      </td>
      <td className={style(11)} onClick={() => givePoints(11)}>
        {showPoints(11)}
        {showPoints(11) > 0 && showPoints(11) !== 50 ? "*" : ""}
      </td>
      <td className={style(12)} onClick={() => givePoints(12)}>
        {showPoints(12)}
      </td>
      <td>{props.sumPlayerPoints(props.playerData.id)}</td>
    </tr>
  );
}
