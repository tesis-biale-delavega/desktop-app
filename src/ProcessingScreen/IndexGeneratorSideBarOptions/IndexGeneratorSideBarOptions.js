import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import * as http from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import {
  setGeneratedIndexes,
  setIndexesData,
  setProcessingIsLoading,
  setProcessingState,
} from "../../analysis/analysisSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React, { useState } from "react";
import IndexInfoDialog from "../IndexInfoDialog/IndexInfoDialog";
import { processingStates } from "../../utils/processingStates";

const IndexGeneratorSideBarOptions = () => {
  const dispatch = useDispatch();
  const projectPath = useSelector((state) => state.analysis.projectPath);
  const indexesData = useSelector((state) => state.analysis.indexesData);
  const currentGeneratedIndexes = useSelector(
    (state) => state.analysis.generatedIndexes
  );
  const [showIndexInfoDialog, setShowIndexInfoDialog] = useState(false);
  const [indexInfo, setIndexInfo] = useState(undefined);

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
    dispatch(setIndexesData(indexesUpdated));
  };

  const generateIndexesMutation = useMutation((body) => {
    return http.post(`/python-api/index`, body);
  });

  const onGenerateIndexesPress = () => {
    const selectedNormalIndexes = indexesData.filter(
      (index) => !index.formula && index.selected
    );
    const selectedCustomIndexes = indexesData.filter(
      (index) => index.formula && index.selected
    );
    const body = {
      project_path: projectPath,
      indexes: selectedNormalIndexes.map((index) => index.value),
      custom_indexes: selectedCustomIndexes.map((index) => ({
        formula: index.formula,
        name: index.name,
      })),
    };
    dispatch(setProcessingIsLoading(true));
    generateIndexesMutation.mutate(body, {
      onSuccess: (res) => {
        const generatedIndexes = Object.entries(res).map((index) => ({
          index: index[0],
          path: index[1]?.img,
          vector: index[1]?.vector,
        }));
        dispatch(
          setGeneratedIndexes([...currentGeneratedIndexes, ...generatedIndexes])
        );
        dispatch(
          setProcessingState(processingStates.INDEX_VISUALIZATION_HEATMAP)
        );
        dispatch(setProcessingIsLoading(false));
      },
      onError: (error) => {
        console.log("error", error);
        dispatch(setProcessingIsLoading(false));
      },
    });
  };

  const handleCreateCustomIndexClick = () => {
    dispatch(setProcessingState(processingStates.CUSTOM_INDEX_CREATION));
  };

  const handleCustomIndexDelete = (indexData) => {
    const updatedIndexes = indexesData.filter(
      (index) => index.name !== indexData.name
    );
    dispatch(setIndexesData(updatedIndexes));
  };

  const handleIndexInfoClick = (indexData) => {
    setShowIndexInfoDialog(true);
    setIndexInfo(indexData);
  };

  return (
    <Box m={2} flexGrow={1}>
      <Stack justifyContent={"space-between"} height={"100%"}>
        <div>
          <Container>
            <Typography align={"center"}>Generador de Indices</Typography>
          </Container>
          <Typography mt={2}>Indices</Typography>
          <FormGroup>
            {indexesData.map((index) => (
              <Stack justifyContent={"space-between"} direction={"row"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={index.selected}
                      onChange={(e) => handleIndexChange(index.name, e)}
                    />
                  }
                  label={index.name}
                />
                {index.info && (
                  <Button
                    onClick={() => handleIndexInfoClick(index)}
                    sx={{ position: "relative", right: -10 }}
                  >
                    <InfoOutlinedIcon />
                  </Button>
                )}
                {index.formula && (
                  <Button
                    onClick={() => handleCustomIndexDelete(index)}
                    sx={{ position: "relative", right: -10 }}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                )}
              </Stack>
            ))}
          </FormGroup>
          <Link
            component="button"
            variant="body2"
            onClick={handleCreateCustomIndexClick}
            underline={"none"}
            color={"#ffffff"}
          >
            <Typography mt={2} mb={2}>
              Crear indice personalizado
            </Typography>
          </Link>
        </div>
        <Button
          variant={"contained"}
          size={"small"}
          onClick={onGenerateIndexesPress}
        >
          Generar
        </Button>
      </Stack>
      <IndexInfoDialog
        open={showIndexInfoDialog}
        setShowIndexInfoDialog={setShowIndexInfoDialog}
        indexData={indexInfo}
      />
    </Box>
  );
};

export default IndexGeneratorSideBarOptions;
