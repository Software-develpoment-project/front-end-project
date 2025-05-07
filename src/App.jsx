import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Quiz, Category, Home as HomeIcon } from '@mui/icons-material';
import Home from './Dashboard/Homepage';
import Dashboard from './Teacher/Dashboard';
import Quizzes from './Teacher/Quizzes';
import QuizForm from './Teacher/QuizForm';
import Questions from './Teacher/Questions';
import Categories from './Teacher/Categories';

function TeacherLayout({ children }) {
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
        <Toolbar />
        <List>
          <ListItem button component="a" href="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component="a" href="/teacher">
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component="a" href="/teacher/quizzes">
            <ListItemIcon><Quiz /></ListItemIcon>
            <ListItemText primary="Quizzes" />
          </ListItem>
          <ListItem button component="a" href="/teacher/categories">
            <ListItemIcon><Category /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<Home />} />

        {/* Teacher routes */}
        <Route path="/teacher" element={
          <TeacherLayout>
            <Dashboard />
          </TeacherLayout>
        } />
        <Route path="/teacher/quizzes" element={
          <TeacherLayout>
            <Quizzes />
          </TeacherLayout>
        } />
        <Route path="/teacher/quizzes/new" element={
          <TeacherLayout>
            <QuizForm />
          </TeacherLayout>
        } />
        <Route path="/teacher/quizzes/:id/edit" element={
          <TeacherLayout>
            <QuizForm editMode />
          </TeacherLayout>
        } />
        <Route path="/teacher/quizzes/:id/questions" element={
          <TeacherLayout>
            <Questions />
          </TeacherLayout>
        } />
        <Route path="/teacher/categories" element={
          <TeacherLayout>
            <Categories />
          </TeacherLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
