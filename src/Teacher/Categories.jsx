import { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Button, List, ListItem, 
  Divider, Chip, IconButton, TextField, Stack, Alert, 
  Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, 
  Select, MenuItem, FormControl, InputLabel, Box, Paper, CircularProgress
} from '@mui/material';
import { Add, Delete, Edit, Refresh } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setCategoriesList } from '../redux/features/counterSlice';

export default function Categories() {
  // State variables
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
  const dispatch = useDispatch()

  // API base URL
  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/categories`;

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
      dispatch(setCategoriesList(data))
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
      dispatch(setCategoriesList([...categories, createdCategory]))
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
    
    try {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 4,
        gap: 2
      }}>
        <Typography variant="h4" component="h1" sx={{ mb: { xs: 2, sm: 0 } }}>
          Categories Management
        </Typography>
        
        <Stack direction="row" spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Refresh />}
            onClick={fetchCategories}
            disabled={loading}
            fullWidth={window.innerWidth < 600}
          >
            All Categories
          </Button>
          <Button 
            variant="contained" 
            color="secondary"
            startIcon={<Refresh />}
            onClick={fetchCategoriesByTeacher}
            disabled={loading}
            fullWidth={window.innerWidth < 600}
          >
            My Categories
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Existing Categories
            </Typography>
            
            {loading && categories.length === 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : categories.length === 0 ? (
              <Typography variant="body1" color="textSecondary" sx={{ py: 2 }}>
                No categories found. Create one to get started.
              </Typography>
            ) : (
              <Box sx={{ maxHeight: '500px', overflow: 'auto' }}>
                <List>
                  {categories.map((category) => (
                    <div key={category.id}>
                      <ListItem
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: 'flex-start',
                          '&:hover': {
                            backgroundColor: 'action.hover',
                          }
                        }}
                      >
                        <Box sx={{ flexGrow: 1, width: '100%' }}>
                          <Typography variant="subtitle1" fontWeight="medium">
                            {category.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {category.description}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          mt: { xs: 1, sm: 0 },
                          width: { xs: '100%', sm: 'auto' }
                        }}>
                          <Chip 
                            label={`ID: ${category.id}`} 
                            variant="outlined" 
                            size="small" 
                            sx={{ mr: 1 }}
                          />
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => handleManageQuizzes(category)}
                            sx={{ mr: 1 }}
                          >
                            Manage Quizzes
                          </Button>
                          <IconButton 
                            color="primary"
                            onClick={() => handleEditClick(category)}
                            size="small"
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton 
                            color="error"
                            onClick={() => deleteCategory(category.id)}
                            size="small"
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </ListItem>
                      <Divider />
                    </div>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Add New Category
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Category title"
                fullWidth
                value={newCategory.title}
                onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                required
                variant="outlined"
              />
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                variant="outlined"
              />
              <Button 
                variant="contained" 
                size="large"
                startIcon={<Add />}
                onClick={createCategory}
                disabled={loading}
                sx={{ alignSelf: 'flex-start' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Category'}
              </Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Edit Category Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Category title"
              fullWidth
              value={editCategory.title}
              onChange={(e) => setEditCategory({...editCategory, title: e.target.value})}
              required
              variant="outlined"
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              value={editCategory.description}
              onChange={(e) => setEditCategory({...editCategory, description: e.target.value})}
              variant="outlined"
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={updateCategory} 
            color="primary" 
            variant="contained" 
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Save Changes'}
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
              <Typography variant="subtitle1" gutterBottom>Add Quiz to Category</Typography>
              <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="quiz-select-label">Select Quiz</InputLabel>
                  <Select
                    labelId="quiz-select-label"
                    value={selectedQuiz}
                    label="Select Quiz"
                    onChange={(e) => setSelectedQuiz(e.target.value)}
                    variant="outlined"
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
                  sx={{ minWidth: '120px' }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Add Quiz'}
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>Current Quizzes</Typography>
              {quizzes.length === 0 ? (
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                  No quizzes in this category yet.
                </Typography>
              ) : (
                <Paper variant="outlined" sx={{ mt: 1 }}>
                  <List>
                    {quizzes.map(quiz => (
                      <div key={quiz.id}>
                        <ListItem
                          secondaryAction={
                            <IconButton 
                              edge="end" 
                              color="error"
                              onClick={() => removeQuizFromCategory(quiz.id)}
                              size="small"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemText
                            primary={
                              <Typography variant="subtitle2">
                                {quiz.title}
                              </Typography>
                            }
                            secondary={quiz.description}
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </List>
                </Paper>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={() => setQuizDialogOpen(false)} 
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}