import React from 'react'
import { UserType } from './HW8'
import s from './HW8.module.css'

type UserPropsType = {
    u: UserType
}

const User: React.FC<UserPropsType> = ({ u }) => {
    return (
        <tr id={`hw8-user-${u._id}`} className={s.item}>
            <td id={`hw8-user-name-${u._id}`} className={s.nameCol}>
                {u.name} {/* Отображаем имя пользователя */}
            </td>
            <td id={`hw8-user-age-${u._id}`} className={s.ageCol}>
                {u.age} {/* Отображаем возраст пользователя */}
            </td>
        </tr>
    )
}

export default User