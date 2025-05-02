import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, TextField, MenuItem, Stack } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import { mockQuestions, mockAnswers } from '../../mockData';

export default function Questions() {
  const { id } = useParams();
  const [questions] = useState(mockQuestions.filter(q => q.quizId === parseInt(id)));
  const [answers] = useState(mockAnswers);
  const [newQuestion, setNewQuestion] = useState({
    content: '',
    difficulty: 'Normal'
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quiz Questions
        <Button 
          variant="contained" 
          startIcon={<Add />}
          sx={{ float: 'right' }}
          onClick={() => document.getElementById('new-question-form').scrollIntoView()}
        >
          New Question
        </Button>
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Answers</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow key={question.id}>
                <TableCell>{question.content}</TableCell>
                <TableCell>
                  <Chip 
                    label={question.difficulty} 
                    color={
                      question.difficulty === 'Easy' ? 'success' : 
                      question.difficulty === 'Hard' ? 'error' : 'primary'
                    } 
                  />
                </TableCell>
                <TableCell>
                  {answers.filter(a => a.questionId === question.id).length}
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Edit />
                  </IconButton>
                  <IconButton color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div id="new-question-form">
        <Typography variant="h5" gutterBottom>
          Add New Question
        </Typography>
        <Stack spacing={3}>
          <TextField
            label="Question Content"
            multiline
            rows={4}
            fullWidth
            value={newQuestion.content}
            onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})}
          />
          <TextField
            select
            label="Difficulty"
            value={newQuestion.difficulty}
            onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
            fullWidth
          >
            {['Easy', 'Normal', 'Hard'].map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </TextField>
          <Button variant="contained" size="large">
            Add Question
          </Button>
        </Stack>
      </div>
    </Container>
  );
}