import {ShortifyRequest, Result} from "../types";

export default (input:ShortifyRequest): Result => {
  if (!validate(input)){
    console.log("A validação falhou!")
    return {
      isFailure: true,
      message: "Validação falhou, verifique os dados e tente novamente."
    }
  }
  
  return {
    isSuccess: true,
    value: {
      ...input,
      shortifiedUrl: "https://mock.com/abcde123"
    }
  }
}

const validate = (input:ShortifyRequest) => {
  try {
    if (input.url == undefined || input.url.trim().length === 0) return false;
    if (input.isTemporary == undefined || typeof input.isTemporary !== "boolean" ) return false;

    return true;
  } catch (error) {
    console.error(error)
    return false;
  }
  
}