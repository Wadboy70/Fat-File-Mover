import React from 'react';
import './Button.css';


const Burtun = (props) => {
    const {children, onClick} = props;
    return(
        <button 
            onClick = {e => {
                e.preventDefault();
                onClick(e);
            }}
            className = 'buttonbaybee'
            { ...props }
        >
            {
                children ?? children
            }
        </button>
    );
};

export default Burtun;