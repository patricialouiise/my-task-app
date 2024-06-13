import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";

const HomePage = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 py-5">
          <h1 className="display-4 mb-4">Welcome to the Task Manager App</h1>
          <p className="lead mb-4">
            This application allows you to view, create, and delete tasks. Click
            the button below to get started.
          </p>
          <Link href="/tasks" className="btn btn-lg btn-primary">
            Go to Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
