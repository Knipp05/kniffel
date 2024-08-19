import diceImages from "../diceImages";
import Checkbox from "@mui/material/Checkbox";
export default function UpgradeCheckbox(props: any) {
  return (
    <Checkbox
      checked={props.upgradeStatus}
      onChange={() =>
        props.handleUpgradeChange(props.upgradeId, props.configId)
      }
    ></Checkbox>
  );
}
