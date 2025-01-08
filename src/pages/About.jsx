import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
// react icon
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
function About() {
  const { id } = useParams();
  const { user } = useSelector((store) => store.user);
  const [content, setContent] = useState("");
  const { document } = useDocument("projects", id);
  const { updateDocument } = useFirestore("projects");
  // console.log(document);

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
  if (!document) {
    return <div className="loading"></div>;
  }
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="rounded-lg p-5 shadow-lg border border-red-500">
        <h1 className="text-3xl text-center font-semibold capitalize mb-5">
          {document.name}
        </h1>
        <p className="text-justify indent-9">{document.description}</p>
        <span className="text-xs">
          Due date:{""} {new Date(document.dueTo.toDate()).toDateString()}
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
      </div>
      <div>
        <h3 className="text-2xl">Chat:</h3>
        {document.comments.length == 0 ? (
          <h4 className="text-center my-10 italic opacity-45 ">
            No Comments Yet
          </h4>
        ) : (
          <>
            {document.comments.map((comment) => {
              const formattedTime = comment.createdAt
                ? new Date(comment.createdAt.toDate()).toLocaleTimeString()
                : "Unknown time";
              return (
                <div
                  className={`chat ${
                    user.uid == comment.owner.id ? "chat-end" : "chat-start"
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
                  <div className="chat-header">
                    {/* {comment.owner.displayName} */}
                  </div>
                  <div className="chat-bubble bg-slate-100 text-slate-700 p-2">
                    {comment.content}
                  </div>
                  <time className="text-xs opacity-50">{formattedTime}</time>
                </div>
              );
            })}{" "}
          </>
        )}
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Message:</span>
              </div>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="textarea textarea-bordered h-24"
                placeholder="Type here"
              ></textarea>
            </label>
            <button className="btn btn-neutral text-lg text-white btn-block ">
              Send <IoSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default About;
