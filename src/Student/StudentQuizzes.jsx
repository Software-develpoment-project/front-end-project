import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  CircularProgress,
  Divider,
  Alert,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Assignment, CheckCircle, Warning } from '@mui/icons-material';

const StudentQuizzes = () => {
    const studentId = 1
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentQuizzes = async () => {
      try {
        setLoading(true);
        // Fetch quizzes for the student using the API
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/quizzes`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setQuizzes(data.quizReviews || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching student quizzes:', err);
        setError('Failed to load quizzes. Please try again later.');
        setLoading(false);
      }
    };

    if (studentId) {
      fetchStudentQuizzes();
    }
  }, [studentId]);

  const handleStartQuiz = (quizId) => {
    navigate(`/student/quiz/${quizId}`);
  };

  const handleViewResults = (quizId) => {
    navigate(`/student/results/${quizId}`);
  };

  // Determine if a quiz has been attempted before
  const hasAttempted = (quizId) => {
    return quizzes.some(review => review.quiz.id === quizId);
  };

  // Function to determine if quiz is completed (has results)
  const isCompleted = (quizId) => {
    return quizzes.some(review => 
      review.quiz.id === quizId && 
      (review.rightAnswers > 0 || review.wrongAnswers > 0)
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // Extract unique quizzes to avoid duplicates
  const uniqueQuizzes = [];
  const quizIds = new Set();
  
  quizzes.forEach(review => {
    if (!quizIds.has(review.quiz.id)) {
      quizIds.add(review.quiz.id);
      uniqueQuizzes.push(review.quiz);
    }
  });

  return (
    <Container maxWidth="lg">
      <Box mt={4} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Quizzes
        </Typography>
        <Divider sx={{ mb: 4 }} />

        {uniqueQuizzes.length === 0 ? (
          <Alert severity="info">
            No quizzes are available for you at the moment.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {uniqueQuizzes.map((quiz) => (
              <Grid item xs={12} sm={6} md={4} key={quiz.id}>
                <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Assignment color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6" component="h2" noWrap>
                        {quiz.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {quiz.description || "No description available."}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={2}>
                      {isCompleted(quiz.id) ? (
                        <CheckCircle color="success" sx={{ mr: 1 }} />
                      ) : (
                        <Warning color="warning" sx={{ mr: 1 }} />
                      )}
                      <Typography variant="body2">
                        {isCompleted(quiz.id) ? "Completed" : "Not completed"}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      color="primary" 
                      onClick={() => handleStartQuiz(quiz.id)}
                    >
                      {hasAttempted(quiz.id) ? "Retake Quiz" : "Start Quiz"}
                    </Button>
                    {isCompleted(quiz.id) && (
                      <Button 
                        size="small" 
                        color="secondary" 
                        onClick={() => handleViewResults(quiz.id)}
                      >
                        View Results
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default StudentQuizzes;