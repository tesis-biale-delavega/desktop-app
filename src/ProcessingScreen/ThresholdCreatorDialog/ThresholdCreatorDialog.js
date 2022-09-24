import FormDialog from "../../FormDialog/FormDialog";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState } from "react";
import { Box, Slider } from "@mui/material";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { useDispatch } from "react-redux";
import { setProcessingIsLoading } from "../../analysis/analysisSlice";

const ThresholdCreatorDialog = ({
  isOpen,
  handleClose,
  layerData,
  availableLayers,
  setAvailableLayers,
  onLayerClick,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([0.2, 0.8]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const thresholdMutation = useMutation((body) => {
    return http.post(`threshold`, body);
  });

  const handleThresholdSend = () => {
    const body = {
      path: layerData.imageVector,
      threshold_max: value[1],
      threshold_min: value[0],
    };
    dispatch(setProcessingIsLoading(true));
    thresholdMutation.mutate(body, {
      onSuccess: (res) => {
        const layerName =
          layerData.name + "_THRESHOLD_" + value[0] + "_" + value[1];
        const imageUrl = res.zone;
        const thresholdData = {
          name: layerName,
          imageUrl: imageUrl,
        };
        setAvailableLayers([...availableLayers, thresholdData]);
        onLayerClick(thresholdData);
        handleClose();
        dispatch(setProcessingIsLoading(false));
      },
      onError: (error) => {
        console.log("error", error);
        dispatch(setProcessingIsLoading(false));
      },
    });
  };

  return (
    <FormDialog
      open={isOpen}
      handleClose={handleClose}
      handleConfirm={handleThresholdSend}
      title={"Threshold Creator"}
      content={() => (
        <div>
          <DialogContentText sx={{ color: "#fff" }}>
            Threshold
          </DialogContentText>
          <Box mt={4} sx={{ width: 300 }}>
            <Slider
              getAriaLabel={() => "Threshold"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay={"auto"}
              step={0.1}
              min={0}
              max={1}
            />
          </Box>
        </div>
      )}
    />
  );
};

export default ThresholdCreatorDialog;
