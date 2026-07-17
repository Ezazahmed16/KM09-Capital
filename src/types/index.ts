// ==========================================
// ENUM TYPES
// ==========================================
export type Role = "SuperAdmin" | "Admin" | "Member";
export type UserStatus = "Pending" | "Active" | "Inactive" | "Suspended";
export type PaymentStatus = "Pending" | "Approved" | "Rejected" | "NotFound" | "Rechecked";
export type PaymentMethod = "Bkash" | "Nagad" | "Bank" | "Cash";

// ==========================================
// TABLE TYPES
// ==========================================

export type User = {
    id: string; // uuid
    name: string;
    firstName?: string;
    lastName?: string | null;
    email: string;
    emailVerified: boolean | null;
    password?: string | null;
    phoneNo?: string | null;
    whatsAppNumber?: string | null;
    img?: string | null;
    image?: string | null;
    imageCldPubId?: string | null;
    userStatus: UserStatus;
    role: Role;
    joiningDate?: Date;
    startingMonth?: string; // date mapped to string by default in some pg drivers, or Date
    address?: string | null;
    location?: string | null;
    note?: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Session = {
    id: string;
    expiresAt: Date;
    token: string;
    ipAddress: string | null;
    userAgent: string | null;
    userId: string; // uuid mapping to User.id
    createdAt: Date;
    updatedAt: Date;
};

export type Account = {
    id: string;
    accountId: string;
    providerId: string;
    userId: string; // uuid mapping to User.id
    accessToken: string | null;
    refreshToken: string | null;
    idToken: string | null;
    accessTokenExpiresAt: Date | null;
    refreshTokenExpiresAt: Date | null;
    scope: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Verification = {
    id: string;
    identifier: string;
    value: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type Payment = {
    id: string; // uuid
    userId: string; // uuid mapping to User.id
    amount: string; // numeric(12, 2) maps to string to preserve precision
    extraFine: string;
    total: string;
    paymentMonth: number;
    paymentYear: number;
    paymentMethod: PaymentMethod;
    transactionNo: string | null;
    paymentStatus: PaymentStatus;
    note: string | null;
    paymentDate: Date;
    createdAt: Date;
    updatedAt: Date;
};

export type SystemSettings = {
    id: number;
    defaultMonthlyFee: string; // numeric(12, 2)
    fineAmount: string; // numeric(12, 2)
    fineDeadlineDay: number;
    createdAt: Date;
    updatedAt: Date;
};

export type FinancialDashboard = {
    id: string; // uuid
    userId: string; // uuid mapping to User.id
    totalMonthsActive: number;
    totalPaid: string; // numeric(12, 2)
    accountStatus: string;
    totalPendingAmount: string; // numeric(12, 2)
    totalFineAmount: string; // numeric(12, 2)
    pendingMonthsDetails: unknown; // jsonb - you can replace 'unknown' with a specific interface if you know the JSON structure
    lastCalculatedAt: Date;
    createdAt: Date;
    updatedAt: Date;
};

// ==========================================
// API & WIDGET TYPES (COMMON PATTERNS)
// ==========================================

export type Payments = Payment & {
    user?: User;
};

export type ListResponse<T = unknown> = {
    data?: T[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};

export type CreateResponse<T = unknown> = {
    data?: T;
};

export type GetOneResponse<T = unknown> = {
    data?: T;
};

declare global {
    interface CloudinaryUploadWidgetResults {
        event: string;
        info: {
            secure_url: string;
            public_id: string;
            delete_token?: string;
            resource_type: string;
            original_filename: string;
        };
    }

    interface CloudinaryWidget {
        open: () => void;
    }

    interface Window {
        cloudinary?: {
            createUploadWidget: (
                options: Record<string, unknown>,
                callback: (
                    error: unknown,
                    result: CloudinaryUploadWidgetResults
                ) => void
            ) => CloudinaryWidget;
        };
    }
}

export interface UploadWidgetValue {
    url: string;
    publicId: string;
}

export interface UploadWidgetProps {
    value?: UploadWidgetValue | null;
    onChange?: (value: UploadWidgetValue | null) => void;
    disabled?: boolean;
}