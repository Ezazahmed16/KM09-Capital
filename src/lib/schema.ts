import * as z from "zod"

// ==========================================
// ENUMS & SCHEMAS FOR USER / MEMBER
// ==========================================
export const userRoleSchema = z.enum(["SuperAdmin", "Admin", "Member"]);
export const userStatusSchema = z.enum(["Pending", "Active", "Inactive", "Suspended"]);

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string().min(1, { message: "First name is required" }).max(100),
  lastName: z.string().max(100).nullable().optional(),
  email: z.string().email({ message: "Invalid email address" }).max(255),
  emailVerified: z.boolean().default(false).optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(255).nullable().optional(),
  phoneNo: z.string().max(20).nullable().optional(),
  whatsAppNumber: z.string().max(20).nullable().optional(),
  img: z.string().url().nullable().optional(),
  imageCldPubId: z.string().nullable().optional(),
  userStatus: userStatusSchema.default("Pending"),
  role: userRoleSchema.default("Member"),
  joiningDate: z.union([z.date(), z.string().datetime()]).optional(),
  startingMonth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Invalid date format (YYYY-MM-DD)" }),
  address: z.string().max(1000).nullable().optional(),
  location: z.string().max(255).nullable().optional(),
  note: z.string().max(1000).nullable().optional(),
});

// ==========================================
// ENUMS & SCHEMAS FOR PAYMENTS
// ==========================================
export const paymentMethodSchema = z.enum(["Bkash", "Nagad", "Bank", "Cash"]);
export const paymentStatusSchema = z.enum(["Pending", "Approved", "Rejected", "NotFound", "Rechecked"]);

export const paymentsSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().min(1, { message: "Invalid user ID" }),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid amount format (e.g. 100.00)" }),
  extraFine: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid fine format" }).default("0"),
  total: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid total format" }),
  paymentMonth: z.number().int().min(1).max(12, { message: "Month must be between 1 and 12" }),
  paymentYear: z.number().int().min(2000).max(2100, { message: "Invalid year" }),
  paymentMethod: paymentMethodSchema,
  transactionNo: z.string().max(255).nullable().optional(),
  paymentStatus: paymentStatusSchema.default("Pending"),
  note: z.string().max(1000).nullable().optional(),
  paymentDate: z.union([z.date(), z.string().datetime()]).optional(),
});

// ==========================================
// SCHEMAS FOR SYSTEM SETTINGS
// ==========================================
export const systemSettingsSchema = z.object({
  id: z.number().int().default(1).optional(),
  defaultMonthlyFee: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid fee format" }),
  fineAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid fine format" }),
  fineDeadlineDay: z.number().int().min(1).max(31, { message: "Deadline day must be between 1 and 31" }),
});