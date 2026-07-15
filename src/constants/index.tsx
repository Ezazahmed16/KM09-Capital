export const AllPaymentMethods = [
    'Cash',
    'Bkash',
    'Nagad',
    'Upay',
    'Rocket',
    'Bank Transfer',
];

// FIX: Changed AllMonth.map to AllPaymentMethods.map
export const AllPaymentOptions = AllPaymentMethods.map((method) => ({
    value: method,
    label: method,
}));