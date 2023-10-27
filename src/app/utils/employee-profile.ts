export interface EmployeeId {
    emp_id?: number;
    emp_altid?: string;
}

export interface EmployeeProfile extends EmployeeId {
    emp_image?: string;
    emp_email?: string;
    emp_name?: string;
}

export interface EmployeeProfileDetail extends EmployeeProfile {
    emp_title?: string;
    emp_subcode?: string;
    emp_designation?: string;
    emp_gender?: string;
    emp_dob?: string;
    emp_joindate?: string;
    emp_leftdate?: string;
    emp_status?: boolean;
}

export interface EmployeeAboutMeDetail extends EmployeeId {
    emp_department?: string;
    emp_location?: string;
}
