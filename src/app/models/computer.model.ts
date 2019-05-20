
export interface Computer {
  _id: string;
  name: string;
  hostName: string;
  macAddress: string;
  motherboard: string;
  cpuName: string;
  cpuCores: number;
  gpuName: string;
  ram: number;
  online: boolean;
  lastUpdate: Date;
  cpuLoad: number;
  tempeture: number;
  groupId: string;
}
