import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  CircularProgress,
  Alert,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  IconButton
} from '@mui/material';
import { Add, Delete, ArrowBack } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import QuestionForm from './Questions';


export default function AddQuestion() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);

  const fetchQuizDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizId}`);
      if (!response.ok) throw new Error('Failed to fetch quiz details');
      const data = await response.json();
      setQuizDetails(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizId}/questions`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      const questionsData = await response.json();
      setQuestions(questionsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizDetails();
  }, [quizId]);

  useEffect(() => {
    if (quizDetails) {
      fetchQuestions();
    }
  }, [quizDetails]);

  const handleAddQuestion = async (questionData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: questionData.text,
          type: questionData.type,
          answers: questionData.answers
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add question');
      }
      
      await fetchQuestions(); // Refresh the questions list
      setShowForm(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/questions/${questionId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete question');
      }
      
      await fetchQuestions(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
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
          onClick={() => {
            setError(null);
            fetchQuizDetails();
          }}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h4" component="h1">
            {quizDetails?.title || 'Quiz'} - Questions
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {quizDetails?.description || 'No description available'}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!showForm ? (
          <Box>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setShowForm(true)}
              sx={{ mb: 3 }}
            >
              Add New Question
            </Button>

            {questions.length > 0 ? (
              <Paper elevation={1}>
                <List>
                  {questions.map((question) => (
                    <ListItem 
                      key={question.id}
                      secondaryAction={
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteQuestion(question.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      }
                    >
                      <ListItemText
                        primary={question.text}
                        secondary={`Type: ${question.type}`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ) : (
              <Typography variant="body1" color="text.secondary">
                No questions added yet. Click "Add New Question" to get started.
              </Typography>
            )}
          </Box>
        ) : (
          <QuestionForm 
            onCancel={() => setShowForm(false)}
            onSubmit={handleAddQuestion}
          />
        )}
      </Paper>
    </Container>
  );
}