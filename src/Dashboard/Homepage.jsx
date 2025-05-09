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
  People,
  ManageAccounts,
  TrackChanges,
  AdminPanelSettings,
  Add,
  Group,
  Assignment,
  LibraryBooks
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const stats = [
    { label: "Active Quizzes", value: "24", icon: Quiz, color: "#3f51b5" },
    { label: "Total Students", value: "843", icon: School, color: "#f44336" },
    { label: "Completion Rate", value: "78%", icon: TrendingUp, color: "#4caf50" },
  ];

  return (
    <Box sx={{ 
      bgcolor: "#f5f7fa", 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      backgroundImage: "linear-gradient(to bottom, #f5f7fa 0%, #e4e8eb 100%)"
    }}>
      {/* App Bar */}
      <Paper elevation={3} sx={{
        p: 2,
        borderRadius: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "linear-gradient(135deg, #3f51b5 0%, #283593 100%)",
        boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Dashboard sx={{ color: "white", mr: 2, fontSize: 32,}} />
          <Typography variant="h5" sx={{ 
            color: "white", 
            fontWeight: 700,
            letterSpacing: "0.5px",
            fontSize: "1.5rem",
            textAlign: "center"

            

            
          }}>
            Haaga-Helia Quiz Platform
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton sx={{ color: "white" }}>
            <Notifications />
          </IconButton>
          <Avatar sx={{ ml: 2, bgcolor: "white", color: "#3f51b5" }}>AD</Avatar>
        </Box>
      </Paper>

      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        {/* Hero Section */}
        <Box sx={{ 
          mb: 6,
          textAlign: "center",
          background: "white",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 8px 16px 0 rgba(0,0,0,0.05)"
        }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 800, 
            mb: 2,
            background: "linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "2rem", sm: "3rem" }
          }}>
            Welcome to Quiz Application
          </Typography>
          <Typography variant="h5" sx={{ 
            color: "text.secondary",
            fontWeight: 400,
            maxWidth: "800px",
            mx: "auto",
            fontSize: { xs: "1rem", sm: "1.5rem" }
          }}>
            Your comprehensive learning management system for modern education
          </Typography>
        </Box>

        {/* Stats Section */}
        <Grid container spacing={3} sx={{ 
          mb: 6,
          justifyContent: "center"
           }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper elevation={0} sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                background: "white",
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px 0 rgba(0,0,0,0.08)"
                }
              }}>
                <Avatar sx={{
                  bgcolor: `${stat.color}10`,
                  color: stat.color,
                  width: 64,
                  height: 64,
                  mr: 3,
                }}>
                  <stat.icon sx={{ fontSize: 32 }} />
                </Avatar>
                <Box>
                  <Typography variant="h3" sx={{ 
                    fontWeight: 700,
                    lineHeight: 1.2,
                    mb: 0.5
                  }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Dashboard Section */}
        <Typography variant="h4" sx={{ 
          fontWeight: 700, 
          mb: 4,
          marginTop: 10,
          textAlign: "center",
          color: "#2c3e50"
        
        }}>
          Choose Your Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Admin Dashboard */}
          <Grid item xs={12} md={4}>
            <Card sx={{
              borderRadius: 3,
              transition: "all 0.3s ease",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "none",
              boxShadow: "0 8px 24px 0 rgba(0,0,0,0.08)",
              "&:hover": { 
                transform: "translateY(-8px)", 
                boxShadow: "0 12px 28px 0 rgba(0,0,0,0.12)"
              }
            }}>
              <Box sx={{
                height: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #3f51b5 0%, #5c6bc0 100%)"
              }}>
                <AdminPanelSettings sx={{ 
                  color: "white", 
                  fontSize: 80,
                  opacity: 0.9
                }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  color: "#2c3e50"
                }}>
                  Admin Dashboard
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Add sx={{ color: "#3f51b5", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Add New Teachers</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Group sx={{ color: "#3f51b5", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Manage All Users</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrackChanges sx={{ color: "#3f51b5", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">System Analytics</Typography>
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: "auto",
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem"
                  }}
                  onClick={() => navigate("/Admin")}
                >
                  Access Admin Panel
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Teacher Dashboard */}
          <Grid item xs={12} md={4}>
            <Card sx={{
              borderRadius: 3,
              transition: "all 0.3s ease",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "none",
              boxShadow: "0 8px 24px 0 rgba(0,0,0,0.08)",
              "&:hover": { 
                transform: "translateY(-8px)", 
                boxShadow: "0 12px 28px 0 rgba(0,0,0,0.12)"
              }
            }}>
              <Box sx={{
                height: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #ff7043 0%, #ff8a65 100%)"
              }}>
                <Person sx={{ 
                  color: "white", 
                  fontSize: 80,
                  opacity: 0.9
                }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  color: "#2c3e50"
                }}>
                  Teacher Dashboard
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Assignment sx={{ color: "#ff7043", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Create Quizzes</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <BarChart sx={{ color: "#ff7043", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Performance Analytics</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Assessment sx={{ color: "#ff7043", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Track Student Progress</Typography>
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ 
                    mt: "auto",
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem",
                    bgcolor: "#ff7043",
                    "&:hover": { bgcolor: "#f4511e" }
                  }}
                  onClick={() => navigate("/Teacher")}
                >
                  Access Teacher Panel
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Student Dashboard */}
          <Grid item xs={12} md={4}>
            <Card sx={{
              borderRadius: 3,
              transition: "all 0.3s ease",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              border: "none",
              boxShadow: "0 8px 24px 0 rgba(0,0,0,0.08)",
              "&:hover": { 
                transform: "translateY(-8px)", 
                boxShadow: "0 12px 28px 0 rgba(0,0,0,0.12)"
              }
            }}>
              <Box sx={{
                height: 180,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #66bb6a 0%, #81c784 100%)"
              }}>
                <School sx={{ 
                  color: "white", 
                  fontSize: 80,
                  opacity: 0.9
                }} />
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                  color: "#2c3e50"
                }}>
                  Student Dashboard
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={2} sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Quiz sx={{ color: "#66bb6a", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Take Quizzes</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <TrendingUp sx={{ color: "#66bb6a", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Track Your Progress</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LibraryBooks sx={{ color: "#66bb6a", mr: 2, fontSize: 24 }} />
                    <Typography variant="body1">Learning Resources</Typography>
                  </Box>
                </Stack>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  color="success"
                  sx={{ 
                    mt: "auto",
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: "1rem"
                  }}
                  onClick={() => navigate("/student-dashboard")}
                >
                  Access Student Portal
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Paper sx={{
        mt: "auto",
        p: 3,
        borderRadius: 0,
        background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
        color: "white",
        textAlign: "center",
      }}>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          © {new Date().getFullYear()} Haaga-Helia Quiz Platform. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          Designed for modern education with interactive learning experiences
        </Typography>
      </Paper>
    </Box>
  );
}