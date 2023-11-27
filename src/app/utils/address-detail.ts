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
    Permanent?: Address;
    Mailing?: Address;
    emergency?: Address;
}
export interface AddressInformation {
    data?: AddressDetail;
    permission?: any;
}
