import {Box, Button, Container} from "@mui/material";
import {setProjectPath, setStitchingData} from "../../analysis/analysisSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "react-query";
import * as http from "../../utils/http";

const PreStitchingSideBarOptions = ({setOverlayImageData, setProcessingState, processingStates}) => {
    const dispatch = useDispatch();
    const folderPath = useSelector((state) => state.analysis.folderPath);

    const startAnalysisMutation = useMutation((body) => {
        return http.post(`analysis`, body);
    });

    const handleStartProcessing = () => {
        const body = {
            path: folderPath,
            name: "algo", //TODO: add a field to enter a name here?
        };
        startAnalysisMutation.mutate(body, {
            onSuccess: (res) => {
                const overlayImageData = {imageUrl: res.orthophoto_path, coords: res.coords.rgb_points}
                setOverlayImageData(overlayImageData);
                dispatch(setStitchingData(res))
                dispatch(setProjectPath(res.project_path));
                setProcessingState(processingStates.INDEX_GENERATOR);
            },
            onError: (error) => {
                console.log("error", error);
            },
        });
    };

  return (
    <Box m={2}>
        <Container>
            <Button
                variant={"contained"}
                size={"small"}
                onClick={handleStartProcessing}
            >
                Start processing
            </Button>
        </Container>
    </Box>
  );
};

export default PreStitchingSideBarOptions;
