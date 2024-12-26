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
                <p>{doc.displayName}</p>
                <span>{doc.online ? "online" : "offline"}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
