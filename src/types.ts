export type RoomData = {
  id: string;
  connected: string[];
};

export interface IHistoryEntry {
  t: number;
  id: string;
  msg: string;
}
[];