import React, { useState } from "react";

export const EditTodo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);
  console.log("Todo--->", todo.description);

  const handleEdit = async (id) => {
    const body = { description };
    try {
      const res = await fetch(`http://localhost:3001/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("EDIT RESPONSE------>>>>>>", res);
      console.log("EDIT ID", todo);

      //FORCE TO REFRESH TO SHOW UPDATE!!!
      window.location = await "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {/*} <!-- Button to Open the Modal -->*/}
      <button
        type="button"
        class="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Open modal
      </button>

      {/*<!-- The Modal another test branch commit-->*/}
      <div
        class="modal"
        id={`id${todo.todo_id}`}
        onClick={() => setDescription(todo.description)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            {/* <!-- Modal Header add to test git -->*/}
            <div class="modal-header">
              <h4 class="modal-title">Edit Todo</h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              ></button>
            </div>

            {/*<!-- Modal body -->*/}
            <div className="modal-body">
              <input
                type="text"
                placeholder="update todo"
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
                value={description}
              />
            </div>
            {/*<!-- Modal footer -->*/}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={() => handleEdit(todo.todo_id)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => setDescription(todo.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
