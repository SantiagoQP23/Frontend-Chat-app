
import { ChangeEvent, useState } from 'react';


export const useForm = <T extends Object> ( initialState : T ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues( initialState );
    }


    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
       
        setValues({
            ...values,
            [ target.name ]: target.value
        });

    }
    const handleInputChecked = ({ target }: ChangeEvent<HTMLInputElement>) => {

      
        setValues({
            ...values,
            [ target.name ]: target.checked
        });

    }

    return { values, handleInputChange, handleInputChecked, reset };

}