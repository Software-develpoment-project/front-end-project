import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Quiz, Category } from '@mui/icons-material';
import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';
import QuizForm from './pages/QuizForm';
import Questions from './pages/Questions';
import Categories from './pages/Categories';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Teacher Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Toolbar /> {/* Spacer for AppBar */}
        <List>
          <ListItem button component="a" href="/">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component="a" href="/quizzes">
            <ListItemIcon><Quiz /></ListItemIcon>
            <ListItemText primary="Quizzes" />
          </ListItem>
          <ListItem button component="a" href="/categories">
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Spacer for AppBar */}
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/quizzes" element={<Quizzes />} />
          <Route path="/quizzes/new" element={<QuizForm />} />
          <Route path="/quizzes/:id/edit" element={<QuizForm editMode />} />
          <Route path="/quizzes/:id/questions" element={<Questions />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;