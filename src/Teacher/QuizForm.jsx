import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizForm = () => {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    published: true,
    difficulty: 'EASY',
    categoryIds: [],
    questionIds: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuiz(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const now = new Date().toISOString();

    const payload = {
      id: 0,
      title: quiz.title,
      description: quiz.description,
      published: quiz.published,
      difficulty: quiz.difficulty,
      createdAt: now,
      updatedAt: now,
      categoryIds: quiz.categoryIds.length ? quiz.categoryIds : [0],
      questionIds: quiz.questionIds.length ? quiz.questionIds : [0]
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/quizzes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }

      setSuccess(true);
      setTimeout(() => navigate('/teacher/quizzes'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Quiz
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>Quiz created successfully!</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Quiz Title"
          name="title"
          value={quiz.title}
          onChange={handleChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={quiz.description}
          onChange={handleChange}
          multiline
          rows={3}
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Difficulty</InputLabel>
          <Select
            name="difficulty"
            value={quiz.difficulty}
            label="Difficulty"
            onChange={handleChange}
            required
          >
            <MenuItem value="EASY">Easy</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HARD">Hard</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Checkbox
              name="published"
              checked={quiz.published}
              onChange={handleChange}
            />
          }
          label="Publish immediately"
          sx={{ mt: 1 }}
        />

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/teacher/quizzes')}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? 'Saving...' : 'Save Quiz'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizForm;
