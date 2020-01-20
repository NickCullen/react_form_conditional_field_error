import { FormContextValues, FieldError } from "react-hook-form";
import {get} from 'lodash';

export function getFieldError(form: FormContextValues<any>, field: string): string | undefined {
    const e = get(form.errors, field) as FieldError;
    if(e) {
        return e.message;
    }
    
    return undefined;
}
