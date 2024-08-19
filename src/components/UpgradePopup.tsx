import UpgradeCheckbox from "./UpgradeCheckbox";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
export default function UpgradePopup(props: any) {
  const pointName = () => {
    switch (props.upgradeId) {
      case 0:
        return "Kleine Straße";
      case 1:
        return "Große Straße";
      case 2:
        return "Kniffel";
    }
  };
  const upgradeElements = props.playerData.upgrades[props.upgradeId].map(
    (upgrade: any, configId: number) => (
      <UpgradeCheckbox
        key={configId}
        configId={configId}
        handleUpgradeChange={props.handleUpgradeChange}
        upgradeId={props.upgradeId}
        upgradeStatus={upgrade}
      />
    )
  );
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleToggleUpgradeForm(props.upgradeId)}
    >
      <DialogTitle>Upgrade {pointName()}</DialogTitle>
      <DialogContent>
        Wähle via CheckBox die Würfelmöglichkeiten für {pointName()} aus. Je
        weniger Möglichkeiten du zulässt, umso mehr Punkte erhältst du!
        {upgradeElements}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => props.handleToggleUpgradeForm(props.upgradeId)}
        >
          Fertig
        </Button>
      </DialogActions>
    </Dialog>
  );
}
