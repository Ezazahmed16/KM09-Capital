import { ShieldUser, Shield, UsersRound } from "lucide-react";

export const USER_ROLES = {
    SUPERADMIN: "superAdmin",
    ADMIN: "Admin",
    MEMBER: "member",
};

export const ROLE_OPTIONS = [
    {
        value: USER_ROLES.SUPERADMIN,
        label: "Super Admin",
        icon: ShieldUser,
    },
    {
        value: USER_ROLES.ADMIN,
        label: "Admin",
        icon: Shield,
    },
    {
        value: USER_ROLES.MEMBER,
        label: "Member",
        icon: UsersRound,
    },
];

export const PaymentMethods = [
    "Cash",
    "Bkash",
    "Nagad",
    "Bank"
] as const;

export const PaymentMethodsOptions = PaymentMethods.map((payOptions) => ({
    value: payOptions,
    label: payOptions,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];

const getEnvVar = (key: string): string => {
    const value = import.meta.env[key];
    if (!value) {
        console.warn(`Missing environment variable: ${key}`);
        return "";
    }
    return value;
};

export const CLOUDINARY_UPLOAD_URL = getEnvVar("VITE_CLOUDINARY_UPLOAD_URL");
export const CLOUDINARY_CLOUD_NAME = getEnvVar("VITE_CLOUDINARY_CLOUD_NAME");

// Self-healing backend URL formatting to ensure it always points to valid API base
const rawBackendUrl = getEnvVar("VITE_BACKEND_BASE_URL") || (import.meta.env.PROD ? "https://api.km09-capital.com/" : "http://localhost:8000/api/");
export const BACKEND_BASE_URL = rawBackendUrl.endsWith("/api/")
    ? rawBackendUrl
    : (rawBackendUrl.endsWith("/") ? `${rawBackendUrl}api/` : `${rawBackendUrl}/api/`);


export const BASE_URL = import.meta.env.VITE_API_URL;
export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY

export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

export const CLOUDINARY_UPLOAD_PRESET = getEnvVar("VITE_CLOUDINARY_UPLOAD_PRESET");

// export const teachers = [
//     {
//         id: "1",
//         name: "John Doe",
//     },
//     {
//         id: "2",
//         name: "Jane Smith",
//     },
//     {
//         id: "3",
//         name: "Dr. Alan Turing",
//     },
// ];

// export const subjects = [
//     {
//         id: 1,
//         name: "Mathematics",
//         code: "MATH",
//     },
//     {
//         id: 2,
//         name: "Computer Science",
//         code: "CS",
//     },
//     {
//         id: 3,
//         name: "Physics",
//         code: "PHY",
//     },
//     {
//         id: 4,
//         name: "Chemistry",
//         code: "CHEM",
//     },
// ];