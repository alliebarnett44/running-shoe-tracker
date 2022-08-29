import type { WithId, Document } from 'mongodb'

export interface User extends WithId<Document> {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
}

export interface Runner extends WithId<Document> {
  email: string;
  shoe_records: ShoeRecord[];
}

export interface ShoeRecord extends WithId<Document> {
  id: string;
  shoe_brand: string;
  shoe_model: string;
  mileage: number;
  condition: Condition;
}

export enum Condition {
  New = 'new',
  Good = 'good',
  Bad  = 'bad',
  Ugly = 'bitch get off the road',
}