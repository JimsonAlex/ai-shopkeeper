import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Mail } from "lucide-react";

const forgotSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
});

type ForgotForm = z.infer<typeof forgotSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotForm) => {
    setIsLoading(true);
    try {
      await requestPasswordReset(data.email);
      setSubmitted(true);
      toast({ title: "Check your email", description: "If that email exists, we've sent reset instructions." });
    } catch {
      setSubmitted(true);
      toast({ title: "Check your email", description: "If that email exists, we've sent reset instructions." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left branded panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--accent)/0.12),transparent_60%)]" />
        <div className="relative z-10">
          <Link to="/" className="font-display text-2xl font-bold text-primary-foreground tracking-tight">
            Nexus
          </Link>
        </div>
        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-bold text-primary-foreground leading-tight mb-4">
            No worries, we've got <span className="text-accent">your back</span>
          </h2>
          <p className="text-primary-foreground/50 text-lg leading-relaxed">
            Reset your password in seconds and get right back to managing your business.
          </p>
        </div>
        <div className="relative z-10">
          <p className="text-primary-foreground/30 text-sm">© 2026 Nexus. All rights reserved.</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden">
            <Link to="/" className="font-display text-2xl font-bold text-accent tracking-tight">
              Nexus
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-2xl font-bold text-foreground">Reset your password</h1>
            <p className="text-muted-foreground text-sm">
              {submitted
                ? "Check your inbox for a reset link."
                : "Enter your email and we'll send instructions."}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11"
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg shadow-md shadow-accent/20"
                disabled={isLoading}
              >
                {isLoading ? "Sending…" : <><Mail className="h-4 w-4 mr-2" /> Send Reset Link</>}
              </Button>
            </form>
          ) : (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Mail className="h-8 w-8 text-accent" />
              </div>
              <Link to="/login">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back to login
                </Button>
              </Link>
            </div>
          )}

          {!submitted && (
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
