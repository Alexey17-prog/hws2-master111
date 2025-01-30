import React, { useState } from 'react';
import { v1 } from 'uuid';
import s2 from '../../s1-main/App.module.css';
import GreetingContainer from './GreetingContainer';

export type UserType = {
    _id: string; // Оставляем _id как строку
    name: string;
    age: number;
};

export const pureAddUserCallback = (
    name: string,
    setUsers: React.Dispatch<React.SetStateAction<UserType[]>>,
    users: UserType[]
) => {
    const user: UserType = {
        _id: v1(),
        name,
        age: 30
    };
    setUsers([...users, user]);
};

const HW3 = () => {
    const [users, setUsers] = useState<UserType[]>([]);

    const addUserCallback = (name: string) => {
        pureAddUserCallback(name, setUsers, users);
    };

    return (
        <div id={'hw3'}>
            <div className={s2.hwTitle}>Homework #3</div>
            <div className={s2.hw}>
                <GreetingContainer
                    users={users}
                    addUserCallback={addUserCallback}
                />
            </div>
        </div>
    );
};

export default HW3;
