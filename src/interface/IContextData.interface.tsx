import { ICharactersData } from "./ICharactersData.interface";

export interface IContextData {
  characters: ICharactersData[];
  setCharacters: any;
  setAccesstoken: any;
  accessToken: any;
  setPageNumber: any;
  setSiteSwitch: any;
  pageNumber: number;
  isThereNextPage: any;
  isTherePrevPage: any;
  isAccessToken: any;
  setIsAccessToken: any;
  loading: boolean;
  setLoading: any;
  filterCharactersHandler: any;
  sortCharactersHandler: any;
}
