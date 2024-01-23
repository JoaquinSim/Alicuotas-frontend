import { CatalogueModel } from "./catalogue.model";
import { DetailModel } from "./detail.model";
import { TimeModel } from "./time.model";
import { UserModel } from "./user.model";

export interface LoteModel {
    id: string;
    number: number;
    time: TimeModel;
    user: UserModel
  }
  
  export interface CreateLoteDto extends Omit<LoteModel, 'id'> {
  }
  
  export interface UpdateLoteDto extends Partial<Omit<LoteModel, 'id'>> {
  }
  
  export interface SelectLoteDto extends Partial<LoteModel> {
  }