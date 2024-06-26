"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const SingleTask = (ctx) => {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { data: sessionStorage, status } = useSession();
  const fetchData = (taskId) => {
    axios
      .get(`/api/task/${taskId}`)
      .then((response) => {
        setTask(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData(ctx.params.id);
    }
  }, [ctx.params.id, status]);

  if (status !== "authenticated") {
    return <p className="text-center">Not authenticated</p>;
  }
  if (!task) {
    return <p className="text-center">Loading Task...</p>;
  }

  const hanldeDeleteTask = () => {
    axios
      .delete(`/api/task/${ctx.params.id}`)
      .then(() => {
        router.push("/task");
      })
      .catch((e) => console.log(e));
  };
  return (
    <section className="px-4 py-8">
      <h2>Single Task</h2>
      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300">Title</th>
            <th className="border border-gray-300">Description</th>
            <th className="border border-gray-300">Status</th>
            <th className="border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr key={task._id}>
            <td className="border border-gray-300" text-center py-2>
              {task.title}
            </td>
            <td className="border border-gray-300" text-center py-2>
              {task.description}
            </td>
            <td className="border border-gray-300" text-center py-2>
              {task.status}
            </td>
            <td className="border border-gray-300" text-center py-2>
              <Link
                href={`/task/edit/${ctx.params.id}`}
                className="bg-gray-400 hover:bg-gray-500 py-2 font-medium px-4"
              >
                Edit
              </Link>
              <button
                onClick={hanldeDeleteTask}
                className="bg-red-400 hover:bg-red-500 py-2 px-4 ml-2"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default SingleTask;
