import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Layout from "./components/layout";


// Placeholder components for now — replace them with your actual components later
const QuizzesPage = () => <h2>Quizzes Page</h2>;
const CategoriesPage = () => <h2>Categories Page</h2>;

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
