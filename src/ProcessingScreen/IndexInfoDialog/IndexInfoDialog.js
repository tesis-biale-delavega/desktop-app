import React from "react";
import BasicDialog from "../../BasicDialog/BasicDialog";
import { Stack, Typography } from "@mui/material";

const IndexInfoDialog = ({ open, setShowIndexInfoDialog, indexData }) => {
  const handleIndexInfoClose = () => {
    setShowIndexInfoDialog(false);
  };

  return (
    <BasicDialog
      open={open}
      handleClose={handleIndexInfoClose}
      title={indexData?.name}
      content={() => (
        <Stack>
          <Stack mt={2}>
            <Typography variant={"subtitle1"}>Descripción</Typography>
            <Typography variant={"body2"} color={"#cacaca"} mt={2}>
              {indexData?.info?.description}
            </Typography>
          </Stack>
          {indexData?.info?.interpretation && (
            <Stack mt={2}>
              <Typography variant={"subtitle1"}>Como interpretarlo</Typography>
              <Typography variant={"body2"} color={"#cacaca"} mt={2}>
                {indexData?.info?.interpretation}
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    />
  );
};

export default IndexInfoDialog;
