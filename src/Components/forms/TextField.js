import React from 'react'
import { useField, ErrorMessage } from 'formik'

export const TextField = ({label, ...props}) => {
    
     //field returns the name of the TextField & meta returns the status of the TextField
    const [field, meta] = useField(props);

        return (

            <div className="form-floating mb-4">
                <input  
                    className={`form-control ${meta.touched && meta.error && 'is-invalid'} data-input`} 
                    autoComplete="off"
                    {...field} 
                    {...props}
                />

                <label htmlFor={props.id}>{label}</label>

                {/* Printing Error Message that we define in validation schema */}
                <ErrorMessage 
                    name={field.name} 
                    component="div" 
                    className="error-message" 
                />

            </div>
        )
}