# React Essential Hooks

This package provides a collection of custom React hooks designed to simplify the development of React applications by handling common functionalities such as API calls, form handling, and component mount state.

## Hooks Overview

- `useApiCall`: Manages API calls with support for loading, success, and error states.
- `useForm`: Simplifies form handling including validation and state management.
- `useHasMounted`: Detects if a component has mounted, useful for client-side logic in SSR applications.

## Installation

Before using these hooks, make sure you have React installed in your project as they rely on React's built-in hooks.

```bash
npm install react-essential-hooks
```

## 1. useApiCall Hook
### `callApi` Parameters

The `callApi` function accepts an object with the following properties:

- `method`: The HTTP method to use for the API call. Supported methods are `'GET'`, `'POST'`, `'PUT'`, and `'DELETE'`.
- `url`: The endpoint URL to which the API call is made. This should be a string relative to a base URL, which is typically configured elsewhere in your application.
- `body` (optional): A record (object) of data to be sent as the request body. Relevant for `POST`, `PUT`, and `DELETE` methods. For `GET` requests, this should be omitted.

### Default Values

- `method`: There is no default value; this parameter is required and must be explicitly specified.
- `url`: This parameter is required and must be explicitly specified. There is no default value.
- `body`: The default is `undefined`, meaning no body will be sent with the request unless this property is provided with a value.

### Usage Example

```jsx
import { useApiCall } from 'path/to/hooks';

const YourComponent = () => {
    const { data, error, isLoading, callApi } = useApiCall();

    const fetchData = async () => {
        await callApi({
            method: 'POST',
            url: 'your-endpoint',
            body: { key: 'value' } // Optional for GET requests
        });
    };

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && <div>Render your data here</div>}
            <button onClick={fetchData}>Fetch Data</button>
        </div>
    );
};
```

## 2. useForm Hook

### Parameters
The `useForm` hook is initialized with an object containing the following properties:

- `initial`: An object representing the initial state of the form fields. `Required`.
- `validateSchema`: An object that defines the validation rules for each form field. Each field in the schema is a function that returns an error message string if the validation fails, or null if it passes. `Required`.

Default Behavior
- `useForm` initializes the form with the provided initial values and sets up validation based on the validateSchema. The form is initially set to disabled if any validation fails or not all fields have been interacted with (touched).

### Usage
```jsx
import { useForm } from 'path/to/hooks';

const YourFormComponent = () => {
    const formProps = {
        initial: { fieldName: '' },
        validateSchema: { fieldName: (value) => value ? null : 'This field is required' },
    };

    const { inputs, handleChange, handleBlur, errors, isDisabled } = useForm(formProps);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Your submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="fieldName"
                value={inputs.fieldName}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.fieldName && <p>{errors.fieldName}</p>}
            <button type="submit" disabled={isDisabled}>Submit</button>
        </form>
    );
};
```
## 3. useHasMounted Hook
### Usage

```jsx
import { useHasMounted } from 'path/to/hooks';

const YourComponent = () => {
    const hasMounted = useHasMounted();

    return <div>{hasMounted ? 'The component has mounted.' : 'The component has not mounted yet.'}</div>;
};
```

### Contributing
Contributions are welcome! If you have a feature request, bug report, or a suggestion, please open an issue on our GitHub repository. For pull requests, please follow the existing code style and include tests for any new or changed functionality.

### License
This project is licensed under the MIT License - see the LICENSE file for details.

