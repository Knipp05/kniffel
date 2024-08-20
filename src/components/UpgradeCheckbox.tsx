import Checkbox from "@mui/material/Checkbox";
export default function UpgradeCheckbox(props: any) {
  const getDesc = () => {
    switch (props.upgradeId) {
      case 0:
        var config = ["1, 2, 3, 4", "2, 3, 4, 5", "3, 4, 5, 6"];
        return config[props.configId];
      case 1:
        var config = ["1, 2, 3, 4, 5", "2, 3, 4, 5, 6"];
        return config[props.configId];
      case 2:
        var config = [
          "1, 1, 1, 1, 1",
          "2, 2, 2, 2, 2",
          "3, 3, 3, 3, 3",
          "4, 4, 4, 4, 4",
          "5, 5, 5, 5, 5",
          "6, 6, 6, 6, 6",
        ];
        return config[props.configId];
    }
  };
  return (
    <div>
      <Checkbox
        checked={props.upgradeStatus}
        onChange={() =>
          props.handleUpgradeChange(props.upgradeId, props.configId)
        }
      ></Checkbox>
      {getDesc()}
    </div>
  );
}
