import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ChangeEvent, useState } from "react";
import {
  Todolist,
  addTodo,
  deleteTodo,
  editTodo,
} from "../store/reducer/todoSlice";

function TodoList() {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  console.log(todoList);

  const [nameTodo, setNameTodo] = useState<string>("");
  const [idEdit, setIdEdit] = useState<number>(0);
  const dispatch = useDispatch();
  const handleAdd = () => {
    setNameTodo("");
    dispatch(addTodo(nameTodo));
  };
  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };
  const handleEdit = (item: Todolist) => {
    setNameTodo(item.name);
    setIdEdit(item.id);
  };
  const handleSave = () => {
    dispatch(
      editTodo({
        id: idEdit,
        name: nameTodo,
      })
    );
    setNameTodo("");
    setIdEdit(0);
  };
  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    dispatch(
      editTodo({
        id,
        status: e.target.checked,
      })
    );
  };
  const completed = todoList.filter((item) => item.status);
  console.log(completed);

  return (
    <div>
      <div className="w-4/5 m-auto bg-slate-400 text-center">
        <h1 className="text-4xl font-bold">Danh sách công việc</h1>
        <div className="flex justify-center gap-5">
          <input
            type="text"
            className="h-[40px] w-[800px] rounded-md outline-none text-2xl pl-5"
            onChange={(e) => setNameTodo(e.target.value)}
            value={nameTodo}
          />
          <button
            className="bg-blue-200 px-5 rounded-sm"
            onClick={idEdit ? handleSave : handleAdd}
          >
            {idEdit ? "Lưu" : "Thêm"}
          </button>
        </div>
        <div className="w-1/3 m-auto  text-3xl">
          {todoList.map((item, index) => (
            <div key={index}>
              <div>
                <input
                  type="checkbox"
                  className="w-5 h-5 mr-5"
                  onChange={(e) => handleChangeStatus(e, item.id)}
                  checked={item.status}
                />
                <span className={item.status ? `text-red-600` : `text-black`}>
                  {item.name}
                </span>
              </div>
              <div>
                <button className="mr-10" onClick={() => handleDelete(item.id)}>
                  Xoa
                </button>
                <button onClick={() => handleEdit(item)}>Sua</button>
              </div>
            </div>
          ))}
        </div>
        <div className=" text-2xl font-bold">
          <p>
            {todoList.length === 0
              ? "No data"
              : completed.length == todoList.length
              ? "da hoan thanh tat ca"
              : `${completed.length}/${todoList.length}`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
