import { CatalogueModel } from "./catalogue.model";

export interface DetailModel {
    id: string;
    mounth: CatalogueModel;
    mount: number;
    code: string;
    pay: CatalogueModel;
  }
  
  export interface CreateDetailDto extends Omit<DetailModel, 'id'> {
  }
  
  export interface UpdateDetailDto extends Partial<Omit<DetailModel, 'id'>> {
  }
  
  export interface SelectDetailDto extends Partial<DetailModel> {
  }