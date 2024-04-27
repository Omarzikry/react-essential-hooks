import { renderHook, act, waitFor } from '@testing-library/react';
import { useApiCall } from './useApiCall';
import fetchMock from "jest-fetch-mock";

describe('useApiCall', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('should handle a successful GET request', async () => {
        const mockData = { message: 'Success' };
        fetchMock.mockResponseOnce(JSON.stringify(mockData));

        const { result } = renderHook(() => useApiCall());

        act(() => {
            result.current.callApi({ method: 'GET', url: 'https://example.com' });
        });

        await waitFor(() => expect(result.current.data).toEqual(mockData));

        expect(result.current.isLoading).toBe(false);
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('should handle API errors', async () => {
        const errorMessage = 'Failed to fetch';
        fetchMock.mockRejectOnce(new Error(errorMessage));

        const { result } = renderHook(() => useApiCall());

        act(() => {
            result.current.callApi({ method: 'POST', url: 'https://example.com', body: { key: 'value' } });
        });

        await waitFor(() => expect(result.current.error).toBe(errorMessage));

        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.data).toBeNull();
    });

    it('should set isLoading true when API call is in progress', async () => {
        fetchMock.mockResponseOnce(() => new Promise(resolve => setTimeout(() => resolve(JSON.stringify({ message: 'Delayed success' })), 100)));

        const { result } = renderHook(() => useApiCall());

        act(() => {
            result.current.callApi({ method: 'GET', url: 'https://example.com' });
        });

        expect(result.current.isLoading).toBe(true);

        await waitFor(() => expect(result.current.isLoading).toBe(false));
    });
});