import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProfileData } from "@/store/reducer/actionReducer";
import About from '@/pages/About';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

// 1. Mock the hooks and actions
vi.mock("@/store/hooks", () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
}));

vi.mock("@/store/reducer/actionReducer", () => ({
    fetchProfileData: vi.fn(),
}));

// Setup type-safe mocks
const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedUseAppDispatch = vi.mocked(useAppDispatch);

describe('About Page Component', () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        mockedUseAppDispatch.mockReturnValue(mockDispatch);
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test('renders loading state', () => {
        mockedUseAppSelector.mockReturnValue({ data: null, loading: true, error: false });
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>);
        const spinner = screen.getByRole('loading');
        expect(spinner).toBeInTheDocument();
    });

    test('renders error state', () => {
        mockedUseAppSelector.mockReturnValue({
            data: null,
            loading: false,
            error: true
        });

        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>);

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    test('renders all sections when data is successfully fetched', () => {
        const mockProfileData = {
            profile: {
                bottom_line: "Engineering <strong>Expert</strong>",
                image: { full_url: "test-img.jpg" }
            },
            services: [],
            experiences: [],
            educations: [],
            skills: []
        };

        mockedUseAppSelector.mockReturnValue({
            data: mockProfileData,
            loading: false,
            error: false
        });

        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>);


        expect(screen.getByText('About Me')).toBeInTheDocument();


        expect(screen.getByText(/Engineering/)).toBeInTheDocument();
        expect(screen.getByText(/Expert/)).toBeInTheDocument();
    });

    
});