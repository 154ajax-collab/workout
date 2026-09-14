import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Локальный фейковый профиль для мгновенного входа без бэкенда
    const mockUser = {
        name: 'Иван',
        surname: 'Иванов',
        username: 'demo_user',
        age: 30,
        goal: 'loss',
        accessLevel: 'free'
    };




    const login = useCallback(async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            // ИМИТАЦИЯ НАСТОЯЩЕЙ ПРОВЕРКИ ДЛЯ ТЕСТА ОШИБКИ:
            // Если введенный пароль НЕ совпадает с "password123", мы принудительно вызываем сбой
            if (password !== 'password123') {
                throw new Error('Неверное имя пользователя или пароль. Попробуйте еще раз.');
            }

            // Если пароль правильный — пускаем дальше
            const fakeToken = 'mock-jwt-token-12345';
            localStorage.setItem('authToken', fakeToken);
            setToken(fakeToken);
            setUser(mockUser);

            return { access_token: fakeToken };
        } catch (err) {
            setError(err.message); // Передаем текст ошибки в интерфейс формы
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);






    const register = useCallback(async (name, surname, username, password, age, goal, accessLevel = 'free') => {
        setLoading(true);
        setError(null);
        try {
            // Сохраняем введенные в анкету фитнес-данные в стейт пользователя
            const newUser = {
                name,
                surname,
                username,
                age: parseInt(age, 10),
                goal,
                accessLevel
            };

            const fakeToken = 'mock-jwt-token-reg';
            localStorage.setItem('authToken', fakeToken);
            setToken(fakeToken);
            setUser(newUser);

            return { access_token: fakeToken };
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        setError(null);
    }, []);

    // Восстанавливаем сессию при перезагрузке страницы, если токен есть
    useEffect(() => {
        if (token && !user) {
            setUser(mockUser);
        }
    }, [token, user]);

    const value = {
        token,
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!token,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
