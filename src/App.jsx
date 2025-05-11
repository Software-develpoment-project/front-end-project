import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, Quiz, People, School, Home as HomeIcon, ListAlt, AddCircle } from '@mui/icons-material';
import Home from './Dashboard/Homepage';
import Quizzes from './Teacher/Quizzes';
import QuizForm from './Teacher/QuizForm';
import Questions from './Teacher/Questions';
import TeacherList from './Admin/Dashboard';
import TeacherForm from './Admin/TeacherForm';
import Categories from './Teacher/Categories';

// Admin Layout Component
function AdminLayout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
        <Toolbar />
        <List>
          <ListItem button component={Link} to="/admin/dashboard">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/admin/teachers">
            <ListItemIcon><People /></ListItemIcon>
            <ListItemText primary="Teacher List" />
          </ListItem>
          <ListItem button component={Link} to="/admin/teachers/new">
            <ListItemIcon><AddCircle /></ListItemIcon>
            <ListItemText primary="Add Teacher" />
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

// Teacher Layout Component
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
          <ListItem button component={Link} to="/teacher">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/teacher/quizzes">
            <ListItemIcon><ListAlt /></ListItemIcon>
            <ListItemText primary="My Quizzes" />
          </ListItem>
          <ListItem button component={Link} to="/teacher/quizzes/new">
            <ListItemIcon><AddCircle /></ListItemIcon>
            <ListItemText primary="Create Quiz" />
          </ListItem>
          <ListItem button component={Link} to="/teacher/category">
            <ListItemIcon><AddCircle /></ListItemIcon>
            <ListItemText primary="Create Category" />
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

        {/* Admin routes */}
        <Route path="/admin" element={
          <AdminLayout>
            <TeacherList />
          </AdminLayout>
        } />
        
        <Route path="/admin/dashboard" element={
          <AdminLayout>
            <TeacherList />
          </AdminLayout>
        } />
        <Route path="/admin/teachers" element={
          <AdminLayout>
            <TeacherList />
          </AdminLayout>
        } />
        <Route path="/admin/teachers/new" element={
          <AdminLayout>
            <TeacherForm />
          </AdminLayout>
        } />
        <Route path="/admin/teachers/:id/edit" element={
          <AdminLayout>
            <TeacherForm editMode />
          </AdminLayout>
        } />

        {/* Teacher routes */}
        <Route path="/teacher" element={
          <TeacherLayout>
            <Quizzes />
          </TeacherLayout>
        } />
        
        <Route path="/teacher/quizzes" element={
          <TeacherLayout>
            <Quizzes />
          </TeacherLayout>
        } />
        <Route path="/teacher/category" element={
          <TeacherLayout>
            <Categories />
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

        {/* Student route */}
        <Route path="/student-dashboard" element={<div>Student Dashboard</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;