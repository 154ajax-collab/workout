
const BASE_URL = 'https://mindtrainer.local';

/**
 * Авторизация пользователя
 * @param {Object} credentials - { username, password }
 */
export async function loginUser(credentials) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Неверный логин или пароль');
    }

    return await response.json(); // Ожидаем { access_token: "..." }
}

/**
 * Регистрация нового фитнес-профиля
 * @param {Object} userData - { name, surname, username, password, age, goal, accessLevel }
 */
export async function registerUser(userData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Ошибка при регистрации профиля');
    }

    return await response.json();
}

/**
 * Получение данных текущего авторизованного пользователя
 */
export async function getCurrentUser() {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Не удалось загрузить профиль пользователя');
    }

    return await response.json();
}
