import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Container,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Chip,
  useTheme
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Cancel,
  Assignment,
  HelpOutline,
  ArrowBack,
  ViewList,
  Star,
  StarBorder,
  Timeline
} from '@mui/icons-material';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const QuizResults = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [quizReview, setQuizReview] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock student ID (in a real application, this would come from auth context)
  const studentId = 1;

  useEffect(() => {
    const fetchQuizResults = async () => {
      try {
        setLoading(false);
        
        // Fetch student quiz reviews
        const reviewResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/difficultyLevel/api/students/${studentId}/quizzes`);
        
        if (!reviewResponse.ok) {
          throw new Error(`HTTP error! status: ${reviewResponse.status}`);
        }
        
        const reviewData = await reviewResponse.json();
        
        // Find the specific quiz review
        const review = reviewData.quizReviews?.find(
          r => r.quiz.id === parseInt(quizId)
        );
        
        if (!review) {
          throw new Error('Quiz review not found');
        }
        
        setQuizReview(review);
        
        // Fetch the quiz details with questions
        const quizResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/quizzes/${quizId}`);
        
        if (!quizResponse.ok) {
          throw new Error(`HTTP error! status: ${quizResponse.status}`);
        }
        
        const quizData = await quizResponse.json();
        setQuiz(quizData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quiz results:', err);
        setError('Failed to load quiz results. Please try again later.');
        setLoading(false);
      }
    };

    if (quizId && studentId) {
      fetchQuizResults();
    }
  }, [quizId, studentId]);

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

  if (!quizReview || !quiz) {
    return (
      <Box mt={4}>
        <Alert severity="warning">No results found for this quiz.</Alert>
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

  // Calculate statistics
  const totalQuestions = quizReview.rightAnswers + quizReview.wrongAnswers;
  const unanswered = quiz.questions.length - totalQuestions;
  const score = Math.round((quizReview.rightAnswers / quiz.questions.length) * 100);
  
  // Prepare data for the charts
  const pieData = [
    { name: 'Correct', value: quizReview.rightAnswers, color: theme.palette.success.main },
    { name: 'Incorrect', value: quizReview.wrongAnswers, color: theme.palette.error.main },
    { name: 'Unanswered', value: unanswered, color: theme.palette.action.disabled }
  ];
  
  const barData = [
    { name: 'Score', value: score, color: score >= 70 ? theme.palette.success.main : theme.palette.warning.main }
  ];
  
  // Get pass/fail status
  const passed = score >= 70; // Assuming 70% is passing score
  
  return (
    <Container maxWidth="md">
      <Box mt={4} mb={4}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex" alignItems="center">
              <Assignment color="primary" sx={{ mr: 1 }} />
              <Typography variant="h5" component="h1">
                {quiz.title} - Results
              </Typography>
            </Box>
            <Chip 
              icon={passed ? <CheckCircle /> : <Cancel />}
              label={passed ? "PASSED" : "FAILED"}
              color={passed ? "success" : "error"}
              variant="outlined"
            />
          </Box>
          
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <Timeline sx={{ mr: 1 }} /> Performance Summary
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="h2" align="center" sx={{ color: passed ? 'success.main' : 'error.main' }}>
                      {score}%
                    </Typography>
                    <Typography variant="body2" align="center" color="text.secondary">
                      Final Score
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      {[...Array(5)].map((_, i) => (
                        i < Math.round(score / 20) ? 
                          <Star key={i} color="warning" /> : 
                          <StarBorder key={i} color="warning" />
                      ))}
                    </Box>
                  </Box>
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="success" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${quizReview.rightAnswers} Correct Answers`} 
                        secondary={`${Math.round((quizReview.rightAnswers / quiz.questions.length) * 100)}%`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Cancel color="error" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${quizReview.wrongAnswers} Incorrect Answers`} 
                        secondary={`${Math.round((quizReview.wrongAnswers / quiz.questions.length) * 100)}%`} 
                      />
                    </ListItem>
                    {unanswered > 0 && (
                      <ListItem>
                        <ListItemIcon>
                          <HelpOutline color="disabled" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={`${unanswered} Unanswered Questions`} 
                          secondary={`${Math.round((unanswered / quiz.questions.length) * 100)}%`} 
                        />
                      </ListItem>
                    )}
                  </List>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card variant="outlined" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Result Analysis
                  </Typography>
                  
                  <Box height={300}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} questions`, null]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                  
                  <Box height={100} mt={2}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, "Score"]} />
                        <Bar dataKey="value" fill={barData[0].color} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/student/quizzes')}
            >
              Back to Quizzes
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<Assignment />}
              onClick={() => navigate(`/student/quiz/${quizId}`)}
            >
              Retake Quiz
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default QuizResults;