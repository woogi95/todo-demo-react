import { useEffect } from "react";
import TodoItem from "../../components/todo/TodoItem";
import { useNavigate } from "react-router-dom";

function Index({ todoList, setTodoList }) {
  const navigate = useNavigate();
  console.log("todoList", todoList);
  const deleteTodo = id => {
    const newList = todoList.filter(item => item.id !== id);
    setTodoList(newList);
    alert(`${id}삭제했습니다.`);
  };
  const handleClickAdd = () => {
    navigate(`/todo/add`);
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoList</h1>
      <div>
        <ul>
          {todoList.map(item => {
            return (
              <li key={item.id}>
                <TodoItem item={item} deleteTodo={deleteTodo} />
              </li>
            );
          })}
        </ul>
      </div>
      <button
        onClick={() => {
          handleClickAdd();
        }}
      >
        추가하기
      </button>
    </div>
  );
}

export default Index;
