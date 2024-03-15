import React, { useState } from "react";

export const InputTodo = (props) => {
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sumitted!!--->", description);
      const input = { description };
      //ABOVE TRICKED YOU REALLY BAD!!!. IT IS NOT DESTRUCTURING!!!
      //THIS IS ACTUALLY A OBJECT THATS REALLY DOING THIS
      /*
      { 
        description:"DOPE BEAT"
       }
       HOWEVER SHORT HAND IS 
       {
        description:description
       }
       BECAUSE const [description,setDescription] = useState("")
       SO input = {description:description}
       short is {description}
       SO THIS LOOKS LIKE DESCRUTURING, BUT ITS NOT!!!
      */
      const result = await fetch("http://localhost:3001/todos/", {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-type": "application/json",
        },
      });
      //let data = await result.json();
      console.log("HERE IS THE INPUT DATA--->", result);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="container">
        <h1 className="text-center my-5">Todo</h1>
        <form className="d-flex mb-5" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Enter todo"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </>
  );
};
