import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Paper,
  Avatar,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  Container,
} from "@mui/material";
import {
  School,
  Person,
  Dashboard,
  BarChart,
  Quiz,
  Notifications,
  TrendingUp,
  Assessment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const stats = [
    { label: "Active Quizzes", value: "24", icon: Quiz, color: "#3f51b5" },
    { label: "Total Students", value: "843", icon: School, color: "#f44336" },
    {
      label: "Completion Rate",
      value: "78%",
      icon: TrendingUp,
      color: "#4caf50",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f5f7fa", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Full-width Header */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#3f51b5",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Dashboard sx={{ color: "white", mr: 1, fontSize: 30}} />
          <Typography variant="h5"sx={{ color: "white", fontWeight: 600,  }}>
            Haaga-Helia Quiz App
          </Typography>
        </Box>
        <IconButton sx={{ color: "white" }}>
          <Notifications />
        </IconButton>
      </Paper>

      <Container maxWidth="lg" sx={{ flex: 1, py: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome to Quiz Application
          </Typography>
          <Typography color="text.secondary" variant="h6">
            Your comprehensive learning management system
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}20`,
                    color: stat.color,
                    width: 60,
                    height: 60,
                    mr: 2,
                  }}
                >
                  <stat.icon />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dashboard Cards Section */}
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Choose Your Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* Teacher Dashboard */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <Box
                sx={{
                  bgcolor: "primary.main",
                  height: 160,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Person sx={{ color: "white", fontSize: 80 }} />
              </Box>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Teacher Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BarChart sx={{ color: "primary.main", mr: 1 }} />
                    <Typography>Performance analytics</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Quiz sx={{ color: "primary.main", mr: 1 }} />
                    <Typography>Create quizzes</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Assessment sx={{ color: "primary.main", mr: 1 }} />
                    <Typography>Track progress</Typography>
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/teacher")}
                >
                  Go to Teacher Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Student Dashboard */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
              }}
            >
              <Box
                sx={{
                  bgcolor: "secondary.main",
                  height: 160,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Person sx={{ color: "white", fontSize: 80 }} />
              </Box>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  Student Dashboard
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={1}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Quiz sx={{ color: "secondary.main", mr: 1 }} />
                    <Typography>Take quizzes</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUp sx={{ color: "secondary.main", mr: 1 }} />
                    <Typography>Track your progress</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <School sx={{ color: "secondary.main", mr: 1 }} />
                    <Typography>Learning resources</Typography>
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3 }}
                  onClick={() => navigate("/student-dashboard")}
                >
                  Go to Student Dashboard
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Paper
        sx={{
          mt: "auto",
          p: 2,
          borderRadius: 0,
          background: "#3f51b5",
          color: "white",
          textAlign: "center",
        }}
        elevation={3}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Haaga-Helia Quiz App. All rights reserved.
        </Typography>
      </Paper>
    </Box>
  );
}
