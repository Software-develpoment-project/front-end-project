import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
import { QuizOutlined, CategoryOutlined } from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();

  const HomeCard = ({ title, icon, path }) => (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        textAlign: "center",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
      onClick={() => navigate(path)}
    >
      {React.cloneElement(icon, {
        sx: {
          fontSize: 80,
          color: "primary.main",
          mb: 2,
        },
      })}
      <Typography variant="h5" component="div">
        {title}
      </Typography>
    </Paper>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        py: 4,
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ mb: 4, textAlign: "center" }}>
        Welcome to Quiz App
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={5}>
          <HomeCard title="Quizzes" icon={<QuizOutlined />} path="/quizzes" />
        </Grid>
        <Grid item xs={12} sm={5}>
          <HomeCard
            title="Categories"
            icon={<CategoryOutlined />}
            path="/categories"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;