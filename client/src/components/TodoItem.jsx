import React from "react";
import '../App.css'

const TodoItem = ({
  title,
  description,
  isCompleted,
  createdAt,
  updateHandler,
  deleteHandler,
  id,
}) => {
  
  const formatDate=(timestamp)=>{
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    const formattedDate = date.toLocaleString('en-US', options).replace(',', ' |');
    return formattedDate;
  }


  return (
    <div className={`task ${isCompleted ? "completed-task" : ""}`}>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={() => updateHandler(id)}
      />
      <div className="task_top">
        <div className="task_top_left">
          <h3>{title}</h3>
          <div>{description}</div>
        </div>
        <div className="task_top_right">
          <i
            className="fa fa-trash fa-2x"
            aria-hidden="true"
            onClick={() => deleteHandler(id)}
          ></i>
        </div>
      </div>
      <div className="task_date_status">
        <div>{formatDate(createdAt)}</div>
        <div className={isCompleted ? "completed" : "pending"}>
          {isCompleted ? "Completed" : "Pending"}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
