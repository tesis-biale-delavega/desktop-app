import BasicDialog from "../../BasicDialog/BasicDialog";
import {Typography} from "@mui/material";

const IndexInfoDialog = ({ open, setShowIndexInfoDialog, indexData }) => {
  const handleIndexInfoClose = () => {
    setShowIndexInfoDialog(false);
  };

  return <BasicDialog open={open} handleClose={handleIndexInfoClose} title={indexData?.name} content={() => <Typography>
    {indexData?.info}
  </Typography>}/>;
};

export default IndexInfoDialog;
