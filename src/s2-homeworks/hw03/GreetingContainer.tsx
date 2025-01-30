import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Greeting from './Greeting';
import { UserType } from './HW3';

type GreetingContainerPropsType = {
    users: UserType[];
    addUserCallback: (name: string) => void;
};

// Функция для добавления пользователя
export const pureAddUser = (
    name: string,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    addUserCallback: (name: string) => void
) => {
    if (!name.trim()) {
        setError('Ошибка: имя не может быть пустым');
    } else {
        addUserCallback(name);
        setName('');
    }
};

// Функция для проверки имени при потере фокуса
export const pureOnBlur = (name: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    if (!name.trim()) {
        setError('Ошибка: имя не может быть пустым');
    }
};

// Функция для обработки нажатия клавиши Enter
export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    if (e.key === 'Enter') {
        addUser();
    }
};

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Обработчик изменения имени
    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        setError(''); // Сбрасываем ошибку при каждом изменении
    };

    // Добавление пользователя
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback);
    };

    // Обработка потери фокуса
    const onBlur = () => {
        pureOnBlur(name, setError);
    };

    // Обработка нажатия клавиши Enter
    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser);
    };

    const totalUsers = users.length;
    const lastUserName = totalUsers > 0 ? users[totalUsers - 1].name : '';

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    );
};

export default GreetingContainer;
