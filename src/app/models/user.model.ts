import { CatalogueModel } from "./catalogue.model";

export interface UserModel {
  id: string;
  email: string;
  identification: string;
  lastname: string;
  name: string;
  password: string;
  cellPhone: string;
  suspendedAt: Date;
  state: CatalogueModel
}

export interface CreateUserDto extends Omit<UserModel, 'id'> {
}

export interface UpdateUserDto extends Partial<Omit<UserModel, 'id'>> {
}

export interface SelectUserDto extends Partial<UserModel> {
}