import { useCollection } from "../hooks/useCollection";

function OnlineUsers() {
  const { documents } = useCollection("users");

  return (
    <div className="bg-slate-100 w-[200px] p-10">
      <ul>
        {documents &&
          documents.map((doc) => {
            return (
              <li key={doc.id} className="flex gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    doc.online ? "bg-green-400" : "bg-gray-400"
                  }`}
                  title={doc.online ? "Online" : "Offline"}
                ></span>
                <p>{doc.displayName}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
