"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useSession } from "next-auth/react";

const EditTask = (ctx) => {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "Open",
  });
  const router = useRouter();
  const { data: session, status } = useSession();

  const fetchData = (taskId) => {
    axios
      .get(`/api/task/${taskId}`)
      .then((response) => {
        setTaskData(response.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if (status === "authenticated") {
      fetchData(ctx.params.id);
    }
  }, [ctx.params.id, status]);
  const handleEditTask = async (e) => {
    try {
      let response = await axios.put(`/api/task/${ctx.params.id}`, taskData);
      console.log("Task updated successfully", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-4 py-8 max-w-screen-xl mx-auto">
      <form className="py-4" onSubmit={handleEditTask}>
        <label className="mr-2">Title</label>
        <input
          className="input input-bordered input-primary w-full mb-4"
          type="text"
          value={taskData.title}
          onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
        />
        <div className="mb-4">
          <SimpleMDE
            value={taskData.description}
            onChange={(value) =>
              setTaskData({ ...taskData, description: value })
            }
          ></SimpleMDE>
        </div>
        <div className="mb-4">
          <label className="mr-2">Status</label>
          <select
            className="select select-bordered select-sm w-full"
            value={taskData.status}
            onChange={(e) =>
              setTaskData({ ...taskData, status: e.target.value })
            }
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Progress">Progress</option>
          </select>
        </div>
        <div className="mb-4">
          <button className="btn btn-wide" type="submit">
            Update task
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditTask;
