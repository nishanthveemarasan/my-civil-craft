import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchContactData } from "@/store/reducer/actionReducer"; // Assuming this is your action
import Contact from '@/pages/Contact';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';


vi.mock("@/store/hooks", () => ({
    useAppSelector: vi.fn(),
    useAppDispatch: vi.fn(),
}));

vi.mock("@/store/reducer/actionReducer", () => ({
    fetchContactData: vi.fn(),
}));

const mockedUseAppSelector = vi.mocked(useAppSelector);
const mockedUseAppDispatch = vi.mocked(useAppDispatch);

describe('Contact Page ', () => {
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
                <Contact />
            </MemoryRouter>
        );

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
                <Contact />
            </MemoryRouter>
        );

        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });

    test('should render contact information (Email, Phone, Address) correctly', () => {
        const mockContactData = {
            email: "support@engineering.com",
            phone: "0731243454",
            address: "12 Some Street, PO4 2T4"
        };

        mockedUseAppSelector.mockReturnValue({
            data: mockContactData,
            loading: false,
            error: false
        });

        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );

        // Verify the data from the backend is visible
        expect(screen.getByText("support@engineering.com")).toBeInTheDocument();
        expect(screen.getByText("0731243454")).toBeInTheDocument();
        expect(screen.getByText(/12 Some Street/i)).toBeInTheDocument();
    });


});

//test the contact form component
import ContactForm from '@/components/ContactPage/ContactForm';
import ApiHelper from "@/components/helper/ApiHelper";
import { useToast } from "@/hooks/use-toast";

vi.mock("@/components/helper/ApiHelper", () => ({
    default: {
        request: vi.fn(),
    },
}));

const mockToast = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
    useToast: () => ({
        toast: mockToast,
    }),
}));

const mockedUseToast = vi.mocked(useToast);

describe('ContactForm Component', () => {

    beforeEach(() => {
        mockedUseToast().toast = mockToast;
    });

    afterEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    test('renders the contact form', () => {
        render(<ContactForm />);

        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
    });

    test('validates form inputs and shows error messages', async () => {
        render(<ContactForm />);

        fireEvent.click(screen.getByRole("button", { name: /send message/i }));
        await waitFor(() => {
            expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/A Valid Email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/The Subject is required/i)).toBeInTheDocument();
            expect(screen.getByText(/Query is required/i)).toBeInTheDocument();
            expect(screen.getByText(/A Valid Phone Number is required/i)).toBeInTheDocument();
        });
    });

    test('show error when wrong email is entered', async () => {
        render(<ContactForm />);
        const email = screen.getByLabelText(/Email/i);
        fireEvent.change(email, { target: { value: "invalidemail" } });
        fireEvent.click(screen.getByRole("button", { name: /send message/i }));

        await waitFor(() => {
            expect(screen.getByText(/A Valid Email is required/i)).toBeInTheDocument();
        });
    });

    test('check form values are present on screen', async () => {

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Inquiry' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there' } });

        await waitFor(() => {
            expect(screen.getByDisplayValue(/John Doe/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/john@example.com/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/1234567890/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/Inquiry/i)).toBeInTheDocument();
            expect(screen.getByDisplayValue(/Hello there/i)).toBeInTheDocument();
        });


    });

    test('Submit Form Successfully', async () => {
        vi.mocked(ApiHelper.request).mockResolvedValue({
            success: true,
            result: {
                message: "Thank you for contacting us!"
            }
        });

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Phone Number/i), { target: { value: '1234567890' } });
        fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: 'Inquiry' } });
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello there' } });

        fireEvent.click(screen.getByRole("button", { name: /send message/i }));

        await waitFor(() => {
            expect(ApiHelper.request).toHaveBeenCalledWith(expect.objectContaining({
              method: "POST",
              endpoint: "api/contact-us",
                body: expect.objectContaining({
                    name: "John Doe",
                    email: "john@example.com",
                    phone: "1234567890",
                    subject: "Inquiry",
                    message: "Hello there"
                }),
            }));
            expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({
              title: "Message sent!"
            }));
          });
    });
});
