import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  CircularProgress,
  Alert,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  Container,
  Card,
  CardContent,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { Timer, QuestionMark, ArrowBack, ArrowForward, Check } from '@mui/icons-material';

const QuizTaking = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  
  // Mock student ID (in a real application, this would come from auth context)
  const studentId = 1;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        // In a real application, fetch the quiz with its questions
        const response = await fetch(`/api/quizzes/${quizId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setQuiz(data);
        
        // Initialize time limit if the quiz has one
        if (data.timeLimit) {
          setTimeLeft(data.timeLimit * 60); // Convert minutes to seconds
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please try again later.');
        setLoading(false);
      }
    };

    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);

  // Timer effect
  useEffect(() => {
    if (timeLeft !== null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz(); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleAnswerChange = (event) => {
    setAnswers({
      ...answers,
      [currentQuestionIndex]: event.target.value
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOpenConfirmDialog = () => {
    setConfirmSubmit(true);
  };

  const handleCloseConfirmDialog = () => {
    setConfirmSubmit(false);
  };

  const handleSubmitQuiz = async () => {
    setConfirmSubmit(false);
    setIsSubmitting(true);
    
    try {
      // Calculate results
      let rightAnswers = 0;
      let wrongAnswers = 0;
      
      quiz.questions.forEach((question, index) => {
        if (answers[index] === question.correctAnswer) {
          rightAnswers++;
        } else if (answers[index]) {
          wrongAnswers++;
        }
      });
      
      // Prepare data for submission
      const reviewData = {
        id: studentId,
        quizReviews: [
          {
            quiz: {
              id: parseInt(quizId)
            },
            rightAnswers: rightAnswers,
            wrongAnswers: wrongAnswers
          }
        ]
      };
      
      // Submit quiz review
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/students/quizzes/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Navigate to results page
      navigate(`/student/results/${quizId}`);
    } catch (err) {
      console.error('Error submitting quiz:', err);
      setError('Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return (answeredCount / (quiz?.questions?.length || 1)) * 100;
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
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/student/quizzes')}
        >
          Back to Quizzes
        </Button>
      </Box>
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <Box mt={4}>
        <Alert severity="warning">This quiz has no questions.</Alert>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/student/quizzes')}
        >
          Back to Quizzes
        </Button>
      </Box>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" component="h1">
              {quiz.title}
            </Typography>
            {timeLeft !== null && (
              <Box display="flex" alignItems="center">
                <Timer color={timeLeft < 60 ? "error" : "primary"} sx={{ mr: 1 }} />
                <Typography 
                  variant="h6" 
                  color={timeLeft < 60 ? "error" : "primary"}
                >
                  {formatTime(timeLeft)}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <LinearProgress 
            variant="determinate" 
            value={calculateProgress()} 
            sx={{ mb: 3 }}
          />
          
          <Stepper 
            activeStep={currentQuestionIndex} 
            alternativeLabel
            sx={{ mb: 4 }}
          >
            {quiz.questions.map((question, index) => (
              <Step key={index} completed={answers[index] !== undefined}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="flex-start" mb={2}>
                <QuestionMark color="primary" sx={{ mr: 1, mt: 0.5 }} />
                <Typography variant="h6" component="h2">
                  Question {currentQuestionIndex + 1}
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph>
                {currentQuestion.text}
              </Typography>
              
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={answers[currentQuestionIndex] || ''}
                  onChange={handleAnswerChange}
                >
                  {currentQuestion.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{ 
                        display: 'block', 
                        my: 1, 
                        p: 1,
                        borderRadius: 1,
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
          </Card>
          
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNextQuestion}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                endIcon={<Check />}
                onClick={handleOpenConfirmDialog}
                disabled={isSubmitting}
              >
                Submit Quiz
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
      
      {/* Confirmation Dialog */}
      <Dialog
        open={confirmSubmit}
        onClose={handleCloseConfirmDialog}
      >
        <DialogTitle>Submit Quiz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to submit this quiz? You've answered {Object.keys(answers).length} out of {quiz.questions.length} questions.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitQuiz} color="primary" variant="contained" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QuizTaking;