import { CatalogueModel } from "./catalogue.model";
import { DetailModel } from "./detail.model";

export interface TimeModel {
    id: string;
    yaer: CatalogueModel;
    detail: DetailModel;
  }
  
  export interface CreateTimeDto extends Omit<TimeModel, 'id'> {
  }
  
  export interface UpdateTimeDto extends Partial<Omit<TimeModel, 'id'>> {
  }
  
  export interface SelectTimeDto extends Partial<TimeModel> {
  }