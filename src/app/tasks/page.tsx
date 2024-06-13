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

  if (loading) return <p>Loading...</p>;

  return (
    <PrivateRoute>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4">Tasks</h1>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Add New Task</h2>
                <div className="mb-3">
                  <label htmlFor="datetime" className="form-label">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="datetime"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="note" className="form-label">
                    Note
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Note"
                    required
                  />
                </div>
                <button className="btn btn-primary" onClick={handleCreateTask}>
                  Add Task
                </button>
              </div>
            </div>
            <ul className="list-group">
              {data?.tasks?.map((task: any) => (
                <li
                  key={task.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {task.note} at {new Date(task.datetime).toLocaleString()}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
