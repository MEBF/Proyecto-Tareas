import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosLoading } from '../TodosLoading';
import { TodosError } from '../TodosError';
import { EmptyTodos } from '../EmptyTodos';
import { CreateTodoButton } from '../CreateTodoButton';
import { TodoContext, TodoProvider } from '../TodoContext';
import { Modal } from '../Modal';
import {TodoForm} from '../TodoForm';

function App() {

  return (
    <TodoProvider>

      <TodoCounter />

      <TodoSearch />

      <TodoContext.Consumer>
        {({
          loading,
          error,
          searchedTodos,
          completeTodo,
          deleteTodo
        }) => (  //los paréntesis indican un return implícito, por lo que no se usa llaves
          <TodoList>
          {loading && (
            <>
              <TodosLoading />
              <TodosLoading />
              <TodosLoading />
            </>
          )} {/* si se está cargando(loading=true), entonces se ejecuta el componente 'TodosLoading' tres veces */}
          {error && <TodosError />}  {/* si ha un error(error=true), entonces se ejecuta el componente 'TodosError' */}
          {(!loading && searchedTodos.length == 0) && <EmptyTodos />} {/* si no se está cargando y nuestro array a iterar es igual de cero, entonces se ejecuta el componente 'EmptyTodos' */}
  
          {searchedTodos.map(todo => (
            <TodoItem 
              key={todo.text}   //cuando un componente es renderizado a partir de un array, debe tener un 'key'(llave) para ser identificada
              text={todo.text}  //dándole valor a las props
              completed={todo.completed}
              onComplete={() => completeTodo(todo.text)}
              onDelete={() => deleteTodo(todo.text)}
            />
          ))}
          </TodoList>
        )}
      </TodoContext.Consumer>

      <TodoContext.Consumer>
        {({
          setOpenModal
        }) => (
          <CreateTodoButton
            setOpenModal={setOpenModal}
          />
        )}
      </TodoContext.Consumer>

      <TodoContext.Consumer>
        {({
          openModal
        }) => (
          openModal && (
          <Modal>
            <TodoForm />
          </Modal>
          )
        )}
      </TodoContext.Consumer>

    </TodoProvider >
  );
}

export default App;
