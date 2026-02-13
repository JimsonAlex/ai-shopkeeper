import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(1, "Password is required").max(128),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data);
      const token = res.key || res.access;
      if (token) localStorage.setItem("auth_token", token);
      toast({ title: "Welcome back!", description: "You've logged in successfully." });
      navigate("/");
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message, variant: "destructive" });
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
            Take control of your <span className="text-accent">retail finances</span>
          </h2>
          <p className="text-primary-foreground/50 text-lg leading-relaxed">
            AI-powered accounting that saves you hours every week. Voice input, automatic bookkeeping, and real-time profit tracking.
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
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
          </div>

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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-accent hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-11 pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-lg shadow-md shadow-accent/20"
              disabled={isLoading}
            >
              {isLoading ? "Signing in…" : <><LogIn className="h-4 w-4 mr-2" /> Sign In</>}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:underline font-medium">Sign up</Link>
          </p>

          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
