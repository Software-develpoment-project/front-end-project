import { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Button, List, ListItem, ListItemText, 
  Divider, Chip, IconButton, TextField, Stack, Alert, Snackbar,
  Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';

export default function Categories() {
  // State variables
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const teacher  = 1
  const [newCategory, setNewCategory] = useState({
    title: '',
    description: ''
  });
  const [editCategory, setEditCategory] = useState({
    id: null,
    title: '',
    description: ''
  });
  const [quizzes, setQuizzes] = useState([]);
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [quizDialogOpen, setQuizDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teacherId, setTeacherId] = useState(1); // Default teacher ID - replace with actual auth

  // API base URL
  const API_BASE_URL = 'http://localhost:8080/api/categories';

  // Fetch all categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories by teacher
  const fetchCategoriesByTeacher = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/teacher?id=1`);
      if (!response.ok) throw new Error('Failed to fetch teacher categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Create a new category
  const createCategory = async () => {
    if (!newCategory.title.trim()) {
      showSnackbar('Category title is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory),
      });
      
      if (!response.ok) throw new Error('Failed to create category');
      
      const createdCategory = await response.json();
      setCategories([...categories, createdCategory]);
      setNewCategory({ title: '', description: '' });
      showSnackbar('Category created successfully', 'success');
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Delete a category
  const deleteCategory = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete category');
      
      setCategories(categories.filter(category => category.id !== id));
      showSnackbar('Category deleted successfully', 'success');
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Open edit dialog
  const handleEditClick = (category) => {
    setEditCategory({
      id: category.id,
      title: category.title,
      description: category.description
    });
    setDialogOpen(true);
  };

  // Update a category
  const updateCategory = async () => {
    if (!editCategory.title.trim()) {
      showSnackbar('Category title is required', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${editCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCategory),
      });
      
      if (!response.ok) throw new Error('Failed to update category');
      
      const updatedCategory = await response.json();
      setCategories(categories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      ));
      setDialogOpen(false);
      showSnackbar('Category updated successfully', 'success');
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Get category by ID
  const getCategoryById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Failed to fetch category');
      const data = await response.json();
      setSelectedCategory(data);
      // Also fetch quizzes for this category
      fetchQuizzesByCategory(id);
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch quizzes by category
  const fetchQuizzesByCategory = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${categoryId}/quizzes`);
      if (!response.ok) throw new Error('Failed to fetch quizzes');
      const data = await response.json();
      setQuizzes(data);
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Open quiz dialog and fetch all available quizzes
  const handleManageQuizzes = async (category) => {
    setSelectedCategory(category);
    await fetchQuizzesByCategory(category.id);
    
    // Here you would fetch all quizzes to populate the dropdown
    // This is a placeholder - you'll need to implement the API endpoint
    try {
      // Assuming there's an API endpoint for fetching all quizzes
      const response = await fetch('/api/quizzes');
      if (response.ok) {
        const data = await response.json();
        setAllQuizzes(data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
    
    setQuizDialogOpen(true);
  };

  // Add quiz to category
  const addQuizToCategory = async () => {
    if (!selectedQuiz) {
      showSnackbar('Please select a quiz', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${selectedCategory.id}/quizzes/${selectedQuiz}`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to add quiz to category');
      
      // Refresh the quizzes list
      await fetchQuizzesByCategory(selectedCategory.id);
      setSelectedQuiz('');
      showSnackbar('Quiz added to category successfully', 'success');
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Remove quiz from category
  const removeQuizFromCategory = async (quizId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${selectedCategory.id}/quizzes/${quizId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to remove quiz from category');
      
      // Refresh the quizzes list
      await fetchQuizzesByCategory(selectedCategory.id);
      showSnackbar('Quiz removed from category successfully', 'success');
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to display snackbar messages
  const showSnackbar = (message, severity) => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Categories Management
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Refresh />}
            onClick={fetchCategories}
            disabled={loading}
          >
            Refresh All Categories
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<Refresh />}
            onClick={fetchCategoriesByTeacher}
            disabled={loading}
          >
            My Categories
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Existing Categories
          </Typography>
          {categories.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              No categories found. Create one to get started.
            </Typography>
          ) : (
            <List>
              {categories.map((category) => (
                <div key={category.id}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1}>
                        <IconButton 
                          edge="end" 
                          color="primary"
                          onClick={() => handleEditClick(category)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          edge="end" 
                          color="error"
                          onClick={() => deleteCategory(category.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={category.title}
                      secondary={category.description}
                      onClick={() => getCategoryById(category.id)}
                      style={{ cursor: 'pointer' }}
                    />
                    <Chip 
                      label={`ID: ${category.id}`} 
                      variant="outlined" 
                      size="small" 
                      sx={{ mr: 2 }}
                    />
                    <Button 
                      size="small" 
                      variant="outlined"
                      onClick={() => handleManageQuizzes(category)}
                    >
                      Manage Quizzes
                    </Button>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            Add New Category
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Category title"
              fullWidth
              value={newCategory.title}
              onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
              required
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
              onClick={createCategory}
              disabled={loading}
            >
              Add Category
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* Edit Category Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1, minWidth: '300px' }}>
            <TextField
              label="Category title"
              fullWidth
              value={editCategory.title}
              onChange={(e) => setEditCategory({...editCategory, title: e.target.value})}
              required
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              value={editCategory.description}
              onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={updateCategory} color="primary" disabled={loading}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Manage Quizzes Dialog */}
      <Dialog 
        open={quizDialogOpen} 
        onClose={() => setQuizDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Manage Quizzes for {selectedCategory?.title}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Add Quiz to Category</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="quiz-select-label">Select Quiz</InputLabel>
                  <Select
                    labelId="quiz-select-label"
                    value={selectedQuiz}
                    label="Select Quiz"
                    onChange={(e) => setSelectedQuiz(e.target.value)}
                  >
                    {allQuizzes.map(quiz => (
                      <MenuItem key={quiz.id} value={quiz.id}>
                        {quiz.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  onClick={addQuizToCategory}
                  disabled={loading || !selectedQuiz}
                >
                  Add Quiz
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Current Quizzes</Typography>
              {quizzes.length === 0 ? (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  No quizzes in this category yet.
                </Typography>
              ) : (
                <List>
                  {quizzes.map(quiz => (
                    <div key={quiz.id}>
                      <ListItem
                        secondaryAction={
                          <IconButton 
                            edge="end" 
                            color="error"
                            onClick={() => removeQuizFromCategory(quiz.id)}
                          >
                            <Delete />
                          </IconButton>
                        }
                      >
                        <ListItemText
                          primary={quiz.title}
                          secondary={quiz.description}
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuizDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}