import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react';
import s from './SuperSelect.module.css';

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: { id: number; value: string }[];
    onChangeOption?: (option: number) => void;
};

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         className,
                                                         onChange,
                                                         onChangeOption,
                                                         value,
                                                         ...restProps
                                                     }) => {
    const mappedOptions: any[] = options
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option}
                key={o.id}
                value={o.id} // Используем id как значение
            >
                {o.value} {/* Отображаемое значение */}
            </option>
        ))
        : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value); // Преобразуем значение в число
        if (onChangeOption) {
            onChangeOption(selectedValue); // Вызываем колбек с выбранным id
        }
        if (onChange) {
            onChange(e); // Вызываем стандартный обработчик, если он передан
        }
    };

    const finalSelectClassName = s.select + (className ? ' ' + className : '');

    return (
        <select
            className={finalSelectClassName}
            onChange={onChangeCallback}
            value={value} // Устанавливаем текущее значение
            {...restProps}
        >
            {mappedOptions}
        </select>
    );
};

export default SuperSelect;