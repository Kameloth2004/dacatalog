import { Role } from "types/role";
import { getAuthData } from "./storage";
import jwtDecode from "jwt-decode";


export type TokenData = {
    exp: number;
    user_name: string;
    authorities: Role[];
  };
  
  export const getTokenData = (): TokenData | undefined => {
    const LoginResponse = getAuthData();
  
    try {
      return jwtDecode(LoginResponse.access_token) as TokenData;
    } catch (error) {
      return undefined;
    }
  };