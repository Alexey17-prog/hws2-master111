import React, {useState, useEffect, DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes} from 'react';
import s from './SuperEditableSpan.module.css';
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText';
import editIcon from './editIcon.svg';

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
    value: string;
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanProps?: DefaultSpanPropsType & { defaultText?: string };
};

const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
                                                                autoFocus,
                                                                onBlur,
                                                                onEnter,
                                                                spanProps,
                                                                value,
                                                                onChangeText,
                                                                ...restProps
                                                            }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(value);

    // Синхронизация inputValue с value
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {};

    const onEnterCallback = () => {
        setEditMode(false);
        if (onChangeText) {
            onChangeText(inputValue);
        }
        onEnter?.();
    };

    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false);
        if (onChangeText) {
            onChangeText(inputValue);
        }
        onBlur?.(e);
    };

    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true);
        setInputValue(value);
        onDoubleClick?.(e);
    };

    return (
        <>
            {editMode ? (
                <SuperInputText
                    autoFocus={autoFocus || true}
                    onBlur={onBlurCallback}
                    onEnter={onEnterCallback}
                    className={s.input}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    {...restProps}
                />
            ) : (
                <div className={s.spanBlock}>
                    <img src={editIcon} className={s.pen} alt={'edit'} />
                    <span
                        id={restSpanProps.id}
                        onDoubleClick={onDoubleClickCallBack}
                        className={`${s.span} ${className}`}
                        {...restSpanProps}
                    >
                        {children || inputValue || defaultText}
                    </span>
                </div>
            )}
        </>
    );
};

export default SuperEditableSpan;