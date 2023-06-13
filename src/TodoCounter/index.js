import React from 'react';
import './TodoCounter.css';
import { TodoContext } from '../TodoContext';

function TodoCounter(/* {total, completed} */){   //estos parámetros que recibe son 'props'

    const {
        completedTodos,
        totalTodos
    } = React.useContext(TodoContext);

    return(
        <h1 className='TodoCounter' >
            Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> TODOs {/* haciendo uso de las props */}
        </h1>
    );
}

export {TodoCounter};