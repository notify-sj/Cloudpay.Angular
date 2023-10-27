export interface EmployeeProfile {
    emp_image?: string;
    emp_name?: string;
    emp_id?: number;
    emp_email?: string;
}

export interface EmployeeProfileDetail extends EmployeeProfile {
    emp_title?: string;
    emp_altid?: string;
    emp_subcode?: string;
    emp_designation?: string;
    emp_gender?: string;
    emp_dob?: string;
    emp_joindate?: string;
    emp_leftdate?: string;
    emp_status?: boolean;
}
