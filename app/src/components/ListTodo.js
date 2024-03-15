import React, { useState, useEffect } from "react";
import { EditTodo } from "./EditTodo";

export const ListTodo = () => {
  const [list, setList] = useState("");
  useEffect(() => {
    handleList();
  }, []);

  //GRAB ALL TODOS UPON LOAD (HYDRATION)
  const handleList = async () => {
    try {
      console.log("Here is the List");

      const result = await fetch("http://localhost:3001/todos/");
      const data = await result.json();
      setList(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  //DELETE BUTTON HANDLER
  const handleDelete = async (id) => {
    console.log("Deleted!", id);
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "DELETE",
      });

      //THIS IS HOW YOU FORCE FILTER DATA TO REFLECT TRUE DATA WITH NO REFRESH!!!
      //HOW TO SHOW CURRENT DATA!!! IMPORTANT
      setList(list.filter((todo) => todo.todo_id !== id));

      console.log("THE RESPONSE TO DELETE-->", res);

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-5">ListTodo</h1>
      <>
        <table className="table">
          <thead>
            <tr key="">
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {list &&
              list.map((item, i) => (
                <tr key={item.todo_id}>
                  <td> {item.description}</td>
                  <td>
                    <EditTodo todo={item}/>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      value={"Deleted Bitch!!"}
                      onClick={() => handleDelete(item.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </>
    </div>
  );
};
