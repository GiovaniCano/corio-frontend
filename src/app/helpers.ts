import { environment } from "src/environments/environment";
import { tap } from 'rxjs';

export const mT = (title: string): string => `${title} | ${environment.APP_NAME}` //makeTittle

export const debugObs = () => tap({
    error: (error: any) => console.error('Error: ', error),
    next: (res: any) => console.log('Response: ', res),
    finalize: () => console.log('finalize'),
    // complete: () => console.log('complete')
})