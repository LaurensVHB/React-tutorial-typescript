import React from 'react';

interface squareProps {
    onClick: () => void;
    value: string
}

export const Square = (props: squareProps) => {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}