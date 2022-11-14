import { environment } from "src/environments/environment";

export const mT = (title: string): string => `${title} | ${environment.APP_NAME}` //makeTittle