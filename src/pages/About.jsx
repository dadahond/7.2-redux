import { useParams, useNavigate } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
// react icon
import { IoSend } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function About() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const [content, setContent] = useState("");
  const { document } = useDocument("projects", id);
  const { updateDocument, deleteDocument, completeDocument } =
    useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {
      id: uuidv4(),
      content,
      createdAt: Timestamp.fromDate(new Date()),
      owner: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
    };

    await updateDocument(
      {
        comments: [...document.comments, comment],
      },
      id
    );
    setContent("");
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to DELETE this project?")) {
      await deleteDocument(id);
      navigate("/");
    }
  };
  const handleComplete = async () => {
    if (window.confirm("Are you sure you want to COMPLETE this project?")) {
      await completeDocument(id);
      navigate("/");
    }
  };

  if (!document) {
    return <div className="loading"></div>;
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="rounded-lg p-5 shadow-lg border border-red-500 max-h-min mt-8">
        <h1 className="text-3xl text-center font-semibold capitalize mb-5 text-gray-500">
          {document.name}
        </h1>
        <p className="text-justify indent-9 text-gray-600">
          {document.description}
        </p>
        <span className="text-xs text-gray-600">
          Due date: {new Date(document.dueTo.toDate()).toDateString()}
        </span>
        <div className="avatar-group -space-x-6 rtl:space-x-reverse">
          {document.assignedUsers.map((u) => {
            return (
              <div key={u.photoURL} className="avatar">
                <div className="w-10">
                  <img src={u.photoURL} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-around mt-2">
          <button
            onClick={handleComplete}
            className="btn btn-outline btn-success text-lg"
          >
            Complete <IoCheckmarkDoneCircleOutline />
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-outline btn-error text-lg"
          >
            Delete <RiDeleteBin6Line />
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-2xl text-gray-600">Chat:</h3>
        <div className="chat-container overflow-y-auto h-96 border border-gray-300 rounded-md p-4">
          {document.comments.length === 0 ? (
            <h4 className="text-center my-10 italic opacity-45 text-gray-600">
              No Comments Yet
            </h4>
          ) : (
            document.comments.map((comment) => {
              const formattedTime = comment.createdAt
                ? new Date(comment.createdAt.toDate()).toLocaleTimeString()
                : "Unknown time";
              return (
                <div
                  key={comment.id}
                  className={`chat ${
                    user.uid === comment.owner.id ? "chat-end" : "chat-start"
                  }`}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={comment.owner.photoURL}
                        alt={`${comment.owner.displayName}'s avatar`}
                      />
                    </div>
                  </div>
                  <div className="chat-header text-gray-600">
                    {comment.owner.displayName}
                  </div>
                  <div className="chat-bubble bg-slate-100 text-gray-600 p-2">
                    {comment.content}
                  </div>
                  <time className="text-xs opacity-50 text-gray-600">
                    {formattedTime}
                  </time>
                </div>
              );
            })
          )}
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="form-control relative h-32 overflow-y-auto border rounded-md p-2">
              <div className="label mb-1">
                <span className="label-text text-gray-600 text-lg">
                  Message:
                </span>
              </div>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="textarea text-gray-500 textarea-bordered w-full h-full resize-none focus:outline-none bg-white"
                placeholder="Type here"
              ></textarea>
            </label>
            <button className="btn btn-outline btn-success text-lg text-white btn-block">
              Send <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About;
