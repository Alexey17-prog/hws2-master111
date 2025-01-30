import React from 'react';
import s from './Greeting.module.css';

type GreetingPropsType = {
    name: string; // Имя пользователя
    setNameCallback: (e: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения имени
    addUser: () => void; // Функция для добавления пользователя
    onBlur: () => void; // Обработчик потери фокуса
    onEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Обработчик нажатия клавиши Enter
    error: string; // Сообщение об ошибке
    totalUsers: number; // Общее количество пользователей
    lastUserName?: string; // Имя последнего пользователя (необязательное)
};

const Greeting: React.FC<GreetingPropsType> = ({
                                                   name,
                                                   setNameCallback,
                                                   addUser,
                                                   onBlur,
                                                   onEnter,
                                                   error,
                                                   totalUsers,
                                                   lastUserName,
                                               }) => {
    const inputClass = error ? s.errorInput : s.input; // Класс зависит от наличия ошибки

    return (
        <div id={'hw3-form'} className={s.greetingForm}>
            <div className={s.text}>
                {'Людей добавили: '}
                <span id={'hw3-users-total'}>
                    {totalUsers}
                </span>
            </div>

            <div className={s.inputAndButtonContainer}>
                <div>
                    <input
                        id={'hw3-input'}
                        value={name}
                        onChange={setNameCallback}
                        className={inputClass}
                        onKeyDown={onEnter} // Используем onKeyDown для обработки нажатий клавиш
                        onBlur={onBlur} // Обработка потери фокуса
                    />
                    {error && <div id={'hw3-error'} className={s.error}>{error}</div>} {/* Отображаем ошибку */}
                </div>

                <button
                    id={'hw3-button'}
                    onClick={addUser} // Добавление пользователя при нажатии кнопки
                    className={s.button}
                    disabled={!name.trim()} // Дизаблим кнопку, если имя пустое
                >
                    Добавить
                </button>
            </div>

            {lastUserName && (
                <div className={s.greeting}>
                    Привет <span id={'hw3-last-user'}>{lastUserName}</span>! {/* Приветствие последнего пользователя */}
                </div>
            )}
        </div>
    );
};

export default Greeting;
