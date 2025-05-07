import { useState } from 'react';
import { Container, Typography, Grid, Button, List, ListItem, ListItemText, Divider, Chip, IconButton, TextField, Stack } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { mockCategories } from '../../mockData';

export default function Categories() {
  const [categories] = useState(mockCategories);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Existing Categories
          </Typography>
          <List>
            {categories.map((category) => (
              <div key={category.id}>
                <ListItem
                  secondaryAction={
                    <IconButton edge="end" color="error">
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={category.name}
                    secondary={category.description}
                  />
                  <Chip label={`ID: ${category.id}`} variant="outlined" size="small" />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Add New Category
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Category Name"
              fullWidth
              value={newCategory.name}
              onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              value={newCategory.description}
              onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
            />
            <Button 
              variant="contained" 
              size="large"
              startIcon={<Add />}
            >
              Add Category
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}