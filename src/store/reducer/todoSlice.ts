import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface State {
  todoList: Todolist[];
}
export interface Todolist {
  id: number;
  name: string;
  status?: boolean;
}
const initialState: State = {
  todoList: JSON.parse(localStorage.getItem("todoList") || "[]"),
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: Math.floor(Math.random() * 999999),
        name: action.payload,
        status: false,
      };
      state.todoList.push(newTodo);
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(
        (item: any) => item.id !== action.payload
      );
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },
    editTodo: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      const { id, status, name } = action.payload;
      const index = state.todoList.findIndex(
        (item) => item.id == id
      );
      if (name) {
        state.todoList[index].name = name;
      } else {
        state.todoList[index].status = status;
      }
      localStorage.setItem("todoList", JSON.stringify(state.todoList));
    },
  },
});
export const { addTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
