import Die from "./Die";
import { Button } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
export default function DiceBoard(props: any) {
  const diceElements = props.dice.map(
    (die: any) =>
      die.value > 0 && <Die key={die.id} die={die} holdDie={holdDie} />
  );
  function handleDiceValues(
    dice: { id: number; value: number; isHeld: boolean }[]
  ): void {
    let newDiceValues = [0, 0, 0, 0, 0, 0];
    for (let val = 0; val < 5; val++) {
      let die = dice[val];
      newDiceValues[die.value - 1] += 1;
    }
    props.setDiceValues(newDiceValues);
  }
  function holdDie(id: number): void {
    props.setDice((oldDice: any) =>
      oldDice.map((die: any) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  function rollDice(): void {
    const newDice = props.dice.map((die: any) =>
      die.isHeld ? die : { ...die, value: Math.floor(Math.random() * 6) + 1 }
    );
    props.nextTurn();
    handleDiceValues(newDice);
    props.setDice(newDice);
  }
  return (
    <div className="game">
      {diceElements}
      {props.currentStatus.currentTurn < 3 && (
        <Button variant="contained" onClick={rollDice}>
          <CasinoIcon />
          Würfeln ({3 - props.currentStatus.currentTurn}x)
        </Button>
      )}
    </div>
  );
}
