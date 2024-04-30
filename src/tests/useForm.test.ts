import { renderHook, act } from '@testing-library/react';
import { useForm } from '../hooks/useForm';  // Adjust the import path
import { ChangeEvent } from 'react';

describe('useForm', () => {
    const initialForm = { name: '', email: '' };
    const validateSchema = {
        name: (value: string) => (!value ? 'Name is required' : null),
        email: (value: string) => (!value.includes('@') ? 'Email is invalid' : null),
    };

    const createChangeEvent = (value: string, name: string) => ({
        target: {
            value,
            name,
            // Add other properties needed by your event handlers
            getAttribute: () => { }, // If needed
        },
        currentTarget: {
            value,
            name,
            // Add other properties needed by your event handlers
            getAttribute: () => { }, // If needed
        },
        preventDefault: () => { }, // If needed
        stopPropagation: () => { }, // If needed
    });

    it('should handle input changes', () => {
        const { result } = renderHook(() => useForm({ initial: initialForm, validateSchema }));

        act(() => {
            result.current.handleChange(createChangeEvent('John', 'name') as unknown as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        });

        expect(result.current.inputs.name).toBe('John');
    });

    it('should handle input blur and validate', () => {
        const { result } = renderHook(() => useForm({ initial: initialForm, validateSchema }));

        act(() => {
            const mockBlurEvent = createChangeEvent('', 'name');
            result.current.handleBlur(mockBlurEvent as unknown as ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>);
        });

        expect(result.current.errors.name).toBe('Name is required');
    });
});