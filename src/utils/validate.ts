export interface ValidateProps {
    value: string;
    values: any;
    validator: (input: any, values: any) => string | null;
}

export const validate = (props: ValidateProps): string | null => {
    const { validator, value, values } = props;
    return validator(value, values);
};

export const validateEmail = (input: string): string | null => {
    // regex for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!input) {
        return 'Please enter email';
    } else if (!emailRegex.test(input)) {
        return 'Please enter a valid email';
    } else {
        return null;
    }
};

// create a medium strength password validation
export const validatePassword = (value: string): string | null => {
    // regex for password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.{8,})/;

    if (!value) {
        return 'Please enter password';
    } else if (!passwordRegex.test(value)) {
        return 'Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character';
    } else {
        return null;
    }
};

// validate name field function making sure it includes first and last name and checking for the length of the names to not be less than 3 characters
export const validateName = (value: string): string | null => {
    // regex for name validation checking for first and last name and length of the names
    const nameRegex = /^[a-zA-Z]{3,} [a-zA-Z]{3,}$/;
    if (!value) return 'Please enter your name';
    if (!nameRegex.test(value)) return 'Please enter your correct first and last name';
    return null;
};

export const validateConfirmPassword = (
    confirmedPassword: string,
    originalPassword: string
): string | null => {
    if (!originalPassword) {
        return 'login_PasswordMissing';
    } else if (!confirmedPassword) {
        return 'login_confirmPassword';
    } else if (confirmedPassword !== originalPassword) {
        return 'login_passwordWrongConfirmation';
    } else {
        return null;
    }
};