import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext();

const TODO_LS_KEY = "todos";

export const TodoProvider = ({ children }) => {
  // const [countId, setCountId] = useState(0);
  const [todoList, setTodoList] = useState([]);
  const addTodo = formData => {
    console.log(formData);
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // setCountId(prev => prev + 1);
    // Local Storage에 보관하자.
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // localStorage.setItem(TODO_LS_KEY, JSON.stringify([...todoList]));
  };

  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));
    alert(`${id}삭제했습니다.`);
  };

  const updateTodo = formData => {
    const newTodoData = todoList.map(item => {
      if (formData.id === item.id) {
        return formData;
      } else {
        return item;
      }
    });
    setTodoList(newTodoData);
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
  };
  const resetTodo = () => {
    localStorage.clear(TODO_LS_KEY);
    setTodoList([]);
  };
  // // 상태가 바뀌면 실행하고 싶은 일이 있다.
  // useEffect(() => {
  //   localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
  //   return;
  // }, [todoList]);

  // Context 가 화면에 출력될 때, Local Storage 에서 값을 읽어온다.
  // 이때 Key 는 TODO_LS_KEY 에 담긴 값을 이용해서 가져옮.
  useEffect(() => {
    // 웹브라우저 Local Storage 에 값을 읽어들임
    const todos = localStorage.getItem(TODO_LS_KEY);
    if (todos) {
      //있을 때

      const datas = JSON.parse(todos);
      setTodoList(datas);
      // setCountId();
    } else {
      // 없을 때
      alert("없네요.");
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
      // setCountId(0);
    }
    return () => {};
  }, []);
  return (
    <TodoContext.Provider
      value={{ todoList, addTodo, deleteTodo, updateTodo, resetTodo }}
    >
      {/* 컴포넌트 children 으로 지원 */}
      {children}
    </TodoContext.Provider>
  );
};
