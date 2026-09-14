import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AIChatPage() {
    const { sessionID } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // СЛОВАРЬ ДЛЯ ПЕРЕВОДА ЦЕЛЕЙ НА РУССКИЙ ЯЗЫК
    const goalTranslations = {
        loss: 'похудение',
        hold: 'удержание веса',
        gain: 'набор мышечной массы'
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Эмуляция ответа ИИ
        setTimeout(() => {
            // ИСПРАВЛЕНО: Берем перевод из словаря или используем значение по умолчанию, если стейт пустой
            const userGoalRu = goalTranslations[user?.goal] || 'похудение';

            const aiMsg = {
                sender: 'ai',
                text: `Принято! Учитывая ваш возрас и вашу цель, я рекомендую вам: `
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="chat-page" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <button onClick={() => navigate('/account')} style={{ marginBottom: '20px', padding: '6px 12px', cursor: 'pointer' }}>← В кабинет</button>
            <h2 style={{ color: '#10b981' }}>Ваш консультант</h2>

            <div style={{ height: '350px', border: '1px solid #ddd', borderRadius: '8px', overflowY: 'auto', padding: '15px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', alignSelf: 'flex-start', border: '1px solid #e2e8f0' }}>
                    Привет! Я ваш ИИ-помощник. Задайте любой фитнес-вопрос
                </div>

                {messages.map((msg, i) => (
                    <div key={i} style={{
                        padding: '10px',
                        borderRadius: '8px',
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'user' ? '#10b981' : '#fff',
                        color: msg.sender === 'user' ? '#fff' : '#000',
                        border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                    }}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Напишите вопрос..." style={{ flexGrow: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <button onClick={handleSend} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Отправить</button>
            </div>
        </div>
    );
}

export default AIChatPage;
