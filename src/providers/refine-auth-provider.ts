import { AuthProvider } from "@refinedev/core";
import { BACKEND_BASE_URL } from "@/constants";

export const refineAuthProvider: AuthProvider = {
    login: async ({ email, password }) => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}auth/sign-in/email`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            if (response.ok) {
                return {
                    success: true,
                    redirectTo: "/dashboard",
                };
            }
            return {
                success: false,
                error: {
                    message: "Login failed",
                    name: "Invalid credentials",
                },
            };
        } catch (error: any) {
            return {
                success: false,
                error: {
                    message: error.message || "Login failed",
                    name: "Error",
                },
            };
        }
    },
    logout: async () => {
        try {
            await fetch(`${BACKEND_BASE_URL}auth/sign-out`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            return {
                success: true,
                redirectTo: "/",
            };
        } catch (error) {
            return {
                success: false,
            };
        }
    },
    check: async () => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}auth/get-session`, {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.user) {
                    if (data.user.userStatus === "Active") {
                        return {
                            authenticated: true,
                        };
                    } else if (data.user.userStatus === "Pending") {
                        return {
                            authenticated: false,
                            redirectTo: "/pending-approval",
                            error: new Error("Pending Approval"),
                        };
                    }
                }
            }
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        } catch (error) {
            return {
                authenticated: false,
                redirectTo: "/login",
            };
        }
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    getIdentity: async () => {
        try {
            const response = await fetch(`${BACKEND_BASE_URL}auth/get-session`, {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                if (data && data.user) {
                    return data.user;
                }
            }
            return null;
        } catch (error) {
            return null;
        }
    },
};
