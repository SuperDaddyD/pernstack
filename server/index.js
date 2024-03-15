const express = require("express");
const cors = require("cors");
//below represents the database you made in db.js
const pool = require("./db");

const PORT = process.env.PORT || 3001;

const app = express();
//middlewares
// app.use(cors());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json()); // allows access to req.body

//ROUTES
//get all todos
app.get("/todos", async (req, res) => {
  try {
    // res.json({ "talk": "right" });

    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a single todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleTodo = await pool.query(
      "SELECT * FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json(singleTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //above which one of records
    const { description } = req.body;
    //above info to replace db info(descriptiono)
    const updatedTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    //$1 is the first variable, $2 is the second variable
    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1",
      [id]
    );
    res.json("Todo Deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
