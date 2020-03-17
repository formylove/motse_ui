import {RESOURCE} from './fetch/fetch';
import {
  GET_UNIT_DIMENSIONS, 
} from '../common/api';
import * as AttributesRes from './model/AttributesRes';

export default class Services {
  public static getUnitDimensions() {
      return RESOURCE.get<AttributesRes.Dimensions>(GET_UNIT_DIMENSIONS);
  }


}
