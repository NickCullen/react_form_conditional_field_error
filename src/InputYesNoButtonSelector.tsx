import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { getFieldError } from './helpers/formHelpers';

export interface IInputYesNoButtonSelectorProps {
    label: string;
    name: string;
    yesText?: string;
    noText?: string;
}


export const InputYesNoButtonSelector: React.FC<IInputYesNoButtonSelectorProps> = (props) => {

    const form  = useFormContext();
    const error = getFieldError(form, props.name);
    const val:boolean = form.watch(props.name);

    useEffect(() => {
        form.register({name: props.name});
        console.log("Registered");
        return () => form.unregister(props.name);
    }, [form.register]);

    function onChange(evt: React.ChangeEvent<HTMLInputElement>):void {
        var v:boolean = evt.target.value === "true" ? true : false;
        console.log("Changed value to = " + v.toString());
        form.setValue(props.name, v);
    }

    return (
        <div className="form-group">
            <label>{props.label}</label>
            <div className="input-group">
                <div className="form-check form-check-inline">
                    <label className="form-check-label">
                        {props.yesText ? props.yesText : "yes"}
                        <input name={props.name} className="form-check-input" type="radio" value="true"
                            onChange={onChange}
                            checked={val === true}
                        />
                    </label>
                    <label className="form-check-label">
                        {props.noText ? props.noText : "no"}
                        <input name={props.name} className="form-check-input" type="radio" value="false"
                            onChange={onChange}
                            checked={val === false}
                        />
                    </label>  
                </div>
                {error &&
                    <span className="u-validation-error-msg"><i className="fas fa-exclamation-square"></i> {error}</span>}
            </div>
        </div>
    )
}