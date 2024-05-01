export interface ValidateProps {
    value: string;
    values: any;
    validator: (input: any, values: any) => string | null;
}

export const validate = (props: ValidateProps): string | null => {
    const { validator, value, values } = props;
    return validator(value, values);
};