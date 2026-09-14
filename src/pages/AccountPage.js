import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Добавили Link
import { useAuth } from '../hooks/useAuth';

function AccountPage() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) navigate('/login');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (!isAuthenticated) return;
        try {
            const storageKey = user?.id ? `fitnessAi_${user.id}` : 'fitnessAi_guest';
            const raw = localStorage.getItem(storageKey);
            setSessions(raw ? JSON.parse(raw) : []);
        } catch {
            setSessions([]);
        }
    }, [isAuthenticated, user?.id]);

    const handleCreateSession = () => {
        const sessionId = 'session_' + Date.now();
        const newSession = { id: sessionId, date: new Date().toLocaleDateString('ru-RU') };
        const updated = [newSession, ...sessions];
        setSessions(updated);

        const storageKey = user?.id ? `fitnessAi_${user.id}` : 'fitnessAi_guest';
        localStorage.setItem(storageKey, JSON.stringify(updated));

        navigate(`/ai-assistant/${sessionId}`);
    };

    if (!isAuthenticated) return null;

    return (
        <div className="account-page" style={{ padding: '40px', maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <div>
                    <h2 style={{ margin: 0 }}>Привет, {user?.name || 'Пользователь'}!</h2>
                    <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '0.95rem' }}>
                        Возраст: <span style={{ color: '#10b981', fontWeight: 'bold' }}>{user?.age || 30} лет</span> | Цель: <span style={{ color: '#10b981', fontWeight: 'bold' }}>{user?.goal === 'loss' ? 'Похудение' : user?.goal === 'gain' ? 'Набор массы' : 'Удержание'}</span>
                    </p>

                    {/* ИСПРАВЛЕНО: Добавили ссылку для быстрого перехода в базу знаний */}
                    <div style={{ marginTop: '12px' }}>
                        <Link to="/articles" style={{ color: '#10b981', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', borderBottom: '1px dashed #10b981' }}>
                            📚 Перейти в базу знаний фитнес-статей
                        </Link>
                    </div>
                </div>
                <button onClick={logout} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Выход</button>
            </div>

            <h3 style={{ marginTop: '30px', color: '#333' }}>Ваши консультации с ИИ</h3>
            <button onClick={handleCreateSession} style={{ padding: '12px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '20px', fontSize: '1rem', transition: 'background 0.2s' }}>
                + Начать новую ИИ-консультацию
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sessions.map(session => (
                    <div key={session.id} onClick={() => navigate(`/ai-assistant/${session.id}`)} style={{ padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'border-color 0.2s' }}>
                        <strong style={{ color: '#333' }}>Консультация от {session.date}</strong>
                        <span style={{ float: 'right', color: '#10b981', fontWeight: 'bold' }}>Продолжить диалог →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccountPage;
