import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import AIChatPage from './pages/AIChatPage';
import ArticlesPage from './pages/ArticlesPage';
import FitnessArticlePage from './pages/FitnessArticlePage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Публичные страницы */}
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/articles" element={<ArticlesPage />} />
                        <Route path="/articles/:id" element={<FitnessArticlePage />} />

                        {/* Приватные страницы */}
                        <Route
                            path="/account"
                            element={
                                <ProtectedRoute>
                                    <AccountPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/ai-assistant/:sessionID"
                            element={
                                <ProtectedRoute>
                                    <AIChatPage />
                                </ProtectedRoute>
                            }
                        />

                        {/* Перенаправление на главную, если роут не найден */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
