
import usePartySocket from "partysocket/react";
import React, { FormEvent } from "react";
import { Link, redirect } from "react-router";
import { randomId } from "./utils";
import { RoomData } from "./types";
import RoomTitleCard from "./components/RoomTitleCard";

const RoomsList = () => {
  const [rooms, setRooms] = React.useState<RoomData[]>([]);

  const getRooms = async () => {
    const res = await fetch("/api/parties/rooms/list");
    const data: RoomData[] = (await res.json()) ?? [];

    setRooms(data);
  };

  React.useEffect(() => {
    getRooms();
  }, []);

  const socket = usePartySocket({
    host: "http://localhost:1999",
    party: "rooms",
    room: "list",
    onMessage(event) {
      // if new rooms added, update list
      setRooms(JSON.parse(event.data) as RoomData[]);
    },
  });

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();

    const rid = randomId();

    const res = await fetch(`/api/parties/room/${rid}`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
  };

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
        {rooms.map((room, i) => {
          return (
            <Link key={i} to={`/places/p/${room.id}`}>
              <RoomTitleCard id={room.id} />
            </Link>
          );
        })}
        <form action="" onSubmit={handleClick}>
          <RoomTitleCard />
        </form>
      </div>
    </main>
  );
};

export default RoomsList;
