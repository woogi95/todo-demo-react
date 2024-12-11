import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TodoContext } from "../../contexts/TodoContext";

function TodoDetail() {
  const { todoList } = useContext(TodoContext);
  // js로 path 이동하기
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const id = parseInt(searchParams.get("id"));
  const [todo, setTodo] = useState({});

  const getTodo = () => {
    const findData = todoList.filter(item => item.id === id);
    const findTodo = findData[0];
    console.log(findData);
    setTodo({ ...findTodo });
  };
  const handleClickEdit = () => {
    navigate(`/todo/edit/${todo.id}`);
  };
  useEffect(() => {
    getTodo();
    return () => {};
  }, []);

  return (
    <div>
      <h1>TodoDetail</h1>
      <div>
        {/* 작성자  */}
        작성자 : {todo.author}
        <br />
        {/* 날짜 */}
        날자 : {todo.date}
        <br />
        {/* 제목 */}
        제목 : {todo.title}
        <br />
        {/* 내용 */}
        내용 : {todo.content}
        <br />
      </div>
      <div>
        <button
          onClick={() => {
            handleClickEdit();
          }}
        >
          수정하기
        </button>
        <button
          onClick={() => {
            navigate("/todo");
          }}
        >
          목록보기
        </button>
      </div>
    </div>
  );
}

export default TodoDetail;
