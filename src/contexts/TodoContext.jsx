import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
export const TodoContext = createContext();

const TODO_LS_KEY = "todos";
const TODO_COOKIE_NAME = "todos_cookie";
const TODO_SESSION_KEY = "todos_session";

export const TodoProvider = ({ children }) => {
  // 쿠키 라이브러리 사용
  const [cookies, setCookie, removeCookie] = useCookies([TODO_COOKIE_NAME]);
  const [todoList, setTodoList] = useState([]);
  const addTodo = formData => {
    console.log(formData);
    const newTodoData = [...todoList, { ...formData, id: Date.now() }];
    setTodoList(newTodoData);
    // 로컬에 저장함 (합당)
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newTodoData]));
    // 세션에 저장
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));
    // 쿠키에 저장함 (서버자료 보관이 아니라서 비추천)
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };

  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    localStorage.setItem(TODO_LS_KEY, JSON.stringify([...newList]));
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newList]));
    setCookie(TODO_COOKIE_NAME, newList, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
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
    sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify([...newTodoData]));
    setCookie(TODO_COOKIE_NAME, newTodoData, {
      path: "/",
      maxAge: 1 * 24 * 60 * 60,
    });
  };
  const resetTodo = () => {
    setTodoList([]);
    // 로컬 삭제
    localStorage.clear(TODO_LS_KEY);
    sessionStorage.clear(TODO_SESSION_KEY);
    // 쿠키 삭제
    removeCookie(TODO_COOKIE_NAME);
  };

  useEffect(() => {
    const todos = localStorage.getItem(TODO_LS_KEY);
    const todosSession = sessionStorage.getItem(TODO_SESSION_KEY);
    //쿠기 읽기
    const todosCookie = cookies[TODO_COOKIE_NAME];
    //쿠키 초기화
    if (todosCookie) {
      setTodoList(todosCookie);
    } else {
      setCookie(TODO_COOKIE_NAME, [], {
        path: "/",
        maxAge: 1 * 24 * 60 * 60,
      });
    }
    // 로컬 초기화
    if (todos) {
      const datas = JSON.parse(todos);
      setTodoList(datas);
    } else {
      // 없을 때
      localStorage.setItem(TODO_LS_KEY, JSON.stringify(todoList));
    }
    if (todosSession) {
      const datas = JSON.parse(todosSession);
      setTodoList(datas);
    } else {
      // 없을 때
      alert("없네요.");
      sessionStorage.setItem(TODO_SESSION_KEY, JSON.stringify(todoList));
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
