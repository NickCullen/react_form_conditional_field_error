import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { getFieldError } from './helpers/formHelpers';
import Select, { ValueType } from 'react-select';
import { ActionMeta } from 'react-select';

export interface ISelectItemSettings {
    textProperty:string;
    valueProperty:string;
}

interface SelectItem {
    label: string;
    value: any;
}

export interface IInputMultiSelectProps {
    label: string;
    name: string;
    items: Array<any>;
    settings:ISelectItemSettings;
}


export const InputMultiSelectBox: React.FC<IInputMultiSelectProps> = (props) => {

    const form  = useFormContext();
    const error = getFieldError(form, props.name);
    const value = form.watch(props.name);

    useEffect(() => {
        form.register({name: props.name});
        console.log("yes/no box register");
        return () => form.unregister(props.name);
    }, [form.register]);

    function onChange(data: ValueType<SelectItem>, action: ActionMeta): void {
        console.log("Changing");
        const asArray = data as Array<SelectItem>;
        if(asArray !== null) {
            form.setValue(props.name, asArray.map(reverseMapItem));
        } else {
            form.setValue(props.name, new Array<any>());
        }
    }

    function getItems():Array<SelectItem> {
        return props.items.map(mapItem);
    }

    function mapValues():Array<SelectItem> {
        let selectedValues: Array<SelectItem> = new Array<SelectItem>();

        for(let i = 0; i < value.length; i++) {
            let val = props.items.find(
                item => item[props.settings.valueProperty] === value[i]
            );

            if(val !== undefined) {
                selectedValues.push(mapItem(val));
            }
        }

        return selectedValues;
    }
    
    function mapItem(item: any): SelectItem {
        return {
            label: item[props.settings.textProperty],
            value: item[props.settings.valueProperty]
        }
    }

    function reverseMapItem(selectedItem: SelectItem): any {
        return selectedItem.value;
    }

    return (
        <div className="c-DropdownPicker form-group">
            {props.label && (
                <label className="c-DropdownPicker-Label">
                    {props.label}
                </label>
            )}
            <div className="input-group">

                <Select 
                    name={props.name}
                    isMulti={true}
                    options={getItems()}
                    onChange={onChange}
                    value={mapValues()}
                    isSearchable={true}
                    className=  {"c-DropdownPicker-Select " +
                                    (error ? " validation-error " : "")
                                }
                />


            </div>
            {error &&
                <span className="u-validation-error-msg"><i className="fas fa-exclamation-square"></i> {error}</span>}
        </div>
    )
}