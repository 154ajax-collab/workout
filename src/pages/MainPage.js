import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function MainPage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="main-page" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
            {/* Сделали заголовок MindTrainer зеленым */}
            <h1 style={{ color: '#10b981', fontSize: '2.5rem', marginBottom: '10px' }}>MindTrainer</h1>
            <p style={{ fontSize: '1.2rem', color: '#555', lineHeight: '1.6' }}>
                Персонализированные планы тренировок и питания
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', margin: '40px 0' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <h3>🔥 Похудение</h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>Безопасное снижение жировой массы и подбор здорового рациона.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <h3>⚖️ Удержание веса</h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>Закрепление результатов, баланс калорий и контроль активности.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '12px', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <h3>💪 Набор массы</h3>
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>Прогресс нагрузок для построения качественного мышечного рельефа.</p>
                </div>
            </div>

            <div style={{ marginTop: '30px' }}>
                <Link to={isAuthenticated ? "/account" : "/register"} style={{ padding: '14px 28px', background: '#10b981', color: '#fff', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1.05rem', display: 'inline-block', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)', transition: 'background 0.2s' }}>
                    {isAuthenticated ? "Перейти в личный кабинет" : "Начать бесплатно"}
                </Link>
            </div>
        </div>
    );
}

export default MainPage;
