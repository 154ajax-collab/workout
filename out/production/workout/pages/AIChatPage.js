import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function AIChatPage() {
    const { sessionID } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Эмуляция ответа ИИ (в будущем подключите к Python/GigaChat API)
        setTimeout(() => {
            const aiMsg = { sender: 'ai', text: `Принято! Учитывая ваш возраст (${user?.age || 30} лет) и цель (${user?.goal || 'похудение'}), я рекомендую скорректировать меню. Что именно вы хотите разобрать?` };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    return (
        <div className="chat-page" style={{ padding: '40px', maxWidth: '700px', margin: '0 auto' }}>
            <button onClick={() => navigate('/account')} style={{ marginBottom: '20px', padding: '6px 12px' }}>← В кабинет</button>
            <h2>ИИ-Фитнес Консультант</h2>

            <div style={{ height: '350px', border: '1px solid #ddd', borderRadius: '8px', overflowY: 'auto', padding: '15px', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', alignSelf: 'flex-start', border: '1px solid #e2e8f0' }}>
                    Привет! Я ваш ИИ-помощник. Задайте любой вопрос по тренировкам или диете под вашу цель.
                </div>
                {messages.map((msg, i) => (
                    <div key={i} style={{
                        padding: '10px',
                        borderRadius: '8px',
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'user' ? '#25598d' : '#fff',
                        color: msg.sender === 'user' ? '#fff' : '#000',
                        border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                    }}>
                        {msg.text}
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Напишите вопрос..." style={{ flexGrow: 1, padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
                <button onClick={handleSend} style={{ padding: '10px 20px', background: '#25598d', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Отправить</button>
            </div>
        </div>
    );
}

export default AIChatPage;
