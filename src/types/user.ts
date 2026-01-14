export interface RegisterFormType {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phone: string;
    emailOptIn: boolean;
    smsOptIn: boolean;
    birthdate: string;
    gender: "MALE" | "FEMALE";
    zipCode?: string;
    address1?: string;
    address2?: string;
}