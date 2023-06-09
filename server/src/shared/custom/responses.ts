export type RestResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
