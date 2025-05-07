import { useState } from 'react';
import { Container, Typography, Button, Card, CardContent, Chip, Stack, ButtonGroup } from '@mui/material';
import { Add, Edit, Delete, Visibility } from '@mui/icons-material';
import {mockQuizzes }from '../../mockData';
import { Link } from 'react-router-dom';

export default function Quizzes() {
  const [quizzes] = useState(mockQuizzes);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Quizzes
        <Button 
          component={Link} 
          to="/quizzes/new" 
          variant="contained" 
          startIcon={<Add />}
          sx={{ float: 'right' }}
        >
          New Quiz
        </Button>
      </Typography>

      {quizzes.map((quiz) => (
        <Card key={quiz.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5">{quiz.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {quiz.description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label={quiz.courseCode} size="small" />
              <Chip 
                label={quiz.published ? "Published" : "Draft"} 
                color={quiz.published ? "success" : "default"} 
                size="small" 
              />
              <Chip label={quiz.difficulty} size="small" />
            </Stack>
            <ButtonGroup size="small">
              <Button 
                component={Link} 
                to={`/quizzes/${quiz.id}/questions`}
                startIcon={<Visibility />}
              >
                View
              </Button>
              <Button 
                component={Link} 
                to={`/quizzes/${quiz.id}/edit`}
                startIcon={<Edit />}
              >
                Edit
              </Button>
              <Button 
                startIcon={<Delete />}
                color="error"
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}