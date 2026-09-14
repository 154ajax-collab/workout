import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="account-page" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                <div>
                    <h2>Привет, {user?.name || 'Пользователь'}!</h2>
                    <p style={{ margin: '5px 0 0 0', color: '#666' }}>Возраст: {user?.age || 30} лет | Цель: {user?.goal === 'loss' ? 'Похудение' : user?.goal === 'gain' ? 'Набор массы' : 'Удержание'}</p>
                </div>
                <button onClick={logout} style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Выход</button>
            </div>

            <h3 style={{ marginTop: '30px' }}>Ваши консультации с ИИ</h3>
            <button onClick={handleCreateSession} style={{ padding: '12px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: '20px' }}>
                + Начать новую ИИ-консультацию
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sessions.map(session => (
                    <div key={session.id} onClick={() => navigate(`/ai-assistant/${session.id}`)} style={{ padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer', background: '#fff' }}>
                        <strong>Консультация от {session.date}</strong>
                        <span style={{ float: 'right', color: '#25598d' }}>Продолжить диалог →</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccountPage;
