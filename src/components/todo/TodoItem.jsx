import { Link } from "react-router-dom";

const TodoItem = ({ item, deleteTodo }) => {
  return (
    <div>
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
