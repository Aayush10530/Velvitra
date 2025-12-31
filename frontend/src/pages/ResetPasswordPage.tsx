import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const resetPasswordSchema = z.object({
    password: z.string()
        .min(1, "Password is required")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            // NOTE: This page assumes the user clicked the link in email, which sets the session.
            // Supabase "magic link" for password reset logs the user in automatically.
            const { error } = await supabase.auth.updateUser({ password: data.password });
            if (error) throw error;

            toast.success("Password updated successfully!");
            navigate("/");
        } catch (error: any) {
            console.error("Password reset failed:", error);
            toast.error(error.message || "Failed to reset password.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-10 flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-playfair font-bold text-center mb-6">Reset Password</h1>
                <p className="text-center text-gray-600 mb-8">
                    Enter your new password below.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="password">New Password</Label>
                        <Input
                            id="password"
                            type="password"
                            {...register("password")}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">{errors.password.message as string}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                            Password must contain uppercase, lowercase, number, and special character
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            className={errors.confirmPassword ? "border-red-500" : ""}
                        />
                        {errors.confirmPassword && (
                            <p className="text-sm text-red-500">{errors.confirmPassword.message as string}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
