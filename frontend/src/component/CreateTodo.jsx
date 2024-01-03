import { useState } from "react";
import "./CreateTodo.css"
import './Element.css'

export function CreateTodo({todos, setTodos}) {

    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    async function inputOnChangeSetTitleHandler(event) {
        setTitle(event.target.value);
    }

    async function inputOnChangeDescriptionHandler(event) {
        setDescription(event.target.value);
    }

    async function todoOnClickhandler() {

        const response = await fetch("http://localhost:3000/todo", {
            method : "POST",
            body : JSON.stringify({
                title : title,
                description : description
            }),
            headers : {
                "Content-Type" : "application/json"
            }
        });

        // if (response.ok) {
        //     alert("Todo added");
        // }

        setTodos([...todos, {
            title : title,
            description : description,
        }]);
    }

    return (
        <div className="CreateTodo">
            <input 
                className="Element"
                type="text" 
                placeholder="title" 
                onChange={inputOnChangeSetTitleHandler}
            /> <br />
            <input 
                className="Element"
                type="text" 
                placeholder="description" 
                onChange={inputOnChangeDescriptionHandler}
            /> <br />
            <button 
                className="Element"
                onClick={todoOnClickhandler}
            > 
            Add Todo
            </button>
        </div>
    )
}