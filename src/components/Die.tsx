import diceImages from "../diceImages";
export default function Die(props: any) {
  return (
    <div
      onClick={() => props.holdDie(props.die.id)}
      className={props.die.isHeld ? "die--held die" : "die"}
    >
      <img src={diceImages[props.die.value - 1]} width="100%" />
    </div>
  );
}
