import { CircularProgress, Grid } from "@mui/material";


const LoaderSpinner = () => <Grid
  sx={{ height: "auto", width: "auto" }}
  container
  direction="row"
  justifyContent="center"
  alignItems="center"
>
  <CircularProgress />
</Grid>

export default LoaderSpinner;
