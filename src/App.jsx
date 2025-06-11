import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    // Load todos from localStorage only once when component mounts
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        const savedTodos = JSON.parse(todoString);
        setTodos(savedTodos);
      } catch (error) {
        // Handle potential JSON parse errors
        console.error("Error parsing todos from localStorage", error);
        localStorage.removeItem("todos"); // Clear invalid data
      }
    }
  }, []);

  // Update the saveToLS function to take the current todos as a parameter
  const saveToLS = (currentTodos) => {
    localStorage.setItem("todos", JSON.stringify(currentTodos));
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos); // Pass the new todos array
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos); // Pass the new todos array
  };

  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos); // Pass the new todos array
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS(newTodos); // Pass the new todos array
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-white shadow-lg min-h-[80vh] md:w-1/2 transition-all duration-300 hover:shadow-xl">
        <h1 className="font-bold text-center text-2xl text-indigo-800 mb-6">
          ToReact - Manage your todos at one place
        </h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-indigo-700">Add a Todo</h2>
          <div className="flex gap-2">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              placeholder="Enter your task here..."
              className="w-full rounded-full px-5 py-2 border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 p-3 text-sm font-bold text-white rounded-full transition-all duration-300 flex items-center justify-center"
              title="Add Todo"
            >
              <FaPlus />
            </button>
          </div>
        </div>
        <div className="flex items-center my-4 text-indigo-700">
          <input
            className="mr-2 h-4 w-4 accent-indigo-600"
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
            id="showFinished"
          />
          <label htmlFor="showFinished" className="cursor-pointer select-none">
            Show Finished
          </label>
        </div>
        <h2 className="text-lg font-bold text-indigo-700 mt-6 mb-3">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 text-gray-500 text-center italic">No Todos to display</div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className={`todo flex w-full md:w-full my-3 justify-between p-3 rounded-lg ${item.isCompleted ? 'bg-green-50' : 'bg-indigo-50'} hover:shadow-md transition-all duration-300`}
                >
                  <div className="flex gap-5 items-center">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="h-5 w-5 accent-indigo-600"
                    />
                    <div className={`${item.isCompleted ? "line-through text-gray-500" : "text-gray-800"} transition-all duration-300`}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 p-2 text-sm font-bold text-white rounded-md mx-1 transition-all duration-300"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-red-600 hover:bg-red-700 p-2 text-sm font-bold text-white rounded-md mx-1 transition-all duration-300"
                      title="Delete"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <footer className="text-center py-4 text-indigo-600">
        <p>© 2023 ToReact - Your Task Management Solution</p>
      </footer>
    </div>
  );
}

export default App;
