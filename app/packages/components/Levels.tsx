import { Stack, Box, IconButton, Chip, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { LevelObject } from "../types";
import LevelTable from "./LevelsTable";

interface Props {
  levelsOfPackage?: LevelObject[];
  setlevelsOfPackage: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldTouched: (field: string, isTouched?: boolean | undefined, shouldValidate?: boolean | undefined) => void
}

const re = /^\d*(\.\d+)?$/;

const LevelInput: FC<Props> = ({ levelsOfPackage, setlevelsOfPackage, setFieldTouched }) => {
  const [percent, setPercent] = useState(0);

  const addNewLevel = () => {
    setFieldTouched('levels', true)
    const packageLevel = { percent, levelNumber: levelsOfPackage?.length ? levelsOfPackage.length + 1 : 1 }
    setlevelsOfPackage('levels', levelsOfPackage ? [...levelsOfPackage, packageLevel] : [packageLevel], true);
  }

  const handleDeleteLevel = (level) => {
    setFieldTouched('levels', true)
    if (levelsOfPackage?.length === 1) {
      setlevelsOfPackage('levels', undefined, true)
    } else {
      const newLevels = levelsOfPackage?.filter(item => item.levelNumber !== level);
      setlevelsOfPackage('levels', newLevels?.map((item, index) => ({ ...item, levelNumber: index + 1 })), true);
    }
  }

  const handleTypingPercent = (event) => {
    setFieldTouched('levels', true)
    const target = event.target.value;
    if (target.match(re)) {
      if (parseInt(target) > 100) {
        setPercent(100)
      } else if (parseInt(target) < 0) {
        setPercent(0)
      } else {
        setPercent(parseInt(target))
      }
    }
  }

  return <Box><Stack direction="row">
    <Box sx={{ width: '5%' }}>
      <TextField
        sx={{
          width: "100%",
          mb: { xs: 4, xl: 6 },
        }}
        disabled
        label="سطح"
        variant="outlined"
        defaultValue={"1"}
        value={levelsOfPackage?.length ? levelsOfPackage.length + 1 : 1}
      />
    </Box>
    <Box sx={{ width: '30%' }}>
      <TextField
        sx={{
          width: "100%",
          mb: { xs: 4, xl: 6 },
        }}
        onChange={(e) => handleTypingPercent(e)}
        variant="outlined"
        value={percent}
        label="درصد"
        type="number"
      />
    </Box>
    <Box sx={{ width: '10%' }}>
      <IconButton onClick={() => addNewLevel()}>
        <AddIcon />
      </IconButton>
    </Box>
  </Stack>
    {levelsOfPackage?.length ? <LevelTable rows={levelsOfPackage} deleteRow={handleDeleteLevel} sx={{ backgroundColor: '#f4f7fe' }} /> : null}
  </Box>
};

LevelInput.defaultProps = { levelsOfPackage: undefined }

export default LevelInput;
