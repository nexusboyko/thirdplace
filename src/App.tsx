import React from "react";
import { Link } from "react-router";

const RoomClick = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="z-99 font-mono flex items-center justify-center w-[50px] h-[100px] bg-black text-white text-center text-[31px]/7  
      rounded-sm hover:cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out break-words break-all"
    >
      {id}
    </div>
  );
};

function App() {
  const createPartyRoom = async (id: string) => {
    const res = await fetch(`/api/party/${id}`, {
      method: "POST",
      body: JSON.stringify({
        hello: "world",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
  };

  const getPartyRoom = async (id: string) => {
    const res = await fetch(`/api/party/${id}`);

    const data = await res.json();
    console.log("RES", data);
  };

  React.useEffect(() => {
    setRooms(["1"]);
    createPartyRoom("1");
  }, []);

  const randomId = function (length = 6) {
    return Math.random()
      .toString(36)
      .substring(2, length + 2);
  };

  const [rooms, setRooms] = React.useState<string[]>([]);

  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center overflow-hidden">
      <div
        className="font-bold text-4xl text-slate-500"
        style={{ margin: "2rem" }}
      >
        3<span className="text-slate-200">rd</span> p
        <span className="text-slate-200">lace</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        {rooms.map((roomId, i) => {
          return (
            <Link to={`/${roomId}`} key={roomId}>
              <RoomClick key={i} id={roomId} />
            </Link>
          );
        })}
        <button
          className="font-mono flex items-center justify-center w-[50px] h-[100px] bg-white text-black 
          rounded-sm hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out border"
          onClick={() => {
            const rid = randomId();
            setRooms([...rooms, rid]);
            createPartyRoom(rid);
          }}
        >
          +
        </button>
      </div>
    </main>
  );
}

export default App;
