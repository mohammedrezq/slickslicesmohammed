import { useState } from 'react';

const useForm = (defaults) => {

    const[values, setValues] = useState(defaults);

    const updateValue = (e) => {
        
        // Check if it is a number and convert
        let { value } = e.target;
        if(e.target.type === 'number') {
            value = parseInt(e.target.value)
        }

        setValues({
            // Copy of the existing values into it
            ...values,
            // Update the new value that changed 
            [e.target.name]: value,
        })

    }
    return { values, updateValue }

}

export default useForm;