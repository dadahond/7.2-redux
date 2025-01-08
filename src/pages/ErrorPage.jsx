import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  if (error.status == 404) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="flex flex-col items-center justify-center gap-5 text-center">
          <h2 className="text-4xl font-bold text-red-500">PAGE NOT FOUND</h2>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <h2 className="text-4xl font-bold text-red-500">
          SOMETHING WENT WRONG!
        </h2>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
