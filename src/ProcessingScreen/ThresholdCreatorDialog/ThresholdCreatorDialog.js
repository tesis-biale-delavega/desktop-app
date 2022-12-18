import FormDialog from "../../FormDialog/FormDialog";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useState } from "react";
import { Box, Slider } from "@mui/material";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import {
  setGeneratedIndexes,
  setProcessingIsLoading,
} from "../../analysis/analysisSlice";

const ThresholdCreatorDialog = ({
  isOpen,
  handleClose,
  layerData,
  availableLayers,
  setAvailableLayers,
  onLayerClick,
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState([-0.8, 0.8]);
  const generatedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );
  const processingIsLoading = useSelector(
      (state) => state.analysis.processingIsLoading
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const thresholdMutation = useMutation((body) => {
    return http.post(`/python-api/threshold`, body);
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
          layerData.name + "_" + value[0] + "-" + value[1];
        const imageUrl = res.zone;
        const thresholdData = {
          name: layerName,
          imageUrl: imageUrl,
        };
        setAvailableLayers([...availableLayers, thresholdData]);
        dispatch(
          setGeneratedIndexes([
            ...generatedIndexes,
            {
              index: thresholdData.name,
              path: thresholdData.imageUrl,
            },
          ])
        );
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
      handleClose={() => !processingIsLoading && handleClose()}
      handleConfirm={handleThresholdSend}
      disableCancel={processingIsLoading}
      disableConfirm={processingIsLoading}
      title={"Crear un threshold"}
      content={() => (
        <div>
          <DialogContentText sx={{ color: "#fff" }} mt={2}>
            Threshold
          </DialogContentText>
          <Box mt={6} sx={{ width: 400 }}>
            <Slider
              getAriaLabel={() => "Threshold"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay={"on"}
              step={0.1}
              min={-1}
              max={1}
              disabled={processingIsLoading}
            />
          </Box>
        </div>
      )}
    />
  );
};

export default ThresholdCreatorDialog;
