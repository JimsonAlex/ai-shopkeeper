import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Login = () => {
  const navigate = useNavigate();

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
            <p className="text-muted-foreground text-sm">Sign in with your Google account to continue</p>
          </div>

          <GoogleSignInButton
            text="signin_with"
            onSuccess={(res) => {
              const token = res.key || res.access;
              if (token) localStorage.setItem("auth_token", token);
              toast({ title: "Welcome back!", description: "Signed in with Google." });
              navigate("/");
            }}
            onError={(msg) => toast({ title: "Google sign-in failed", description: msg, variant: "destructive" })}
          />

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
