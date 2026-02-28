import { render, screen, cleanup } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchTestimonialData } from '@/store/reducer/actionReducer';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Testimonials from '@/pages/Testimonials';

vi.mock("@/store/hooks", () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
}));

vi.mock("@/store/reducer/actionReducer", () => ({
    fetchTestimonialData: vi.fn(),
}));

const mockedUseAppDispatch = vi.mocked(useAppDispatch);
const mockedUseAppSelector = vi.mocked(useAppSelector);

describe('Testimonial Page Component', () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockedUseAppDispatch.mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    test('renders loading state', () => {
        mockedUseAppSelector.mockReturnValue({ data: null, loading: true, error: false });
        render(
            <MemoryRouter>
                <Testimonials />
            </MemoryRouter>
        );
        const spinner = screen.getByRole('loading');
        expect(spinner).toBeInTheDocument();
    });

    test('renders error state', () => {
        mockedUseAppSelector.mockReturnValue({ data: null, loading: false, error: true });
        render(
            <MemoryRouter>
                <Testimonials />
            </MemoryRouter>
        );
        expect(screen.getByText(/Something went wrong while loading the page/i)).toBeInTheDocument();
    });

    // test('renders testimonial list', () => {
    //     const mockData = [
    //             {
    //                 first_name: "James",
    //                 last_name: "Mitchell",
    //                 star: 5,
    //                 title: "Property Developer",
    //                 content: "<p>I had a great experience with the service. Highly recommend it!Outstanding work on our commercial complex. The project was delivered ahead of schedule and under budget. Highly recommend for any large-scale construction project.</p>"
    //             }
    //         ];
    //     mockedUseAppSelector.mockReturnValue({ data: mockData, loading: false, error: false });
    //     render(
    //         <MemoryRouter>
    //             <Testimonials />
    //         </MemoryRouter>
    //     );
    //     expect(screen.getByText(/Property Developer/i)).toBeInTheDocument();
    // });
});   