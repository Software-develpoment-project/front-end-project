
import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Grid, 
  List, 
  ListItem, 
  ListItemText, 
  Tabs, 
  Tab, 
  Paper, 
  Divider, 
  CircularProgress, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Alert, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from '@mui/material';
import { Check, Close, Category, QuestionAnswer } from '@mui/icons-material';

// Student Dashboard Component
export default function StudentQuizDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [categories, setCategories] = useState([]);
  const [publishedQuizzes, setPublishedQuizzes] = useState([]);
  const [categoryQuizzes, setCategoryQuizzes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizResults, setQuizResults] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);
  const [studentId, setStudentId] = useState(1); // Assuming student ID 1 for demonstration

  // Tabs handling
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Load published quizzes
  useEffect(() => {
    setLoading(true);
    // Simulating API call to fetch published quizzes
    fetch(`${import.meta.env.VITE_API_BASE_URL}/published-quizzes`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch published quizzes');
        return response.json();
      })
      .then(data => {
        setPublishedQuizzes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching published quizzes:', error);
        setLoading(false);
      });
  }, []);

  // Load categories
  useEffect(() => {
    // Simulating API call to fetch categories
    fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
      })
      .then(data => {
        setCategories(data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Load student's quiz history
  useEffect(() => {
    // Simulating API call to fetch student's quiz history
    fetch(`${import.meta.env.VITE_API_BASE_URL}/students/${studentId}/quizzes`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch student quiz history');
        return response.json();
      })
      .then(data => {
        console.log(`student quiz history`, data);
        setQuizHistory(data.quizReviews || []);
      })
      .catch(error => {
        console.error('Error fetching student quiz history:', error);
      });
  }, [studentId]);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setLoading(true);
    
    // Simulating API call to fetch quizzes by category
    fetch(`${import.meta.env.VITE_API_BASE_URL}/categories/${categoryId}/quizzes`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch category quizzes');
        return response.json();
      })
      .then(data => {
        console.log(`category quizzes`, data);
        setCategoryQuizzes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching category quizzes:', error);
        setLoading(false);
      });
  };

  // Handle quiz selection
  const handleQuizSelect = (quiz) => {
    setSelectedQuiz(quiz);
    setAnswers({});
    setQuizResults(null);
    setActiveQuestion(0);
    setLoading(true);
    
    // Simulating API call to fetch quiz questions
    fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes/${quiz.id}/questions`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch quiz questions');
        return response.json();
      })
      .then(data => {
        return Promise.all(data.map(question => 
          fetch(`${import.meta.env.VITE_API_BASE_URL}/questions/${question.id}/answers`)
            .then(resp => resp.json())
            .then(answers => ({ ...question, answers }))
        ));
      })
      .then(questionsWithAnswers => {
        setQuizQuestions(questionsWithAnswers);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching quiz questions:', error);
        setLoading(false);
      });
  };

  // Handle quiz navigation
  const handleNextQuestion = () => {
    if (activeQuestion < quizQuestions.length - 1) {
      setActiveQuestion(activeQuestion + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answerId) => {
    setAnswers({
      ...answers,
      [questionId]: answerId
    });
  };

  // Handle quiz submission
  const handleSubmitQuiz = () => {
    setLoading(true);
    
    // Check if all questions are answered
    const unansweredQuestions = quizQuestions.filter(q => !answers[q.id]);
    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions before submitting. ${unansweredQuestions.length} questions remaining.`);
      setLoading(false);
      return;
    }
    
    // Prepare submission object
    const submission = {
      quizId: selectedQuiz.id,
      studentId: studentId,
      answers: answers
    };
    
    // Simulating API call to submit quiz
    // In a real app, we'd post to an endpoint like /api/quiz-submissions
    setTimeout(() => {
      // Mock quiz results
      const mockResults = {
        quizId: selectedQuiz.id,
        studentId: studentId,
        quizTitle: selectedQuiz.title,
        correctAnswers: Math.floor(Math.random() * quizQuestions.length),
        wrongAnswers: 0,
        questionResults: {}
      };
      
      // Generate mock results for each question
      quizQuestions.forEach(question => {
        const isCorrect = Math.random() > 0.3; // 70% chance of being correct for demo
        mockResults.questionResults[question.id] = isCorrect;
        if (!isCorrect) mockResults.wrongAnswers++;
      });
      
      setQuizResults(mockResults);
      setOpenResultDialog(true);
      setLoading(false);
      
      // Update quiz history (in a real app this would come from the backend)
      const newQuizReview = {
        id: Date.now(),
        student: { id: studentId },
        quiz: selectedQuiz,
        rightAnswers: mockResults.correctAnswers,
        wrongAnswers: mockResults.wrongAnswers
      };
      
      setQuizHistory([...quizHistory, newQuizReview]);
    }, 1500);
  };

  // Go back to quiz list
  const handleBackToQuizzes = () => {
    setSelectedQuiz(null);
    setQuizQuestions([]);
    setQuizResults(null);
  };

  // Close result dialog
  const handleCloseResultDialog = () => {
    setOpenResultDialog(false);
  };

  // Render quiz listing
  const renderQuizListing = (quizzes) => {
    if (loading) {
      return <CircularProgress />;
    }
    
    if (quizzes.length === 0) {
      return <Typography variant="body1">No quizzes available.</Typography>;
    }
    
    return (
      <Grid container spacing={3}>
        {quizzes.map(quiz => (
          <Grid item xs={12} sm={6} md={4} key={quiz.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {quiz.title}
                </Typography>
                <Typography>
                  {quiz.description}
                </Typography>
                <Box mt={2}>
                  <Chip 
                    icon={<QuestionAnswer />} 
                    label={`${quiz.questionsCount || 'Multiple'} Questions`} 
                    size="small" 
                    sx={{ mr: 1 }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  variant="contained" 
                  color="primary"
                  onClick={() => handleQuizSelect(quiz)}
                >
                  Take Quiz
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  // Render categories view
  const renderCategoriesView = () => {
    return (
      <Box sx={{ display: 'flex', mt: 2 }}>
        <Paper sx={{ width: 240, mr: 2, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Categories
          </Typography>
          <List>
            {categories.map(category => (
              <ListItem 
                button 
                key={category.id}
                selected={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              >
                <ListItemText primary={category.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
        
        <Box sx={{ flexGrow: 1 }}>
          {selectedCategory ? (
            <>
              <Typography variant="h6" gutterBottom>
                {categories.find(c => c.id === selectedCategory)?.title} Quizzes
              </Typography>
              {renderQuizListing(categoryQuizzes)}
            </>
          ) : (
            <Typography variant="body1">Select a category to view its quizzes</Typography>
          )}
        </Box>
      </Box>
    );
  };

  // Render quiz taking view
  const renderQuizView = () => {
    if (!selectedQuiz) return null;
    
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    
    if (quizQuestions.length === 0) {
      return (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">This quiz has no questions.</Alert>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={handleBackToQuizzes}>
            Back to Quizzes
          </Button>
        </Box>
      );
    }
    
    const currentQuestion = quizQuestions[activeQuestion];
    
    return (
      <Box sx={{ mt: 2 }}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5">
              {selectedQuiz.title}
            </Typography>
            <Typography variant="body2">
              Question {activeQuestion + 1} of {quizQuestions.length}
            </Typography>
          </Box>
          
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            {currentQuestion.text}
          </Typography>
          
          <FormControl component="fieldset" sx={{ width: '100%', mt: 2 }}>
            <RadioGroup
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => handleAnswerSelect(currentQuestion.id, parseInt(e.target.value))}
            >
              {currentQuestion.answers.map(answer => (
                <FormControlLabel
                  key={answer.id}
                  value={answer.id}
                  control={<Radio />}
                  label={answer.text}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              disabled={activeQuestion === 0}
              onClick={handlePrevQuestion}
            >
              Previous
            </Button>
            
            <Box>
              {activeQuestion === quizQuestions.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNextQuestion}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  };

  // Render quiz history
  const renderQuizHistory = () => {
    if (quizHistory.length === 0) {
      return <Typography variant="body1">You haven't taken any quizzes yet.</Typography>;
    }
    
    return (
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Quiz</TableCell>
              <TableCell align="right">Correct Answers</TableCell>
              <TableCell align="right">Wrong Answers</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizHistory.map((review) => {
              const totalQuestions = review.rightAnswers + review.wrongAnswers;
              const score = totalQuestions > 0 
                ? ((review.rightAnswers / totalQuestions) * 100).toFixed(1) 
                : 0;
                
              return (
                <TableRow key={review.id}>
                  <TableCell component="th" scope="row">
                    {review.quiz.title}
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      icon={<Check />} 
                      label={review.rightAnswers} 
                      color="success" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Chip 
                      icon={<Close />} 
                      label={review.wrongAnswers} 
                      color="error" 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="right">
                    {score}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Render quiz results dialog
  const renderResultDialog = () => {
    if (!quizResults) return null;
    
    const totalQuestions = quizResults.correctAnswers + quizResults.wrongAnswers;
    const score = totalQuestions > 0 
      ? ((quizResults.correctAnswers / totalQuestions) * 100).toFixed(1) 
      : 0;
      
    return (
      <Dialog
        open={openResultDialog}
        onClose={handleCloseResultDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent>
          <DialogContentText component="div">
            <Typography variant="h6" gutterBottom>
              {quizResults.quizTitle}
            </Typography>
            
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Typography variant="h3" color={score >= 70 ? 'success.main' : 'error.main'}>
                {score}%
              </Typography>
              <Typography variant="body1" gutterBottom>
                You got {quizResults.correctAnswers} out of {totalQuestions} questions correct
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" color="success.main">
                  {quizResults.correctAnswers}
                </Typography>
                <Typography variant="body2">Correct</Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h5" color="error.main">
                  {quizResults.wrongAnswers}
                </Typography>
                <Typography variant="body2">Wrong</Typography>
              </Box>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResultDialog} variant="outlined">
            Close
          </Button>
          <Button onClick={handleBackToQuizzes} variant="contained" color="primary">
            Back to Quizzes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>
      
      {selectedQuiz ? (
        renderQuizView()
      ) : (
        <>
          <Paper sx={{ mb: 2 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Available Quizzes" icon={<QuestionAnswer />} iconPosition="start" />
              <Tab label="Categories" icon={<Category />} iconPosition="start" />
              <Tab label="My Quiz History" />
            </Tabs>
          </Paper>
          
          {tabValue === 0 && renderQuizListing(publishedQuizzes)}
          {tabValue === 1 && renderCategoriesView()}
          {tabValue === 2 && renderQuizHistory()}
        </>
      )}
      
      {renderResultDialog()}
    </Container>
  );
}