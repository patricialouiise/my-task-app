import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Task Manager App</h1>
      <p>
        This application allows you to view, create, and delete tasks. Click the
        button below to get started.
      </p>
      <Link href="/tasks">
        <button>Go to Tasks</button>
      </Link>
    </div>
  );
};

export default HomePage;
