import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Chip, IconButton, 
  TextField, MenuItem, Stack, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Snackbar, Alert, Box, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Check, Close } from '@mui/icons-material';

export default function Questions() {
  const { id: quizId } = useParams();
  const navigate = useNavigate();
  
  // State management
  
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    difficultyLevel: 'MEDIUM',
    quizId: parseInt(quizId)
  });
  
  const [editQuestion, setEditQuestion] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  // Fetch questions and answer counts when component mounts
  useEffect(() => {
    fetchQuestions(); 
  }, [quizId]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Fetch questions for this quiz
      const questionsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizId}/questions`);
      if (!questionsResponse.ok) {
        throw new Error('Failed to fetch questions');
      }
      
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData);
      
      // Fetch answer counts for each question
      if (questionsData.length > 0) {
        const answerCounts = await Promise.all(
          questionsData.map(async (question) => {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${question.id}/answers`);
            if (!response.ok) {
              throw new Error('Failed to fetch answer counts');
            }
            const data = await response.json();
            return { id: question.id, count: data.length };
          })
        );
        
        const answerMap = {};
        answerCounts.forEach(item => {
          answerMap[item.id] = item.count;
        });
        setAnswers(answerMap);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.text.trim()) {
      setSnackbar({
        open: true,
        message: 'Question text cannot be empty',
        severity: 'error'
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuestion),
      });

      if (!response.ok) {
        throw new Error('Failed to add question');
      }

      const addedQuestion = await response.json();
      setQuestions([...questions, addedQuestion]);
      setAnswers({...answers, [addedQuestion.id]: 0});
      setNewQuestion({
        text: '',
        difficultyLevel: 'MEDIUM',
        quizId: parseInt(quizId)
      });
      setSnackbar({
        open: true,
        message: 'Question added successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error adding question:', err);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    }
  };

  const handleUpdateQuestion = async () => {
    if (!editQuestion?.text?.trim()) {
      setSnackbar({
        open: true,
        message: 'Question text cannot be empty',
        severity: 'error'
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${editQuestion.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editQuestion,
          quizId: parseInt(quizId)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update question');
      }

      const updatedQuestion = await response.json();
      setQuestions(questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      ));
      setEditQuestion(null);
      setSnackbar({
        open: true,
        message: 'Question updated successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating question:', err);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    }
  };

  const confirmDeleteQuestion = (question) => {
    setQuestionToDelete(question);
    setDeleteDialogOpen(true);
  };

  const handleDeleteQuestion = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${questionToDelete.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete question');
      }

      setQuestions(questions.filter(q => q.id !== questionToDelete.id));
      const newAnswers = {...answers};
      delete newAnswers[questionToDelete.id];
      setAnswers(newAnswers);
      setDeleteDialogOpen(false);
      setQuestionToDelete(null);
      setSnackbar({
        open: true,
        message: 'Question deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting question:', err);
      setSnackbar({
        open: true,
        message: err.message,
        severity: 'error'
      });
    }
  };

  const handleViewAnswers = (questionId) => {
    navigate(`/quizzes/${quizId}/questions/${questionId}/answers`);
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
          Error loading questions: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz Questions
        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{ float: 'right' }}
          onClick={() => document.getElementById('new-question-form').scrollIntoView({ behavior: 'smooth' })}
        >
          New Question
        </Button>
      </Typography>

      { questions &&  questions.length > 0 ? (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>difficultyLevel</TableCell>
                <TableCell>Answers</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { questions && questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.text}</TableCell>
                  <TableCell>
                    <Chip 
                      label={question.difficultyLevel} 
                      color={
                        question.difficultyLevel === 'EASY' ? 'success' : 
                        question.difficultyLevel === 'HARD' ? 'error' : 'primary'
                      } 
                    />
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleViewAnswers(question.id)}>
                      {answers[question.id] || 0} Answers
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setEditQuestion(question)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => confirmDeleteQuestion(question)}>
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
            No questions found for this quiz
          </Typography>
        </Box>
      )}

      <div id="new-question-form">
        <Typography variant="h5" gutterBottom>
          Add New Question
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Question text"
            multiline
            rows={4}
            fullWidth
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
          />
          <TextField
            select
            label="Difficulty"
            value={newQuestion.difficultyLevel}
            onChange={(e) => setNewQuestion({...newQuestion, difficultyLevel: e.target.value})}
            fullWidth
          >
            {['EASY', 'MEDIUM', 'HARD'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <Button 
            variant="contained" 
            size="large" 
            onClick={handleAddQuestion}
            startIcon={<Add />}
          >
            Add Question
          </Button>
        </Stack>
      </div>

      {/* Edit Question Dialog */}
      <Dialog open={editQuestion !== null} onClose={() => setEditQuestion(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Question</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Question text"
              multiline
              rows={4}
              fullWidth
              value={editQuestion?.text || ''}
              onChange={(e) => setEditQuestion({...editQuestion, text: e.target.value})}
            />
            <TextField
              select
              label="Difficulty"
              value={editQuestion?.difficultyLevel || 'MEDIUM'}
              onChange={(e) => setEditQuestion({...editQuestion, difficultyLevel: e.target.value})}
              fullWidth
            >
              {['EASY', 'MEDIUM', 'HARD'].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditQuestion(null)} startIcon={<Close />}>Cancel</Button>
          <Button onClick={handleUpdateQuestion} variant="contained" startIcon={<Check />}>Save</Button>
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
            Are you sure you want to delete this question? This action cannot be undone and will also remove all associated answers.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} startIcon={<Close />}>Cancel</Button>
          <Button onClick={handleDeleteQuestion} color="error" variant="contained" startIcon={<Delete />}>
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