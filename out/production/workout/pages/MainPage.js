import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function MainPage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="main-page" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h1>Фитнес-платформа с ИИ-ассистентом</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>
                Персонализированные планы тренировок и питания на базе GigaChat для мужчин и женщин от 25 до 40 лет.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '40px 0' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
                    <h3>🔥 Похудение</h3>
                    <p>Безопасное снижение жировой массы и подбор рациона нейросетью.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
                    <h3>⚖️ Удержание веса</h3>
                    <p>Закрепление результатов, баланс калорий и контроль активности.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
                    <h3>💪 Набор массы</h3>
                    <p>Прогрессия нагрузок для построения качественного мышечного рельефа.</p>
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <Link to={isAuthenticated ? "/account" : "/register"} style={{ padding: '14px 28px', background: '#25598d', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
                    {isAuthenticated ? "Перейти в личный кабинет" : "Начать бесплатно"}
                </Link>
            </div>
        </div>
    );
}

export default MainPage;
