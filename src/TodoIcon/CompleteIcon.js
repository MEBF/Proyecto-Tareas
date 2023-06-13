import React from "react";
import {TodoIcon} from './';    //esta ubicación hace referencia, automáticamente, al index.js

function CompleteIcon({completed, onComplete}){
    return(
        <TodoIcon
            type='check'
            color={completed ? 'green' : 'gray'}
            onClick={onComplete}
        />
    );
}

export {CompleteIcon};