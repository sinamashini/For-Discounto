export interface ObjPackage {
  id?: number;
  name: string;
  maxPayment: number;
  deadLineAfterMaxPayment?: number;
  level: LevelObject[];
}

export interface LevelObject {
  id?: number;
  levelNumber: number;
  percent: number;
}
