interface ResultFail {
  success: false;
  error: unknown;
}

interface ResultSuccess<T>{
  success: true;
  data: T;
}

export type Result<T> = ResultSuccess<T> | ResultFail;
