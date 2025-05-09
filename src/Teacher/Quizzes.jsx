import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Chip, 
  Stack, 
  ButtonGroup,
  Grid,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility, 
  Refresh,
  AccessTime,
  Category,
  HelpOutline
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes`);
      if (!response.ok) {
        throw new Error('Failed to fetch quizzes');
      }
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete quiz');
      }
      fetchQuizzes(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleViewQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setOpenDialog(true);
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'PPpp');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
        <Button 
          onClick={fetchQuizzes} 
          startIcon={<Refresh />}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" component="h1">
            Quiz Management
          </Typography>
         
        </Box>

        <Grid container spacing={3}>
          {quizzes.length === 0 ? (
            <Grid item xs={12}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  No quizzes found. Create your first quiz!
                </Typography>
              </Paper>
            </Grid>
          ) : (
            quizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                <Card sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {quiz.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {quiz.description || 'No description provided'}
                    </Typography>
                    
                    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                      <Chip 
                        icon={<AccessTime fontSize="small" />}
                        label={formatDate(quiz.createdAt)}
                        size="small"
                      />
                      <Chip 
                        icon={<Category fontSize="small" />}
                        label={quiz.categoryIds?.length > 0 ? `${quiz.categoryIds.length} categories` : 'No categories'}
                        size="small"
                      />
                      <Chip 
                        icon={<HelpOutline fontSize="small" />}
                        label={quiz.questionIds?.length > 0 ? `${quiz.questionIds.length} questions` : 'No questions'}
                        size="small"
                      />
                      <Chip 
                        label={quiz.published ? "Published" : "Draft"} 
                        color={quiz.published ? "success" : "default"} 
                        size="small"
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>
                  
                  <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    <ButtonGroup fullWidth>
                      <Button 
                        startIcon={<Visibility />}
                        onClick={() => handleViewQuiz(quiz)}
                        size="small"
                      >
                        View
                      </Button>
                      <Button 
                        component={Link}
                        to={`/quizzes/${quiz.id}/edit`}
                        startIcon={<Edit />}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Button 
                        startIcon={<Delete />}
                        color="error"
                        onClick={() => handleDelete(quiz.id)}
                        size="small"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Paper>

      {/* Quiz Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedQuiz?.title}
          <Typography variant="body2" color="text.secondary">
            Quiz Details
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          {selectedQuiz && (
            <Stack spacing={2}>
              <Typography>{selectedQuiz.description || 'No description provided'}</Typography>
              
              <Box>
                <Typography variant="subtitle2" gutterBottom>Details:</Typography>
                <Stack direction="row" spacing={2}>
                  <Chip 
                    icon={<AccessTime />}
                    label={`Created: ${formatDate(selectedQuiz.createdAt)}`}
                  />
                  <Chip 
                    icon={<HelpOutline />}
                    label={`Questions: ${selectedQuiz.questionIds?.length || 0}`}
                  />
                  <Chip 
                    icon={<Category />}
                    label={`Categories: ${selectedQuiz.categoryIds?.length || 0}`}
                  />
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" gutterBottom>Status:</Typography>
                <Chip 
                  label={selectedQuiz.published ? "Published" : "Draft"} 
                  color={selectedQuiz.published ? "success" : "default"} 
                  variant="outlined"
                />
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button 
            component={Link}
            to={`/quizzes/${selectedQuiz?.id}/questions`}
            variant="contained"
          >
            View Questions
          </Button>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Refresh Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <IconButton onClick={fetchQuizzes} color="primary">
          <Refresh />
        </IconButton>
      </Box>
    </Container>
  );
}