import { useContext } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

const TodoItem = ({ item }) => {
  const { deleteTodo } = useContext(TodoContext);
  return (
    <div key={item.id}>
      <Link to={`/todo/detail?id=${item.id}`}>{item.title}</Link> {item.author}{" "}
      {item.date}
      <br />
      <button
        onClick={() => {
          deleteTodo(item.id);
        }}
      >
        삭제하기
      </button>
    </div>
  );
};

export default TodoItem;
