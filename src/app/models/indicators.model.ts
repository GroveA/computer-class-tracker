export interface Indicators {
  computer: any;
  date: Date;
  computerId: string;
  CPU: {
    LoadTotal: number,
    TempetureTotal: number,
    Load: [number],
    Tempeture: [number],
    Cores: number
  };
  GPU: {
    Tempeture: number
  };
  RAM: {
    UsedMemory: number,
    AvaliableMemory: number,
  };
}
