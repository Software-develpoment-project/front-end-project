import { useState, useEffect } from 'react';
import { Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Radio, RadioGroup, FormControlLabel, Box, Stack, Paper } from '@mui/material';
import Container from '@mui/material/Container';

function QuizForm() {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    category: '',
    questions: []
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({
    text: '',
    points: 1,
    answerOptions: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:8080/api/categories');
        const data = await response.json();
        print(data)
        setCategories(data);
      } catch (error) {
        setMessage('Error fetching categories');
      }
    }
    fetchCategories();
  }, []);

  function handleQuizChange(e) {
    const { name, value } = e.target;
    setQuiz(prev => ({ ...prev, [name]: value }));
  }

  function handleQuestionChange(e) {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({ ...prev, [name]: value }));
  }

  function handleAnswerOptionChange(idx, value) {
    setCurrentQuestion(prev => {
      const newOptions = prev.answerOptions.map((opt, i) =>
        i === idx ? { ...opt, text: value } : opt
      );
      return { ...prev, answerOptions: newOptions };
    });
  }

  function handleCorrectAnswerChange(idx) {
    setCurrentQuestion(prev => {
      const newOptions = prev.answerOptions.map((opt, i) => ({
        ...opt,
        isCorrect: i === idx
      }));
      return { ...prev, answerOptions: newOptions };
    });
  }

  function handleAddQuestion() {
    if (!currentQuestion.text.trim() || currentQuestion.answerOptions.some(opt => !opt.text.trim())) {
      setMessage('Please fill in all question and answer fields.');
      return;
    }
    setQuiz(prev => ({
      ...prev,
      questions: [...prev.questions, currentQuestion]
    }));
    setCurrentQuestion({
      text: '',
      points: 1,
      answerOptions: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    });
    setMessage('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!quiz.title || !quiz.category || quiz.questions.length === 0) {
      setMessage('Please fill all quiz fields and add at least one question.');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/quizzes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quiz)
      });
      if (!response.ok) throw new Error('Failed to create quiz');
      setMessage('Quiz created successfully!');
      setQuiz({ title: '', description: '', category: '', questions: [] });
    } catch (error) {
      setMessage('Error creating quiz');
    }
    setLoading(false);
  }

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom>Create a New Quiz</Typography>
        {message && <Alert severity="info" sx={{ mb: 2 }}>{message}</Alert>}
        <Stack spacing={3}>
          <TextField
            label="Quiz Title"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            fullWidth
            multiline
            rows={2}
          />
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={quiz.category}
              label="Category"
              onChange={handleQuizChange}
            >
              {categories.map(cat => (
                <MenuItem key={cat.id || cat._id || cat} value={cat.title || cat}>
                  {cat.title || cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box>
            <Typography variant="subtitle1" sx={{ mt: 2 }}>Questions Added: {quiz.questions.length}</Typography>
            {quiz.questions.map((q, i) => (
              <Paper key={i} sx={{ p: 1, my: 1, bgcolor: '#f9f9f9' }}>
                <Typography>{i + 1}. {q.text}</Typography>
              </Paper>
            ))}
          </Box>
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Create Quiz'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default QuizForm;
