import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function LoginPage() {
    const [username, setUsername] = useState('demo_user');
    const [password, setPassword] = useState('password123');
    const [localError, setLocalError] = useState('');

    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLocalError('');

        try {
            if (login) {
                await login(username, password);
            }
            navigate('/account');
        } catch (err) {
            setLocalError(err.message || 'Ошибка входа');
        }
    };

    const displayError = localError || error;

    return (
        <div className="auth-page" style={{ padding: '40px', maxWidth: '400px', margin: '40px auto', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#10b981', marginBottom: '24px' }}>Вход</h2>

            {displayError && (
                <div style={{ color: 'white', background: '#ef4444', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
                    {displayError}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                    type="text"
                    placeholder="Имя пользователя"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px' }}
                >
                    {loading ? 'Вход...' : 'Войти'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '10px' }}>
                    <Link to="/register" style={{ color: '#10b981', textDecoration: 'none' }}>У меня нет аккаунта</Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
