import React from "react";
import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";

function Home() {
  const { documents } = useCollection("projects");
  return (
    <div>
      <h1 className="text-3xl mb-10 text-slate-500 font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 ">
        {" "}
        {documents &&
          documents.map((doc) => {
            return (
              <Link
                to={`/about/${doc.id}`}
                key={doc.id}
                className="card bg-base-100 shadow-xl border hover:border-red-500"
              >
                <div className="card-body p-5">
                  <h2 className="card-title text-2xl font-normal flex justify-center capitalize">
                    {doc.name}
                  </h2>
                  <p className="text-justify indent-8">
                    {" "}
                    {doc.description.length > 100
                      ? `${doc.description.slice(0, 100)}...`
                      : doc.description}
                  </p>
                  <span className="text-xs">
                    Due date:{""} {new Date(doc.dueTo.toDate()).toDateString()}
                  </span>
                  <hr />
                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    {doc.assignedUsers.map((u) => {
                      return (
                        <div key={u.photoURL} className="avatar">
                          <div className="w-10">
                            <img src={u.photoURL} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
