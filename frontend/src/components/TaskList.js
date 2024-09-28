import React from "react";
import { Link } from "react-router-dom";
import Card from "./Card";

const TaskList = ({ tasks }) => {
  if (!tasks.length) {
    return (
      <div className="text-center">
        No tasks available.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center md:h-[200px] lg:h-[225px] xl:h-[200px]">
      {tasks &&
        tasks.map((task) => (
          <Link
            className="w-full h-full md:w-[40%] lg:w-[28%] m-2 md:m-5 lg:m-5"
            key={task._id}
            to={`/tasks/${task._id}`}
          >
            <Card task={task} />
          </Link>
        ))}
    </div>
  );
};

export default TaskList;
