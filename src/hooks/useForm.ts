import { ChangeEvent, useEffect, useState } from 'react';
import { validate } from '../utils/validate';

// types
// Values of fields in the form
export interface FormValues {
    [field: string]: any; // TS:index signature
}
// reMapped values object shows touched state of the form whose keys correspond to FormValues.
export type FormTouched<Values> = {
    [K in keyof Values]?: boolean; // TS: mapped types
};
export type FormError<Values> = {
    [K in keyof Values]?: string; // TS: mapped types
};

export type validationSchema<Values> = {
    [K in keyof Values]?: (
        fieldValue: Values[K],
        values: Values
    ) => string | null; // can add a multible error | string[];
    // Values[K] -  Ts : idexed access type
    // to look up the type of a property on another type
};

export interface UseFormProps<Values> {
    initial: Values;
    validateSchema: validationSchema<Values>;
}

export const useForm = <Values extends FormValues>( // Ts : generics constraint
    props: UseFormProps<Values>
) => {
    const { initial, validateSchema } = props;
    // create a state object for our inputs
    const [inputs, setInputs] = useState<FormValues>(initial);
    const initialFormValues = Object.values(initial).join('');

    useEffect(() => {
        // This function runs when the things we are watching change
        setInputs(initial);
    }, [initialFormValues]);


    const [touched, setTouched] = useState<FormTouched<Values>>({});

    const [errors, setErrors] = useState<FormError<Values>>({});
    const [isDisabled, setIsDisabled] = useState<boolean>(true);

    useEffect(() => {
        const isAllNotTouched = Object.keys(initial).length !== Object.values(touched).length;
        const hasErrors = !!Object.values(errors).length;
        setIsDisabled(isAllNotTouched || hasErrors);
    }, [touched, errors]);

    const handleBlur = (
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name } = e.currentTarget;

        //set touched is true if the input is blured
        setTouched({
            ...touched,
            [name]: true,
        });

        // validate inputs
        if (validateSchema[name]) {
            const error = validate({
                value: inputs[name],
                values: inputs,
                validator: validateSchema[name]!,
            });
            if (error) {
                setErrors({
                    ...errors,
                    [name]: error,
                });
            }
            if (!error) {
                errors[name] &&
                    setErrors(prev => {
                        const prevObj = { ...prev };
                        delete prevObj[name];
                        return prevObj;
                    });
            }
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        let { value, name } = e.target;
        const isValueBoolean = typeof initial[name] === 'boolean';
        setInputs(prevState => ({
            // copy the existing state
            ...prevState,
            [name]: isValueBoolean ? !prevState[name] : value,
        }));
    };

    const resetForm = () => {
        setInputs(initial);
    };

    // return the things we want to surface from this custom hook
    return {
        inputs,
        handleChange,
        resetForm,
        handleBlur,
        errors,
        touched,
        setErrors,
        isValid: Object.keys(errors).length === 0,
        isDisabled
    };
};