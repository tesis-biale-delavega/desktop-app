import { Box, Button, Container } from "@mui/material";
import {
  setProcessingIsLoading,
  setProcessingState,
  setProjectFolderAlreadyCreated,
  setProjectPath,
  setStitchingData,
} from "../../analysis/analysisSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { processingStates } from "../../utils/processingStates";
import {toast} from "react-toastify";

const PreStitchingSideBarOptions = ({ setOverlayImageData }) => {
  const dispatch = useDispatch();
  const folderPath = useSelector((state) => state.analysis.folderPath);
  const projectName = useSelector((state) => state.analysis.projectName);

  const startAnalysisMutation = useMutation((body) => {
    return http.post(`analysis`, body);
  });

  const handleStartProcessing = () => {
    const body = {
      path: folderPath,
      name: projectName,
    };
    dispatch(setProcessingIsLoading(true))
    startAnalysisMutation.mutate(body, {
      onSuccess: (res) => {
        const overlayImageData = {
          imageUrl: res.orthophoto_path,
          centerCoords: [res.coords.avg_rgb_lat, res.coords.avg_rgb_long],
          imageCoords: res.coords.rgb_points,
        };
        setOverlayImageData(overlayImageData);
        dispatch(setStitchingData(res));
        dispatch(setProjectPath(res.project_path));
        dispatch(setProcessingState(processingStates.INDEX_GENERATOR));
        dispatch(setProjectFolderAlreadyCreated(true));
        dispatch(setProcessingIsLoading(false))
      },
      onError: (error) => {
        console.log("error", error);
        dispatch(setProcessingIsLoading(false))
      },
    });
    toast.success("Proyecto creado y guardado con exito!")
  };

  return (
    <Box m={2}>
      <Container>
        <Button
          variant={"contained"}
          size={"small"}
          onClick={handleStartProcessing}
        >
          Empezar procesamiento
        </Button>
      </Container>
    </Box>
  );
};

export default PreStitchingSideBarOptions;
