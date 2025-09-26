import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Fab,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';

import { Add as AddIcon, Star as StarIcon } from '@mui/icons-material';

const HomePage: React.FC = () => {
  const [showAlert, setShowAlert] = React.useState(false);

  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to Material-UI
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" paragraph>
        This is a React TypeScript project with Material-UI components.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
          onClick={() => setShowAlert(true)}
        >
          Show Alert
        </Button>
        <Button variant="outlined" color="secondary">
          Secondary Action
        </Button>
      </Box>

      {showAlert && (
        <Alert
          severity="success"
          onClose={() => setShowAlert(false)}
          sx={{ mb: 3 }}
        >
          This is a success alert — check it out!
        </Alert>
      )}

      <Grid spacing={3} container sx={{ mb: 4 }}>  {/* parent grid */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>  
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Feature 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is a sample card demonstrating Material-UI components
                with TypeScript.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button size="small" startIcon={<StarIcon />}>
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Feature 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Another example card showing responsive grid layout
                and consistent styling.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button size="small" startIcon={<StarIcon />}>
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Feature 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Third card demonstrating the power of Material-UI's
                grid system and theming.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button size="small" startIcon={<StarIcon />}>
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid spacing={3} container>  {/* parent grid */}
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>  
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Feature 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This is a sample card demonstrating Material-UI components
                with TypeScript.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button size="small" startIcon={<StarIcon />}>
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Feature 2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Another example card showing responsive grid layout
                and consistent styling.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button size="small" startIcon={<StarIcon />}>
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Feature 3
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Third card demonstrating the power of Material-UI's
                grid system and theming.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Button size="small" startIcon={<StarIcon />}>
                  Learn More
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default HomePage;
