import React from 'react';
import { Link } from 'react-router-dom';

import { BookOpen, Users } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6f8]">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-12 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
              Welcome to Quizzer
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              The ultimate quiz management platform for teachers and students
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 flex flex-col items-center text-center space-y-4 border border-gray-100">
              <div className="p-3 bg-primary/10 rounded-full">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Teacher Dashboard</h2>
              <p className="text-gray-600">
                Create and manage quizzes, add questions, and organize categories.
              </p>
              <Button asChild className="mt-4" size="lg">
                <Link to="/teacher">Enter Teacher Dashboard</Link>
              </Button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6 flex flex-col items-center text-center space-y-4 border border-gray-100">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Student Dashboard</h2>
              <p className="text-gray-600">
                Take quizzes, view your results, and write reviews.
              </p>
              <Button asChild className="mt-4" size="lg">
                <Link to="/student">Enter Student Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
