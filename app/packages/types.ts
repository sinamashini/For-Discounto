export interface ObjPackage {
  id?: number;
  name: string;
  maxPayment: number;
  deadLineAfterMaxPayment?: number;
  numberOfPeopleIncluded?: number;
  level: LevelObject[];
}

export interface LevelObject {
  id?: number;
  levelNumber: number;
  percent: number;
}
