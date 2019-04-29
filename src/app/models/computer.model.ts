import { CPU } from './cpu.model';
import { GPU } from './gpu.model';
import { HDD } from './hdd.model';
import { RAM } from './ram.model';


export interface Computer {
  name: string;
  hostName: string;
  macAddress: string;
  ipAddress: string;
  motherboard: string;
  cpu: CPU;
  gpu?: GPU;
  hdd?: HDD;
  ram: RAM;
}
