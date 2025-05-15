import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton, 
  TextField, Stack, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Snackbar, Alert, Box, CircularProgress,
  Card, CardContent, CardActions, Divider, Chip
} from '@mui/material';
import { Add, Delete, Edit, Check, Close, ArrowBack } from '@mui/icons-material';

export default function Solutions() {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  
  // State management
  const [question, setQuestion] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [newSolution, setNewSolution] = useState({
    text: '',
    isCorrect: false,
    explanation: '',
    questionId: parseInt(questionId)
  });
  
  const [editSolution, setEditSolution] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [solutionToDelete, setSolutionToDelete] = useState(null);

  // Fetch question and solutions when component mounts
  useEffect(() => {
    fetchQuestionAndSolutions();
  }, [questionId]);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchQuestionAndSolutions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch question details
      const questionResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${questionId}`);
      
      if (!questionResponse.ok) {
        throw new Error(`Failed to fetch question (Status: ${questionResponse.status})`);
      }
      
      const questionData = await questionResponse.json();
      setQuestion(questionData);
      
      // Fetch solutions for this question
      const solutionsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${questionId}/answers`);
      
      if (!solutionsResponse.ok) {
        throw new Error(`Failed to fetch solutions (Status: ${solutionsResponse.status})`);
      }
      
      const solutionsData = await solutionsResponse.json();
      setSolutions(solutionsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load question or solutions');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSolution = async () => {
    if (!newSolution.text.trim()) {
      showSnackbar('Solutiontext cannot be empty', 'error');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${questionId}/answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSolution),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to add solution (Status: ${response.status})`);
      }

      const addedSolution = await response.json();
      setSolutions([...solutions, addedSolution]);
      
      // Reset form
      setNewSolution({
       text: '',
        isCorrect: false,
        explanation: '',
        questionId: parseInt(questionId)
      });
      
      showSnackbar('Solution added successfully');
    } catch (err) {
      console.error('Error adding solution:', err);
      showSnackbar(err.message || 'Failed to add solution', 'error');
    }
  };

  const handleUpdateSolution = async () => {
    if (!editSolution?.text?.trim()) {
      showSnackbar('Solutiontext cannot be empty', 'error');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/answers/${editSolution.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editSolution,
          questionId: parseInt(questionId)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to update solution (Status: ${response.status})`);
      }

      const updatedSolution = await response.json();
      setSolutions(solutions.map(s => 
        s.id === updatedSolution.id ? updatedSolution : s
      ));
      setEditSolution(null);
      showSnackbar('Solution updated successfully');
    } catch (err) {
      console.error('Error updating solution:', err);
      showSnackbar(err.message || 'Failed to update solution', 'error');
    }
  };

  const confirmDeleteSolution = (solution) => {
    setSolutionToDelete(solution);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSolution = async () => {
    if (!solutionToDelete?.id) {
      setDeleteDialogOpen(false);
      return;
    }
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/answers/${solutionToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete solution (Status: ${response.status})`);
      }

      // Update state by removing the deleted solution
      setSolutions(solutions.filter(s => s.id !== solutionToDelete.id));
      
      // Close dialog and reset state
      setDeleteDialogOpen(false);
      setSolutionToDelete(null);
      showSnackbar('Solution deleted successfully');
    } catch (err) {
      console.error('Error deleting solution:', err);
      showSnackbar(err.message || 'Failed to delete solution', 'error');
    }
  };

  const handleBackToQuestions = () => {
    navigate(`/quizzes/${quizId}/questions`);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          Error: {error}
          <Button 
            variant="outlined" 
            color="inherit" 
            size="small" 
            sx={{ ml: 2 }}
            onClick={fetchQuestionAndSolutions}
          >
            Retry
          </Button>
        </Alert>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBack />} 
          sx={{ mt: 2 }}
          onClick={handleBackToQuestions}
        >
          Back to Questions
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Button 
        variant="outlined" 
        startIcon={<ArrowBack />} 
        sx={{ mb: 2 }}
        onClick={handleBackToQuestions}
      >
        Back to Questions
      </Button>

      {question && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Question
            </Typography>
            <Typography variant="body1">
              {question.text}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Chip 
                label={question.difficulty} 
                color={
                  question.difficulty === 'Easy' ? 'success' : 
                  question.difficulty === 'Hard' ? 'error' : 'primary'
                } 
              />
            </Box>
          </CardContent>
        </Card>
      )}

      <Typography variant="h4" gutterBottom>
        Solution Options
        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{ float: 'right' }}
          onClick={() => document.getElementById('new-solution-form').scrollIntoView({ behavior: 'smooth' })}
        >
          New Solution
        </Button>
      </Typography>

      {solutions.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Solution</TableCell>
                <TableCell>Correct Answer</TableCell>
                <TableCell>Explanation</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solutions.map((solution) => (
                <TableRow key={solution.id}>
                  <TableCell>{solution.text}</TableCell>
                  <TableCell>
                    <Chip 
                      label={solution.isCorrect ? 'Correct' : 'Incorrect'} 
                      color={solution.isCorrect ? 'success' : 'default'} 
                      variant={solution.isCorrect ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell>
                    {solution.explanation || '-'}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditSolution(solution)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => confirmDeleteSolution(solution)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No solutions found for this question
          </Typography>
        </Box>
      )}

      <div id="new-solution-form">
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Add New Solution
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Stack spacing={3}>
          <TextField
            label="Solutiontext"
            multiline
            rows={2}
            fullWidth
            value={newSolution.text}
            onChange={(e) => setNewSolution({...newSolution,text: e.target.value})}
          />
          <Stack direction="row" spacing={2}>
            <Button 
              variant={newSolution.isCorrect ? "contained" : "outlined"}
              color="success"
              onClick={() => setNewSolution({...newSolution, isCorrect: true})}
              sx={{ flexGrow: 1 }}
            >
              <Check sx={{ mr: 1 }} /> Mark as Correct
            </Button>
            <Button 
              variant={!newSolution.isCorrect ? "contained" : "outlined"}
              color="error"
              onClick={() => setNewSolution({...newSolution, isCorrect: false})}
              sx={{ flexGrow: 1 }}
            >
              <Close sx={{ mr: 1 }} /> Mark as Incorrect
            </Button>
          </Stack>
          <TextField
            label="Explanation (Optional)"
            multiline
            rows={3}
            fullWidth
            placeholder="Explain why this answer is correct or incorrect"
            value={newSolution.explanation}
            onChange={(e) => setNewSolution({...newSolution, explanation: e.target.value})}
          />
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleAddSolution}
            startIcon={<Add />}
          >
            Add Solution
          </Button>
        </Stack>
      </div>

      {/* Edit Solution Dialog */}
      <Dialog open={editSolution !== null} onClose={() => setEditSolution(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Solution</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Solutiontext"
              multiline
              rows={2}
              fullWidth
              value={editSolution?.text || ''}
              onChange={(e) => setEditSolution({...editSolution,text: e.target.value})}
            />
            <Stack direction="row" spacing={2}>
              <Button 
                variant={editSolution?.isCorrect ? "contained" : "outlined"}
                color="success"
                onClick={() => setEditSolution({...editSolution, isCorrect: true})}
                sx={{ flexGrow: 1 }}
              >
                <Check sx={{ mr: 1 }} /> Mark as Correct
              </Button>
              <Button 
                variant={!editSolution?.isCorrect ? "contained" : "outlined"}
                color="error"
                onClick={() => setEditSolution({...editSolution, isCorrect: false})}
                sx={{ flexGrow: 1 }}
              >
                <Close sx={{ mr: 1 }} /> Mark as Incorrect
              </Button>
            </Stack>
            <TextField
              label="Explanation (Optional)"
              multiline
              rows={3}
              fullWidth
              placeholder="Explain why this answer is correct or incorrect"
              value={editSolution?.explanation || ''}
              onChange={(e) => setEditSolution({...editSolution, explanation: e.target.value})}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditSolution(null)} startIcon={<Close />}>Cancel</Button>
          <Button onClick={handleUpdateSolution} variant="contained" startIcon={<Check />}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this solution? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} startIcon={<Close />}>Cancel</Button>
          <Button onClick={handleDeleteSolution} color="error" variant="contained" startIcon={<Delete />}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({...snackbar, open: false})}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}