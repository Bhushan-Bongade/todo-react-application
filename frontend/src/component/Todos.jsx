import { useState } from "react";
import './Todo.css'
import './TodoItems.css'

export function Todos({key, setKey, todos}) {

    async function markAsCompletedOnClickHandler(todo) {

        const response = await fetch("http://localhost:3000/completed", {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                id : todo._id,
            }),
        });

        // if (response.ok) {
        //     alert(`Completed ${todo.title}`);
        // }

        setKey(true);
    }

    return <div className="Todo">
        { todos.map(function(todo) {
            return <div  className="TodoItems">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
                { todo.completed == true ? 
                <button className="Element" >Completed!</button> : 
                <button 
                    className="Element"
                    onClick={ () => markAsCompletedOnClickHandler(todo) }
                >
                Mark as Completed
                </button> }
            </div>
        }) }
        </div>
};