import type { WithId, Document } from 'mongodb'

export interface User extends WithId<Document> {
  email: string;
  password: string;
}

export interface Runner extends WithId<Document> {
  email: string;
  shoe_records: ShoeRecord[];
}

export interface ShoeRecord extends WithId<Document> {
  shoe_brand: string;
  mileage: number;
  condition: Condition;
}

export enum Condition {
  Good = 'good',
  Bad  = 'bad',
  Ugly = 'ugly',
}