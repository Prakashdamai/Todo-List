import './App.css';
import Header from "./MyComponents/Header";
import Todos from './MyComponents/Todos';
import AddTodo from './MyComponents/AddTodo';
import Footer from './MyComponents/Footer';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";  // ✅ use Routes not Switch
import About from './MyComponents/About';

function App() {
  // Load todos from localStorage correctly
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  } else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add todo function
  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    let srno;
    if (todos.length === 0) {
      srno = 0;
    } else {
      srno = todos[todos.length - 1].srno + 1;
    }

    const myTodo = {
      srno: srno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
  };

  // Delete todo function
  const onDelete = (todo) => {
    console.log("I am On Delete of todo", todo);
    setTodos(todos.filter((e) => e !== todo));
  };

  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />

        {/* ✅ React Router v6 uses Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
