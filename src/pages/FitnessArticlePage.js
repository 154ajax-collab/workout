import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockArticlesContent = {
    1: { title: 'ИИ-гид по эффективному похудению для занятых людей', text: 'Для людей в возрасте 25–40 лет метаболизм начинает постепенно перестраиваться. Главный секрет похудения — это не отказ от еды, а создание небольшого дефицита калорий (10-15%) и поддержание бытовой активности. Наш ИИ-ассистент рекомендует делать упор на белковую пищу и проходить не менее 8000 шагов в день. Это позволит снижать именно жировую массу, сохраняя тонус мышц.' },
    2: { title: 'Прогрессия нагрузок: как правильно набирать мышечную массу', text: 'Чтобы мышцы росли, им нужен постоянный стимул. Вы должны постепенно увеличивать рабочий вес в упражнениях или количество повторений. Не забывайте про профицит калорий: организму нужен строительный материал для новых мышечных волокон. Спите не менее 7-8 часов, так как мышцы растут именно во время отдыха, а не на тренировке.' },
    3: { title: 'Баланс калорий и контроль активности каждый день', text: 'Удержание веса — это искусство баланса. Сколько калорий вы получили с едой, столько же должны потратить за сутки. Используйте умные трекеры и весы. Если вы заметили, что вес начинает ползти вверх, просто увеличьте количество шагов или добавьте одну легкую кардио-тренировку в неделю вместо урезания любимых продуктов.' }
};

function FitnessArticlePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = mockArticlesContent[id];

    if (!article) {
        return <div style={{ padding: '40px', textAlign: 'center' }}>Статья не найдена.</div>;
    }

    return (
        <div className="article-detail-page" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif', lineHeight: '1.6' }}>
            <button onClick={() => navigate('/articles')} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>← К списку статей</button>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>{article.title}</h1>
            <div style={{ borderTop: '2px solid #10b981', paddingTop: '20px', color: '#444', fontSize: '1.05rem', textAlign: 'justify' }}>
                {article.text}
            </div>
        </div>
    );
}

export default FitnessArticlePage;
