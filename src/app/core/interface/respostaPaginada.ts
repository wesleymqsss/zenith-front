export interface ApiResponsePagina<T> {
  page: number;
  pageSize: number;
  total: number;
  items: T[]; 
}