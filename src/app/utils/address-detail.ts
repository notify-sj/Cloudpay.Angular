export interface Address {
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    pincode?: string;
    phone?: string;
    mobile?: string;
    emergencycontact?: string;
}
export interface AddressDetail {
    permanent?: Address;
    mailing?: Address;
    emergency?: Address;
}
