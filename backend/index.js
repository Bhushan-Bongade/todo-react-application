const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());

app.post("/todo", async function (req, res) {

    const body = req.body;
    const validateBody = createTodo.safeParse(body);

    if (!validateBody.success) {
        res.status(411).json({
            msg: validateBody.success
        });
        return;
    }

    if (body.title.length === 0 || body.description.length === 0) {
        return;
    }

    await todo.create({
        title: body.title,
        description: body.description,
        completed: false
    });

    res.status(200).json({
        msg: "Todo Added Successfully"
    });
});

app.get("/todos", async function (req, res) {

    const todos = await todo.find();
    console.log(todos);
    res.status(200).json(todos);
});

app.put("/completed", async function (req, res) {

    const bodyData = req.body;
    const validateBody = updateTodo.safeParse(bodyData);

    if (!validateBody.success) {
        res.status(400).json({
            msg: "Invalid Input"
        });

        return;
    }

    await todo.updateOne({
        _id: bodyData.id
    }, {
        completed: true,
    });

    res.status(200).json({
        msg: "Completed"
    });
});

app.listen(3000);