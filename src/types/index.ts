export type Payments = {
    paymentId: number;
    // trxId: number;
    user_id: number;
    amount: number;
    extraFees: number;
    totalAmount: number;
    paymentsMethod: boolean;
    trxNo: string;
    paymentStatus: boolean;
    note: string;
    createdAt: string;
}