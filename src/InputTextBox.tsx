import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { getFieldError } from './helpers/formHelpers';

export interface IInputTextBoxProps {
    name: string;
    label?: string;
    placeholder?: string;
    type?: string;
    className?: string;
}


export const InputTextBox: React.FC<IInputTextBoxProps> = (props) => {

    const form  = useFormContext();
    const error = getFieldError(form, props.name);
    const value = form.watch(props.name);
    
    useEffect(() => {
        form.register({name: props.name});
        console.log("Registering text box: " + props.name);
        return () => {console.log("unregistring: "+ props.name); form.unregister(props.name);}
    }, [form.register])

    return ( 
        <div className="form-group">
            {props.label && <label>{props.label}</label>}
            <div className="input-group">
                <input 
                    type={props.type ? props.type : "text"}
                    id={props.name}
                    placeholder={props.placeholder}
                    name={props.name}
                    value={value}
                    onChange={(e) => form.setValue(props.name, e.currentTarget.value)}
                    className={"form-control " +
                        (props.className !== undefined ? props.className : "") +
                        (error ? " validation-error " : "")}/>
                {error &&
                    <span className="u-validation-error-msg"><i className="fas fa-exclamation-square"></i> {error}</span>}

            </div>

        </div>
    )
}