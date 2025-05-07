import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Button,
  Divider,
  Card,
  CardContent,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
  Domain as DomainIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const TeacherDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock fetch function to simulate API call
  const fetchTeacher = async () => {
    try {
      setLoading(true);
      // In a real app, this would be: const response = await fetch(`/api/teachers/${id}`);
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data (in a real app, you'd get this from the API)
      // Find teacher by ID
      const teacherData = {
        id: parseInt(id),
        name: "John Smith",
        email: "john.smith@school.edu",
        subject: "Mathematics",
        department: "Science",
        phone: "555-123-4567",
        education: "Ph.D. in Mathematics, Stanford University",
        yearsOfExperience: 12,
        bio: "John is an experienced educator with a passion for making mathematics accessible to all students. He has published several papers on mathematics education and is known for his innovative teaching methods."
      };
      
      if (!teacherData) {
        throw new Error("Teacher not found");
      }
      
      setTeacher(teacherData);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch teacher details");
      console.error("Error fetching teacher:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 4 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/teachers')}
        sx={{ mb: 3 }}
      >
        Back to Teachers
      </Button>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              sx={{ 
                width: 150, 
                height: 150, 
                bgcolor: 'primary.main',
                fontSize: '4rem',
                mb: 2
              }}
            >
              {teacher.name.charAt(0)}
            </Avatar>
            
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {teacher.name}
              </Typography>
              <Chip 
                icon={<SchoolIcon />} 
                label={teacher.subject} 
                color="primary" 
                sx={{ mb: 1 }} 
              />
              <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                ID: {teacher.id}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email" 
                  secondary={teacher.email} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Phone" 
                  secondary={teacher.phone} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <DomainIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Department" 
                  secondary={teacher.department} 
                />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Professional Background
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Education" 
                  secondary={teacher.education} 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Experience" 
                  secondary={`${teacher.yearsOfExperience} years`} 
                />
              </ListItem>
            </List>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Biography
            </Typography>
            <Typography variant="body1" paragraph>
              {teacher.bio}
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SchoolIcon />}
                onClick={() => navigate(`/teachers/${teacher.id}/quizzes`)}
              >
                View Quizzes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<EditIcon />}
                onClick={() => navigate(`/teachers/${teacher.id}/edit`)}
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TeacherDetail;