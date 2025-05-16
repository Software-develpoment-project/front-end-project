import React, { useEffect, useState } from 'react';
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
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const QuizForm = () => {
  const navigate = useNavigate();
  const editQuiz = useSelector((state) => state.counter.editQuiz);
  const categoriesFromStore = useSelector((state) => state.counter.categories);
  

  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    published: false,
    difficulty: 'EASY',
    categoryIds: [],
    questionIds: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // Populate quiz state if editing
  useEffect(() => {
    if (editQuiz) {
      setQuiz({
        title: editQuiz.title || '',
        description: editQuiz.description || '',
        published: editQuiz.published || false,
        difficulty: editQuiz.difficulty || 'EASY',
        categoryIds: editQuiz.categoryIds || [],
        questionIds: editQuiz.questionIds || [],
      });
    }
  }, [editQuiz]);

  // Load categories from Redux or fetch
  useEffect(() => {
    if (categoriesFromStore?.length) {
      setCategories(categoriesFromStore);
    } else {
      async function fetchCategories() {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/categories`);
          const data = await res.json();
          setCategories(data);
        } catch (err) {
          setMessage('Error fetching categories');
        }
      }
      fetchCategories();
    }
  }, [categoriesFromStore]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuiz((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setQuiz((prev) => ({
      ...prev,
      categoryIds: [parseInt(value)],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const now = new Date().toISOString();
    const isEditing = !!editQuiz;

    const payload = {
      ...quiz,
      updatedAt: now,
      createdAt: isEditing ? editQuiz.createdAt : now,
      categoryIds: quiz.categoryIds.length ? quiz.categoryIds : [0],
      questionIds: quiz.questionIds.length ? quiz.questionIds : [0],
    };

    const endpoint = isEditing
      ? `${import.meta.env.VITE_API_BASE_URL}/quizzes/${editQuiz.id}`
      : `${import.meta.env.VITE_API_BASE_URL}/quizzes`;

    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save quiz');

      setSuccess(true);

      if (!isEditing) {
        setQuiz({
          title: '',
          description: '',
          published: false,
          difficulty: 'EASY',
          categoryIds: [],
          questionIds: [],
        });
      }

      setTimeout(() => navigate('/teacher/quizzes'), 1500);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {editQuiz ? 'Edit Quiz' : 'Create New Quiz'}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>
        {editQuiz ? 'Quiz updated successfully!' : 'Quiz created successfully!'}
      </Alert>}
      {message && <Alert severity="warning" sx={{ mb: 2 }}>{message}</Alert>}

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

        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={quiz.categoryIds[0] ?? ''}
            label={quiz.categoryIds[0] ? categories.find(cat => cat.id === quiz.categoryIds[0])?.title : 'Select Category'}
            onChange={handleCategoryChange}
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
            {loading
              ? (editQuiz ? 'Updating...' : 'Saving...')
              : (editQuiz ? 'Update Quiz' : 'Save Quiz')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizForm;
