import React from "react";
import { Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
export default function PlayerForm(props: any) {
  const [nameInput, setNameInput] = React.useState("");
  const [totalPlayerNumber, setTotalPlayerNumber] = React.useState(0);
  const showMessage = () => {
    if (totalPlayerNumber === 0) {
      return <h3>Gib einen Spielernamen ein:</h3>;
    } else if (totalPlayerNumber < 4) {
      return <h3>Weitere Spieler hinzufügen?</h3>;
    } else {
      return <h3>Maximal vier Spieler möglich!</h3>;
    }
  };
  const playerList = props.players.map((player: any) => (
    <li key={player.name}>
      <b>{player.name}</b>
    </li>
  ));
  function handleInput(event: any) {
    setNameInput(event.target.value);
  }
  function addPlayer(name: string): void {
    if (name.length > 0) {
      if (props.players[0].name === "") {
        props.setPlayers((oldPlayers: any) => {
          let newPlayer = { ...oldPlayers[0], name: name };
          return [newPlayer];
        });
      } else {
        props.setPlayers((oldPlayers: any) => [
          ...oldPlayers,
          {
            name: name,
            id: oldPlayers.length,
            points: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0],
            upgrades: [
              [true, true, true],
              [true, true],
              [true, true, true, true, true, true],
            ],
          },
        ]);
      }
      setTotalPlayerNumber((oldNumber) => oldNumber + 1);
      setNameInput("");
    }
  }
  // Cleanup function für EventListener nötig!
  return (
    <div className="playerform">
      {showMessage()}
      {totalPlayerNumber < 4 && (
        <form>
          <input
            type="text"
            placeholder="Namen eingeben"
            name="name"
            onChange={handleInput}
            value={nameInput}
            maxLength={10}
            id="playerForm--input"
          />

          <Button
            variant="contained"
            onClick={(event: any) => {
              event.preventDefault();
              addPlayer(nameInput);
            }}
          >
            <PersonAddIcon />
            weiter
          </Button>
        </form>
      )}
      {totalPlayerNumber > 0 && (
        <Button
          variant="contained"
          onClick={() => props.setGameStatus("started")}
          id="playerform--start"
        >
          Spiel starten
        </Button>
      )}
      <ul className="playerform--ul">{playerList}</ul>
    </div>
  );
}
