import { useCallback, useState } from "react";

type ApiCallFunction = (config: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    body?: Record<string, any>;
}) => Promise<void>;

type ApiResponse<T> = {
    data: T | null;
    error: string | null;
    isLoading: boolean;
    callApi: ApiCallFunction;
};

export function useApiCall<T>(): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);



    const callApi: ApiCallFunction = useCallback(async ({ method, url, body }) => {
        setIsLoading(true);
        setData(null); // Reset data
        setError(null); // Reset error

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: method !== 'GET' ? JSON.stringify(body) : undefined, // Only include body for relevant methods
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result: T = await response.json();
            setData(result);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else if (typeof error === 'string') {
                setError(error);
            } else {
                setError('An unexpected error occurred');
                console.error(error);
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { data, error, isLoading, callApi };
};
