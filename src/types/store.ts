export interface StoreData{
    data: contactDetails | null;
    loading: boolean;
    error: boolean;
}

export interface TestimonialStoreData{
    data:  testimonialData[] | [];
    loading: boolean;
    error: boolean;
}

export interface serviceStoreData{
    data:  serviceData[] | [];
    loading: boolean;
    error: boolean;
}
export interface contactDetails{
    email: string;
    phone: string;
    address: string;
}

export interface testimonialData{
    first_name: string;
    last_name: string;
    content: string;
    star: number;
    title: string;
}

export interface serviceData{
    title: string;
    description: string;
    points: string[];
    special_point: string;
}