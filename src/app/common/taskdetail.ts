
import { Injectable } from "@angular/core";

@Injectable()

export class TaskDetail{
    id? : number | undefined;
    project?: string |undefined;
    title? : string |undefined;
    description? : string |undefined;
    date? : any |undefined;
    hours? : number |undefined;
    isPaid? : boolean |undefined;
    isDisabled?:boolean |undefined;
}
