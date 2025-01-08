import { useCollection } from "../hooks/useCollection";

function OnlineUsers() {
  const { documents } = useCollection("users");

  return (
    <div className=" shadow-lg rounded-lg w-[240px] p-2 bg-slate-100">
      <h2 className="text-lg font-semibold text-slate-600 my-5 border-b pb-2 text-center">
        Online Users
      </h2>
      <ol className="list-decimal list-inside space-y-3">
        {documents &&
          documents.map((doc) => {
            return (
              <li key={doc.id} className="flex items-center gap-1 rounded-md ">
                <div className="relative">
                  <img
                    src={doc.photoURL}
                    alt={doc.displayName}
                    className="w-10 h-10 rounded-full border border-gray-200"
                  />
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      doc.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                    title={doc.online ? "Online" : "Offline"}
                  ></span>
                </div>

                <p
                  className="text-gray-700 font-medium truncate max-w-[140px]"
                  title={doc.displayName}
                >
                  {doc.displayName.length > 7
                    ? `${doc.displayName.slice(0, 7)}...`
                    : doc.displayName}
                </p>
              </li>
            );
          })}
      </ol>
    </div>
  );
}

export default OnlineUsers;
