import * as Party from "partykit/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export default class Room implements Party.Server {
  constructor(readonly room: Party.Room) {
    this.connected = []
    this.history = []
  }

  history: {
    t: number,
    id: string,
    msg: string
  }[]

  connected: string[]
  
  async onStart() {
    console.log("Server started!");
  }

  async onRequest(req: Party.Request) {
    if (req.method === "GET") {
      return new Response(JSON.stringify({ message: `Got room information: ${this.room.id}`, context: this.room.context }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders},
      });
    } 
    
    else if (req.method === "POST") {
      
      // TODO: auth. layer BEFORE action!

      const body = await req.json();
      
      if(body) {
        return this.room.context.parties.rooms.get("list").fetch({
          method: "POST",
          body: JSON.stringify({
            id: this.room.id
          })
        })
      }

      return new Response("Invalid request", {
        status: 400,
        headers: { ...corsHeaders },
      });
    }

    return new Response(null, { status: 204, headers: { ...corsHeaders } });
  }

  async onClose(connection: Party.Connection) {
    console.log(`User dis-connected: ${connection.id.slice(0, 8)}`);
    
    this.room.broadcast(JSON.stringify({
      event: `User dis-connected: ${connection.id.slice(0, 8)}`,
      connected: this.connected.filter(id => id !== connection.id),
    }))

    this.connected = this.connected.filter(id => id !== connection.id);
  }

  async onConnect(connection: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(`User connected: ${connection.id.slice(0, 8)}`);
    
    this.room.broadcast(JSON.stringify({
      event: `User connected: ${connection.id.slice(0, 8)}`,
      connected: [...this.connected, connection.id],
      history: this.history,
    }))

    this.connected.push(connection.id);
  }

  async onMessage(message: string | ArrayBuffer | ArrayBufferView, sender: Party.Connection) {
    const event = JSON.parse(message as string);
    
    
    console.log(`@${sender.id.slice(0, 8)}`, event);
    
    this.room.broadcast(JSON.stringify({
      event: "User message",
      connected: this.connected,
      history: [...this.history, {
        t: Date.now(),
        id: sender.id,
        msg: event.msg
      }],
    }))
    
    this.history.push({
      t: Date.now(),
      id: sender.id,
      msg: event.msg
    });
  }
}

Room satisfies Party.Worker;
