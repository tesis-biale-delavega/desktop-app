import React, {useCallback, useState} from "react";
import {Box, Button, Container, Typography} from "@mui/material";
import {
    setProcessingIsLoading,
    setProcessingState,
    setProjectFolderAlreadyCreated,
    setProjectPath,
    setStitchingData,
} from "../../analysis/analysisSlice";
import {useDispatch, useSelector} from "react-redux";
import {useMutation} from "react-query";
import * as http from "../../utils/http";
import {processingStates} from "../../utils/processingStates";
import {toast} from "react-toastify";
import {useStream} from 'react-fetch-streams';
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import settings from "../../settings.json";

const PreStitchingSideBarOptions = ({setOverlayImageData}) => {
    const dispatch = useDispatch();
    const folderPath = useSelector((state) => state.analysis.folderPath);
    const projectName = useSelector((state) => state.analysis.projectName);
    const processingIsLoading = useSelector(
        (state) => state.analysis.processingIsLoading
    );
    const [progress, setProgress] = useState({});

    const startAnalysisMutation = useMutation((body) => {
        return http.post(`/python-api/analysis`, body);
    });

    const handleProgress = useCallback(async res => {
        const data = await res.json();
        if (!data.error)
            setProgress(data);
    }, [setProgress]);
    useStream('/python-api/progress', {onNext: handleProgress});

    const handleStartProcessing = () => {
        const body = {
            path: folderPath,
            name: projectName,
        };
        dispatch(setProcessingIsLoading(true));
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
                dispatch(setProcessingIsLoading(false));
            },
            onError: (error) => {
                console.log("error", error);
                dispatch(setProcessingIsLoading(false));
            },
        });
        toast.success("Proyecto creado y guardado con exito!");
    };

    console.log(progress)

    const shouldRenderRGB = progress.rgb && progress.rgb.progress !== 0;
    const shouldRenderMultispectral = progress.multispectral && progress.multispectral.progress !== 0;

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
            {processingIsLoading &&
                <Container>
                    {shouldRenderRGB ? 'RGB' : shouldRenderMultispectral ? 'RGB Completo' : 'Comenzando análisis RGB'}
                    <LinearProgressWithLabel value={shouldRenderMultispectral ? 100 : progress.rgb?.progress}
                                             variant={shouldRenderRGB || shouldRenderMultispectral ? 'determinate' : 'indeterminate'}/>
                    {shouldRenderRGB && <Typography variant="body2" color="textSecondary">{`${Math.round(
                        progress.rgb?.progress
                    )}%`}</Typography>}
                </Container>
            }
            {processingIsLoading &&
                <Container>
                    {shouldRenderMultispectral ? 'MULTISPECTRAL' : 'Comenzando análisis MULTIESPECTRAL'}
                    <LinearProgressWithLabel value={progress.multispectral?.progress}
                                             variant={shouldRenderMultispectral ? 'determinate' : 'indeterminate'}/>
                    {shouldRenderMultispectral && <Typography variant="body2" color="textSecondary">{`${Math.round(
                        progress.multispectral?.progress
                    )}%`}</Typography>}
                </Container>
            }
        </Box>
    );
};

export default PreStitchingSideBarOptions;
