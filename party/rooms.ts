import * as Party from "partykit/server";

export const ROOMS_SERVER_ID = "list"

export type RoomData = {
  id: string,
  connected: string[],
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE",
};

export const json = <T>(data: T, status = 200) =>
  Response.json(data, { status, headers: CORS });

export default class Rooms implements Party.Server {
  options: Party.ServerOptions = {
    hibernate: true,
  };

  constructor(public room: Party.Room) {}

  async getAllRooms(): Promise<RoomData[]> {
    const rooms = await this.room.storage.list<RoomData>();
    return [...rooms.values()];
  }

  async onConnect(connection: Party.Connection) {
    connection.send(JSON.stringify(await this.getAllRooms()));
  }  

  async onRequest(req: Party.Request) {
    if(this.room.id !== ROOMS_SERVER_ID) {
      return new Response("Not found", { status: 404, headers: CORS });
    }

    if(req.method == "GET") {
      return new Response(JSON.stringify(await this.getAllRooms()), { headers: CORS });
    }

    else if(req.method == "POST") {
      const body: any = await req.json();

      const existingRoomData = await this.room.storage.get<RoomData>(body.id);
      
      const newRoomData: RoomData = existingRoomData ?? {
        id: body.id,
        connected: []
      }

      if(body.from) {
        newRoomData.connected.push(body.from);
      }

      await this.room.storage.put(body.id, newRoomData)
      this.room.broadcast(JSON.stringify(await this.getAllRooms()))

      return new Response(JSON.stringify(await this.getAllRooms()), { headers: CORS });
    }
    
    return new Response("Not found", { status: 404, headers: CORS });
  }
}
