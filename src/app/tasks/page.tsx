"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useAuth } from "../../contexts/AuthContext";
import PrivateRoute from "../components/PrivateRoute";
import { useRouter } from "next/navigation";

const GET_TASKS_QUERY = gql`
  query GetTasks($userId: Int!) {
    tasks(userId: $userId) {
      id
      datetime
      note
    }
  }
`;

const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($datetime: DateTime!, $note: String!, $userId: Int!) {
    createTask(datetime: $datetime, note: $note, userId: $userId) {
      id
      datetime
      note
    }
  }
`;

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`;

export default function Tasks() {
  const [note, setNote] = useState("");
  const [datetime, setDatetime] = useState("");
  const { userId, logout } = useAuth();
  const router = useRouter();

  const { data, loading, refetch } = useQuery(GET_TASKS_QUERY, {
    variables: { userId },
    skip: !userId
  });

  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [refetch, userId]);

  const handleCreateTask = async () => {
    try {
      await createTask({ variables: { datetime, note, userId } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask({ variables: { id } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <PrivateRoute>
      <div>
        <h1>Tasks</h1>
        <button onClick={handleLogout}>Logout</button>
        <div>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note"
            required
          />
          <button onClick={handleCreateTask}>Add Task</button>
        </div>
        <ul>
          {data?.tasks?.map((task: any) => (
            <li key={task.id}>
              {task.note} at {new Date(task.datetime).toLocaleString()}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </PrivateRoute>
  );
}
