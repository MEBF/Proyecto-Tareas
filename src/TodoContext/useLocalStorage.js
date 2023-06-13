import React from "react";

function useLocalStorage(itemName, initialValue) {
  
  const [item, setItem] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(true); //estado para saber si aún se está cargando o ya no
  const [error, setError] = React.useState(false);  //estado para saber si hay un error o no
  
  React.useEffect(() =>{
    setTimeout(() => {
      try{
        const localStorageItem = localStorage.getItem(itemName); //almacenando el valor del elemento 'TODOS_V1' del localStorage en la constante 'localStorageTodos'
      
        let parsedItem;
  
        if(localStorageItem){  //si localStorageTodos no está vacío
          parsedItem = JSON.parse(localStorageItem);  //a la variable 'parsedTodos' se le asigna el valor de 'localStorageTodos' traducida de un string de tipo JSON (ESPERANDO QUE SEA UN ARRAY)
          setItem(parsedItem);  //si ya existe algo en el localStorage, se lo asignamos al estado 'item'
        }else{  //si localStorageTodos está vacío
          localStorage.setItem(itemName, JSON.stringify(initialValue));  //en el localStorage se crea el elemento 'TODOS_V1' con el valor de 'parsedTodos'(una cadena vacía) convertida en un string de tipo JSON
          parsedItem = initialValue;
        }
  
        setLoading(false);
      } catch(error){
        setLoading(false);  //si algo falla debemos detener el estado de carga
        setError(true);
      }
    }, 3000); //el setTimeout ejecuta la función que tiene dentro, después del tiempo indicado en milisegundos en el segundo argumento(2000)
  }, []);
    
  const saveItem = (newItem) => { //función para actualizar el array del localStorage 'TODOS_V1' y el estado 'todos'
    localStorage.setItem(itemName, JSON.stringify(newItem)); 
    setItem(newItem);
  };
  
  //return [item, saveItem, loading, error];
  //cuando un custom hook va a devolver más de dos variables, lo mejor es hacerlo mediante un objeto en lugar de un array
  return {
    item,
    saveItem,
    loading,
    error};
}

export {useLocalStorage};

/* const defaultTodos = [
  {
    text: 'Cortar cebolla',
    completed: true
  },
  {
    text: 'Tomar el curso de React',
    completed: false
  },
  {
    text: 'Llorar con la llorona',
    completed: false
  },
  {
    text: 'LALALAALALA',
    completed: false
  },
  {
    text: 'gadgsags',
    completed: false
  }
];

localStorage.setItem('TODOS_V1', defaultTodos);
localStorage.removeItem('TODOS_V1'); */

/* Todo lo que se guarde en localStorage tiene que ser un String, ya que no tiene la capacidad de almacenar variables complejas */