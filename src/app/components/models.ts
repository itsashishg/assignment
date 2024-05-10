type PrivacyAccess = 'private' | 'public';

export interface PinData {
    title: string;
    imageURL: string;
    collaborators: CustomerData[];
    privacy: PrivacyAccess;
}

export interface CustomerData {
    title: string;
    email: string;
    region: string;
    country: string;
}
