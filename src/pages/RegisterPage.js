import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function RegisterPage() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [age, setAge] = useState('');
    const [goal, setGoal] = useState('loss');
    const [accessLevel, setAccessLevel] = useState('free');
    const [localError, setLocalError] = useState('');

    const { register, loading, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLocalError('');

        if (password !== confirmPassword) {
            setLocalError('Пароли не совпадают');
            return;
        }

        const parsedAge = parseInt(age, 10);
        if (parsedAge < 25 || parsedAge > 40) {
            setLocalError('Основная программа MVP рассчитана на возраст от 25 до 40 лет');
            return;
        }

        try {
            if (register) {
                await register(name, surname, username, password, parsedAge, goal, accessLevel);
            }
            navigate('/account');
        } catch (err) {
            setLocalError(err.message || 'Ошибка регистрации');
        }
    };

    return (
        <div className="auth-page" style={{ padding: '40px', maxWidth: '500px', margin: '40px auto', border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontFamily: 'sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#10b981' }}>Регистрация фитнес-профиля</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '24px' }}>
                Заполните анкету для ИИ-генерации персонального плана
            </p>

            {(localError || error) && (
                <div style={{ color: 'white', background: '#ef4444', padding: '10px', borderRadius: '6px', marginBottom: '16px', fontSize: '0.9rem', textAlign: 'center' }}>
                    {localError || error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <input type="text" placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                    <input type="text" placeholder="Фамилия" value={surname} onChange={e => setSurname(e.target.value)} required style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                </div>

                {/* Убрали скобки "(целевой: 25-40)" */}
                <input type="number" placeholder="Возраст" value={age} onChange={e => setAge(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#444' }}>
                    Ваша главная цель:
                    <select value={goal} onChange={e => setGoal(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' }}>
                        <option value="loss">Похудение</option>
                        <option value="hold">Удержание веса</option>
                        <option value="gain">Набор мышечной массы</option>
                    </select>
                </label>

                <label style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem', color: '#444' }}>
                    Уровень доступа:
                    <select value={accessLevel} onChange={e => setAccessLevel(e.target.value)} style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc', background: '#fff' }}>
                        {/* Убрали пояснения в скобках */}
                        <option value="free">Бесплатный</option>
                        <option value="medium">Средний</option>
                        <option value="pro">Профессиональный</option>
                    </select>
                </label>

                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '8px 0' }} />

                <input type="text" placeholder="Имя пользователя (логин)" value={username} onChange={e => setUsername(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <input type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />

                {}
                <button type="submit" disabled={loading} style={{ padding: '12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '10px', transition: 'background 0.2s' }}>
                    {loading ? 'Создание аккаунта...' : 'Зарегистрироваться'}
                </button>

                <div style={{ textAlign: 'center', fontSize: '0.9rem', marginTop: '10px' }}>
                    {/* Ссылка теперь тоже зеленая */}
                    <Link to="/login" style={{ color: '#10b981', textDecoration: 'none' }}>У меня уже есть аккаунт</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
