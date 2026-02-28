import { render, screen, cleanup } from '@testing-library/react';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServicesData } from '@/store/reducer/actionReducer';
import Services from '@/pages/Services';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';


vi.mock("@/store/hooks", () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
}));

vi.mock("@/store/reducer/actionReducer", () => ({
    fetchServicesData: vi.fn(),
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
                <Services />
            </MemoryRouter>
        );
        const spinner = screen.getByRole('loading');
        expect(spinner).toBeInTheDocument();
    });

    test('renders error state', () => {
        mockedUseAppSelector.mockReturnValue({ data: null, loading: false, error: true });
        render(
            <MemoryRouter>
                <Services />
            </MemoryRouter>
        );
        expect(screen.getByText(/Something went wrong while loading the page/i)).toBeInTheDocument();
    });

    test('renders services list', () => {
        const mockData = {
            year_of_experience: 10,
            services: [
                {
                    title: "Infrastructure Development",
                    description: "Planning, designing, and executing public and private infrastructure including roads, bridges, water systems, and utilities.",
                    points: [
                        "Road & Highway Design",
                        "Bridge Engineering",
                        "Water Supply Systems",
                        "Drainage & Sewerage",
                        "Utility Infrastructure"
                    ],
                    pecial_point: "Roads, bridges, drainage, water supply, and public works."
                }
            ],
        };
        mockedUseAppSelector.mockReturnValue({ data: mockData, loading: false, error: false });
        render(
            <MemoryRouter>
                <Services />
            </MemoryRouter>
        );
        expect(screen.getByText(/Infrastructure Development/i)).toBeInTheDocument();
    });
});