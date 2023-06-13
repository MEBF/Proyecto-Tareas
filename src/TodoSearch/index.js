import React from 'react';
import './TodoSearch.css';
import { TodoContext } from '../TodoContext';


function TodoSearch(/* {searchValue, setSearchValue} */){

    const {
        searchValue,
        setSearchValue
    } = React.useContext(TodoContext);

    return(
        <input className="TodoSearch" placeholder="Cortar cebolla" value={searchValue}
        onChange={(event) => {
            /* console.log('escribiste en el TodoSearch')
            console.log(event)
            console.log(event.target)   //ver desde qué elemento se disparó el evento
            console.log(event.target.value) //obteniendo el valor del input */
            setSearchValue(event.target.value);
        }} />
    );
}

export {TodoSearch};