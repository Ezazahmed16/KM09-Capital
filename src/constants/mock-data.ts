import {Payments} from "@/types";

export const MOCK_PAYMENTS: Payments[] = [
    {
        paymentId: 1029384756,
        user_id: 101,
        amount: 500.00,
        extraFees: 10.00,
        totalAmount: 510.00,
        paymentsMethod: "Bkash",
        trxNo: "TXN-998273645",
        paymentStatus: "Success",
        note: "Monthly subscription fee",
        createdAt: "2026-07-01T10:30:00Z"
    },
    {
        paymentId: 8827364510,
        user_id: 102,
        amount: 1200.50,
        extraFees: 0.00,
        totalAmount: 1200.50,
        paymentsMethod: "Bank Transfer",
        trxNo: "TXN-112233445",
        paymentStatus: "Pending",
        note: "Service upgrade",
        createdAt: "2026-07-05T14:15:22Z"
    },
    {
        paymentId: 3344556677,
        user_id: 103,
        amount: 300.00,
        extraFees: 15.00,
        totalAmount: 315.00,
        paymentsMethod: "Nagad",
        trxNo: "TXN-887766554",
        paymentStatus: "Failed",
        note: "Insufficient funds",
        createdAt: "2026-07-10T09:00:00Z"
    },
    {
        paymentId: 9900112233,
        user_id: 104,
        amount: 450.00,
        extraFees: 5.00,
        totalAmount: 455.00,
        paymentsMethod: "Upay",
        trxNo: "TXN-445566778",
        paymentStatus: "Success",
        note: "Processing fee",
        createdAt: "2026-07-12T16:45:10Z"
    },
    {
        paymentId: 5566778899,
        user_id: 105,
        amount: 150.00,
        extraFees: 0.00,
        totalAmount: 150.00,
        paymentsMethod: "Cash",
        trxNo: "TXN-223344556",
        paymentStatus: "Success",
        note: "Small balance clear",
        createdAt: "2026-07-13T11:20:00Z"
    },
    {
        paymentId: 2211998877,
        user_id: 106,
        amount: 800.00,
        extraFees: 20.00,
        totalAmount: 820.00,
        paymentsMethod: "Rocket",
        trxNo: "TXN-556677889",
        paymentStatus: "Rechack",
        note: "Awaiting confirmation",
        createdAt: "2026-07-14T08:10:00Z"
    },
    {
        paymentId: 6677443322,
        user_id: 107,
        amount: 250.75,
        extraFees: 2.25,
        totalAmount: 253.00,
        paymentsMethod: "Bkash",
        trxNo: "TXN-334411998",
        paymentStatus: "Success",
        note: "Digital product purchase",
        createdAt: "2026-07-14T19:05:30Z"
    },
    {
        paymentId: 1122334455,
        user_id: 108,
        amount: 600.00,
        extraFees: 0.00,
        totalAmount: 600.00,
        paymentsMethod: "Nagad",
        trxNo: "TXN-998877665",
        paymentStatus: "Pending",
        note: "Quarterly maintenance",
        createdAt: "2026-07-15T09:30:00Z"
    },
    {
        paymentId: 4455667711,
        user_id: 109,
        amount: 100.00,
        extraFees: 10.00,
        totalAmount: 110.00,
        paymentsMethod: "Upay",
        trxNo: "TXN-776655443",
        paymentStatus: "Success",
        note: "Late payment penalty included",
        createdAt: "2026-07-15T10:00:00Z"
    },
    {
        paymentId: 7788990022,
        user_id: 110,
        amount: 2000.00,
        extraFees: 50.00,
        totalAmount: 2050.00,
        paymentsMethod: "Bank Transfer",
        trxNo: "TXN-101010202",
        paymentStatus: "Rechack",
        note: "Annual premium",
        createdAt: "2026-07-15T11:40:00Z"
    }
];