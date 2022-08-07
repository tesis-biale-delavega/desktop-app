import {Box, Button, Checkbox, Container, FormControlLabel, FormGroup, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {useMutation} from "react-query";
import * as http from "../../utils/http";
import {useDispatch, useSelector} from "react-redux";
import {setGeneratedIndexes} from "../../analysis/analysisSlice";

const IndexGeneratorSideBarOptions = ({setProcessingState, processingStates}) => {
    const dispatch = useDispatch()
    const projectPath = useSelector((state) => state.analysis.projectPath);

    const indexes = [
        { name: "BNDVI", value: "bndvi", selected: false },
        { name: "NDVI", value: "ndvi", selected: false },
        { name: "NDRE", value: "ndre", selected: false },
        { name: "VARI", value: "vari", selected: false },
    ];

    const [indexesData, setIndexesData] = useState(indexes);

    const handleIndexChange = (indexName, e) => {
        const target = e.target;
        const checked = target.checked;

        const indexesUpdated = indexesData.map((oldIndex) =>
            oldIndex.name === indexName
                ? {
                    ...oldIndex,
                    selected: checked,
                }
                : oldIndex
        );
        setIndexesData(indexesUpdated);
    };

    const generateIndexesMutation = useMutation((body) => {
        return http.post(`index`, body);
    });

    const onGenerateIndexesPress = () => {
        const selectedIndexes = indexesData.filter(index => index.selected)
        const body = {
            project_path: projectPath,
            indexes: selectedIndexes
                .map((index) => index.value),
            custom_indexes: [],
        };
        dispatch(setGeneratedIndexes(selectedIndexes))
        generateIndexesMutation.mutate(body, {
            onSuccess: (res) => {
                console.log("res", res);
                setProcessingState(processingStates.INDEX_VISUALIZATION_HEATMAP);
            },
            onError: (error) => {
                console.log("error", error);
            },
        });
    };

    return (
        <Box m={2} flexGrow={1}>
            <Stack justifyContent={"space-between"} height={"100%"}>
                <div>
                    <Container>
                        <Typography>Index Generator</Typography>
                    </Container>
                    <Typography>Indexes</Typography>
                    <FormGroup>
                        {indexesData.map((index) => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={index.selected}
                                        onChange={(e) => handleIndexChange(index.name, e)}
                                    />
                                }
                                label={index.name}
                            />
                        ))}
                    </FormGroup>
                </div>
                <Button
                    variant={"contained"}
                    size={"small"}
                    onClick={onGenerateIndexesPress}
                >
                    Generate
                </Button>
            </Stack>
        </Box>
    );
};

export default IndexGeneratorSideBarOptions;