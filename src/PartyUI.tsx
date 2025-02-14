"use client";

import React from "react";
import usePartySocket from "partysocket/react";

interface IHistoryEntry {
  t: number;
  id: string;
  msg: string;
}
[];

const PartyUI = (props: { id: string }) => {
  const [msg, setMsg] = React.useState("");
  const [history, setHistory] = React.useState<IHistoryEntry[]>([]);

  const socket = usePartySocket({
    host: "http://localhost:1999",
    room: props.id,
    onMessage(event) {
      const message: {
        event: string;
        connected: string[];
        history: IHistoryEntry[];
      } = JSON.parse(event.data);

      if (message?.event) {
        console.log(message.event);
        
        setHistory(message.history)
      }
    },
    onOpen(event: WebSocketEventMap["open"]) {
      console.log("OPEN SOCKET!", event);
    },
  });

  return (
    <>
      <div>
        {history.map((entry, i) => {
          return (
            <>
              <small className={`w-[100%]`}>
                {entry.id.slice(0, 8)} -&gt; {entry.msg}
              </small> <br />
            </>
          );
        })}
      </div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();

          socket.send(JSON.stringify({ msg: msg }));
        }}
      >
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.currentTarget.value)}
          placeholder="type message"
        />
        <button type="submit">send</button>
      </form>
    </>
  );
};

export default PartyUI;
