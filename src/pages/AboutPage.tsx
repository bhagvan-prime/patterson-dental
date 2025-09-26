import React from 'react';
import {
  Typography,
  Paper,
  Box,
  Chip,
  Stack,
} from '@mui/material';

const AboutPage: React.FC = () => {
  const technologies = [
    'React',
    'TypeScript',
    'Material-UI',
    'React Router',
    'Emotion',
  ];

  return (
    <Box>
      <Typography variant="h2" component="h1" gutterBottom>
        About This Project
      </Typography>
      
      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Technologies Used
        </Typography>
        <Typography paragraph>
          This project demonstrates a modern React application built with
          TypeScript and Material-UI components.
        </Typography>
        
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              color="primary"
              variant="outlined"
            />
          ))}
        </Stack>
      </Paper>

      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Features
        </Typography>
        <Typography component="div">
          <ul>
            <li>Responsive design with Material-UI</li>
            <li>TypeScript for type safety</li>
            <li>React Router for navigation</li>
            <li>Custom theme configuration</li>
            <li>Mobile-friendly layout</li>
            <li>Modern React patterns and hooks</li>
          </ul>
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutPage;