import { Box, IconButton } from "@mui/material";
import AppDialog from "@zhava/core/AppDialog";
import { ObjPackage } from "app/packages/types";
import { FC, useState } from "react";
import LevelsTable from '../LevelsTable';
import MenuIcon from '@mui/icons-material/Menu';

interface LevelProps {
  packages: ObjPackage;
}

const LevelsDetailModal: FC<LevelProps> = ({ packages }) => {
  const [openModal, setModal] = useState(false);
  return <Box key={packages.id}><IconButton color="info" onClick={() => setModal(true)}>
    <MenuIcon />
  </IconButton>
    <AppDialog
      maxWidth="md"
      open={openModal}
      onClose={() => setModal(false)}>
      <Box sx={{ width: '100%', fontSize: '16px', fontWeight: 'bold', mb: 3, mt: 3 }}>{packages.name}</Box>
      <Box sx={{ width: '100%' }}>
        <LevelsTable rows={packages.level} sx={{ width: '100%', backgroundColor: '#f4f7fe' }} />
      </Box>
    </AppDialog>
  </Box>
}

export default LevelsDetailModal;
