import { useEffect, useState } from 'react';
import { 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  CircularProgress, 
  Alert, 
  Box,
  Button,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

// In a real application, you would fetch data from your API
// This is just a mock implementation
const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      
      const data = [
        {
          id: 1,
          name: "John Smith",
          email: "john.smith@school.edu",
          subject: "Mathematics",
          department: "Science",
          phone: "555-123-4567"
        },
        {
          id: 2,
          name: "Emily Johnson",
          email: "emily.johnson@school.edu",
          subject: "English Literature",
          department: "Humanities",
          phone: "555-234-5678"
        },
        {
          id: 3,
          name: "Michael Chen",
          email: "michael.chen@school.edu",
          subject: "Physics",
          department: "Science",
          phone: "555-345-6789"
        },
        {
          id: 4,
          name: "Sarah Williams",
          email: "sarah.williams@school.edu",
          subject: "History",
          department: "Humanities",
          phone: "555-456-7890"
        },
        {
          id: 5,
          name: "David Rodriguez",
          email: "david.rodriguez@school.edu",
          subject: "Computer Science",
          department: "Technology",
          phone: "555-567-8901"
        }
      ];
      
      setTeachers(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch teachers. Please try again later.");
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        
        setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.id !== id));
        
        // Show success message (in a real app, you'd use a snackbar or toast)
        alert("Teacher deleted successfully");
      } catch (err) {
        console.error("Error deleting teacher:", err);
        alert("Failed to delete teacher");
      }
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            Teacher Management
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          component={Link}
          to="/teachers/new"
        >
          Add Teacher
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Subject</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" sx={{ py: 3 }}>
                        No teachers found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  teachers.map((teacher) => (
                    <TableRow 
                      key={teacher.id}
                      sx={{ 
                        '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                        '&:hover': { bgcolor: 'action.selected' }
                      }}
                    >
                      <TableCell>{teacher.id}</TableCell>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {teacher.name}
                        </Typography>
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>
                        <Chip 
                          label={teacher.subject} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{teacher.department}</TableCell>
                      <TableCell>
                        <Box>
                          <Tooltip title="View Teacher">
                            <IconButton 
                              size="small" 
                              color="primary"
                              onClick={() => navigate(`/TeacherDetails/${teacher.id}`)}
                            >
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View Quizzes">
                            <IconButton 
                              size="small" 
                              color="secondary"
                              onClick={() => navigate(`/teachers/${teacher.id}/quizzes`)}
                            >
                              <SchoolIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit Teacher">
                            <IconButton 
                              size="small" 
                              color="info"
                              onClick={() => navigate(`/teachers/${teacher.id}/edit`)}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Teacher">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleDeleteTeacher(teacher.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default TeacherList;