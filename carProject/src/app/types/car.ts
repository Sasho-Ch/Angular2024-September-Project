import { User } from "./user";

export interface Car {
    _id: string;
    carBrand: string;
    carModel: string;
    carYear: string;
    carColor: string;
    userId: User;
    created_at: string;
    updatedAt: string;
    __v: number;
  }