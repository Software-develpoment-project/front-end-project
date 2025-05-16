import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Chip,
  IconButton,
  Grid
} from '@mui/material';
import { Add, Delete, Close } from '@mui/icons-material';

export default function QuestionForm({ onSubmit, onCancel }) {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('multiple-choice');
  const [answers, setAnswers] = useState([
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [error, setError] = useState('');

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    if (field === 'isCorrect') {
      // For multiple-choice, only one correct answer
      if (questionType === 'multiple-choice') {
        newAnswers.forEach((ans, i) => {
          newAnswers[i].isCorrect = i === index;
        });
      } else {
        newAnswers[index][field] = value;
      }
    } else {
      newAnswers[index][field] = value;
    }
    setAnswers(newAnswers);
  };

  const addAnswer = () => {
    if (answers.length < 6) {
      setAnswers([...answers, { text: '', isCorrect: false }]);
    }
  };

  const removeAnswer = (index) => {
    if (answers.length > 2) {
      const newAnswers = [...answers];
      newAnswers.splice(index, 1);
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!questionText.trim()) {
      setError('Question text is required');
      return;
    }
    
    if (answers.some(answer => !answer.text.trim())) {
      setError('All answers must have text');
      return;
    }
    
    if (!answers.some(answer => answer.isCorrect)) {
      setError('At least one correct answer is required');
      return;
    }
    
    setError('');
    
    // Prepare data for submission
    const questionData = {
      text: questionText,
      type: questionType,
      answers: answers.map(answer => ({
        text: answer.text,
        isCorrect: answer.isCorrect
      }))
    };
    
    onSubmit(questionData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New Question
      </Typography>
      
      <TextField
        label="Question Text"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 3 }}
        required
      />
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Question Type</InputLabel>
        <Select
          value={questionType}
          label="Question Type"
          onChange={(e) => setQuestionType(e.target.value)}
        >
          <MenuItem value="multiple-choice">Multiple Choice (Single Answer)</MenuItem>
          <MenuItem value="multiple-answer">Multiple Answer</MenuItem>
          <MenuItem value="true-false">True/False</MenuItem>
        </Select>
      </FormControl>
      
      <Divider sx={{ my: 3 }} />
      
      <Typography variant="h6" gutterBottom>
        Answer Options
      </Typography>
      
      {answers.map((answer, index) => (
        <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 2 }}>
          <Grid item xs={1}>
            <Chip 
              label={`${index + 1}`} 
              color={answer.isCorrect ? 'success' : 'default'} 
              variant={answer.isCorrect ? 'filled' : 'outlined'}
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              value={answer.text}
              onChange={(e) => handleAnswerChange(index, 'text', e.target.value)}
              fullWidth
              label={`Answer ${index + 1}`}
              required
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                size="small"
                color={answer.isCorrect ? 'success' : 'primary'}
                variant={answer.isCorrect ? 'contained' : 'outlined'}
                onClick={() => handleAnswerChange(index, 'isCorrect', !answer.isCorrect)}
                sx={{ mr: 1 }}
              >
                Correct
              </Button>
              <IconButton 
                onClick={() => removeAnswer(index)}
                color="error"
                disabled={answers.length <= 2}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      ))}
      
      <Button
        startIcon={<Add />}
        onClick={addAnswer}
        disabled={answers.length >= 6}
        sx={{ mb: 3 }}
      >
        Add Answer
      </Button>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <Divider sx={{ my: 3 }} />
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Close />}
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
        >
          Save Question
        </Button>
      </Box>
    </Box>
  );
}