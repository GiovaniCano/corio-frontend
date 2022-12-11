import { environment } from "src/environments/environment";
import { tap } from 'rxjs';
import { Itemable_Post } from "./models/Itemable";
import { Item } from "./models/Item";

export const mT = (title: string): string => `${title} | ${environment.APP_NAME}` //makeTittle

export const debugObs = () => tap({
    error: (error: any) => console.error('Error: ', error),
    next: (res: any) => console.log('Response: ', res),
    finalize: () => console.log('finalize'),
    // complete: () => console.log('complete')
})

export const sortObjectsArray = (array: any[], propertyToSort: string = 'name'): any[] => {
    return array.sort(function (a, b) {
        a = a[propertyToSort]
        b = b[propertyToSort]

        return a.localeCompare(b)
    })
}

export function makeItemablePostFromItem(itemWithPivot: Item, trail: string): Itemable_Post {
    return {
        item_id: itemWithPivot.id,
        quantity: itemWithPivot.pivot!.quantity,
        measurement_unit_id: itemWithPivot.pivot!.measurement_unit.id,
        trail: trail
    }
}