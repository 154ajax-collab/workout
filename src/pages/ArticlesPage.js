import React from 'react';
import { useNavigate } from 'react-router-dom';

// Фейковая база данных фитнес-статей под ТЗ (25-40 лет)
const mockArticles = [
    { id: 1, title: 'ИИ-гид по эффективному похудению для занятых людей', description: 'Как сбросить лишний вес после 30 лет без жестких диет и вреда для здоровья.', category: 'Похудение' },
    { id: 2, title: 'Прогрессия нагрузок: как правильно набирать мышечную массу', description: 'Разбор тренировок для построения качественного мышечного рельефа.', category: 'Набор массы' },
    { id: 3, title: 'Баланс калорий и контроль активности каждый день', description: 'Простые привычки, которые помогут удерживать идеальный вес годами.', category: 'Удержание веса' }
];

function ArticlesPage() {
    const navigate = useNavigate();

    return (
        <div className="articles-page" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>← Назад</button>
            <h2 style={{ color: '#10b981', marginBottom: '24px' }}>База знаний MindTrainer</h2>
            <p style={{ color: '#666', marginBottom: '32px' }}>Полезные статьи и рекомендации, адаптированные под ваши фитнес-цели.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {mockArticles.map(article => (
                    <div
                        key={article.id}
                        onClick={() => navigate(`/articles/${article.id}`)}
                        style={{ padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', cursor: 'pointer', background: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', transition: 'transform 0.2s' }}
                    >
            <span style={{ background: '#e6f4ea', color: '#10b981', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
              {article.category}
            </span>
                        <h3 style={{ margin: '12px 0 8px 0', color: '#333' }}>{article.title}</h3>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', lineHeight: '1.5' }}>{article.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ArticlesPage;
