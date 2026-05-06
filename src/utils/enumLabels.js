/** Подписи для значений enum в БД (англ.) на страницах (рус.). */

export const computerStatusLabel = (v) =>
    ({ free: 'Свободен', busy: 'Занят', maintenance: 'На ремонте' }[v] || v);

export const rentalStatusLabel = (v) =>
    ({ waiting: 'Ожидает', active: 'Активна', completed: 'Завершена', canceled: 'Отменена' }[v] || v);

export const timeDayLabel = (v) =>
    ({ morning: 'Утро', afternoon: 'День', evening: 'Вечер', night: 'Ночь' }[v] || v);

export const specTypeLabel = (v) =>
    ({ weak: 'Слабый ПК', average: 'Средний ПК', powerful: 'Мощный ПК' }[v] || v);
