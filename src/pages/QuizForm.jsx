import { Container, Typography, TextField, MenuItem, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';

import { mockTeachers, mockQuizzes } from '../../mockData';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function QuizForm({ editMode }) {
  const { id } = useParams();
  const quiz = editMode ? mockQuizzes.find(q => q.id === parseInt(id)) : null;
  const [formData, setFormData] = useState({
    title: quiz?.title || '',
    description: quiz?.description || '',
    courseCode: quiz?.courseCode || '',
    difficulty: quiz?.difficulty || 'Normal',
    topic: quiz?.topic || '',
    teacherId: quiz?.teacherId || '',
    published: quiz?.published || false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {editMode ? 'Edit Quiz' : 'Create New Quiz'}
      </Typography>
      <Stack spacing={3}>
        <TextField
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          name="courseCode"
          label="Course Code"
          value={formData.courseCode}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          name="difficulty"
          label="Difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          fullWidth
        >
          {['Easy', 'Normal', 'Hard'].map((option) => (
            <MenuItem key={option} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField
          name="topic"
          label="Topic"
          value={formData.topic}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          name="teacherId"
          label="Teacher"
          value={formData.teacherId}
          onChange={handleChange}
          fullWidth
        >
          {mockTeachers.map((teacher) => (
            <MenuItem key={teacher.id} value={teacher.id}>
              {teacher.name}
            </MenuItem>
          ))}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox 
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
          }
          label="Published"
        />
        <Button variant="contained" size="large">
          {editMode ? 'Update Quiz' : 'Create Quiz'}
        </Button>
      </Stack>
    </Container>
  );
}