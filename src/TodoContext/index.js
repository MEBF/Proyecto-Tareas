import React, { Children } from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({children}) {

    const {
        item: todos,
        saveItem: saveTodos,  //de esta manera estamos renombrando las propiedades de un objeto, 'item' ahora se llama'todos' y 'saveItem' ahora es 'saveTodos'
        loading,
        error
    } = useLocalStorage('TODOS_V1', []);
    const [searchValue, setSearchValue] = React.useState('');
    
    const [openModal, setOpenModal] = React.useState(false);    //el modal (portal) iniciará cerrado (en false)
    
    //las dos variables que se encuentran a continuación se denominan ESTADOS DERIVADOS, ya que hacen uso del valor de un estado para obtener nuevos cálculos
    const completedTodos = todos.filter(todo => todo.completed).length; //para calcular la cantidad de tareas completadas
    const totalTodos = todos.length;  //cantidad total de tareas
    
    const searchedTodos = todos.filter((todo) => {
        return todo.text.toLowerCase().includes(searchValue.toLowerCase());
    });
    
    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
          (todo) => todo.text == text
        );
        newTodos[todoIndex].completed = true;
        saveTodos(newTodos);
    }
    
    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(
          (todo) => todo.text == text
        );
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
    }

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({
            text,
            completed: false
        });
        saveTodos(newTodos);
    }
    
    console.log('hola');

    return(
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            openModal,
            setOpenModal,
            addTodo
        }} >    {/* todo lo que esté dentro de 'value' es lo que se podrá exponer en el contexto de nuestra aplicación */}
            {children}
        </TodoContext.Provider>
    );
}

export {TodoContext, TodoProvider};