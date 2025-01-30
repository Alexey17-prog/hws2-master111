import { UserType } from '../HW8'

type ActionType =
    | { type: 'sort'; payload: 'up' | 'down' }
    | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => {
    switch (action.type) {
        case 'sort': {
            const sortedState = [...state].sort((a, b) => {
                if (action.payload === 'up') {
                    return a.name.localeCompare(b.name) // Сортировка по имени в алфавитном порядке
                } else {
                    return b.name.localeCompare(a.name) // Сортировка по имени в обратном порядке
                }
            })
            return sortedState
        }
        case 'check': {
            return state
                .filter(user => user.age >= action.payload) // Фильтрация по возрасту
                .sort((a, b) => b.age - a.age) // Сортировка по возрасту в порядке убывания
        }
        default:
            return state
    }
}