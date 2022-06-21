import { Method } from "axios"


export type AxiosParams = {
    method?: Method;
    url: string;
    params?: object;
};