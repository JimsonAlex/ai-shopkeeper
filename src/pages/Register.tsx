import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import GoogleSignInButton from "@/components/GoogleSignInButton";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left illustration panel — clean white with centered branding + illustration */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative overflow-hidden">
        {/* Subtle background circle */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-accent/5" />

        <div className="relative z-10 flex flex-col items-center gap-8">
          <Link to="/" className="font-display text-3xl font-bold text-foreground tracking-tight">
            Nexus
          </Link>

          {/* Illustration placeholder — abstract shapes like Nexa */}
          <div className="relative w-80 h-80">
            {/* Purple blob */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20"
            />
            {/* Floating elements */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-8 w-12 h-12 rounded-lg bg-accent/20 border border-accent/30 flex items-center justify-center"
            >
              <span className="text-lg">📊</span>
            </motion.div>
            <motion.div
              animate={{ y: [6, -6, 6] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-16 left-4 w-10 h-10 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center"
            >
              <span className="text-sm">⚙️</span>
            </motion.div>
            <motion.div
              animate={{ y: [-4, 10, -4] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-12 left-8 w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center"
            >
              <span className="text-xl">💰</span>
            </motion.div>
            <motion.div
              animate={{ y: [5, -7, 5] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-16 right-4 w-11 h-11 rounded-lg bg-primary/10 border border-primary/15 flex items-center justify-center"
            >
              <span className="text-base">✅</span>
            </motion.div>
            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg">
                <span className="text-3xl">🤖</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel — card-based like Nexa */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card container */}
          <div className="rounded-2xl border border-border bg-card shadow-sm p-8 space-y-6">
            {/* Header with emoji like Nexa */}
            <div className="text-center space-y-1">
              <h1 className="font-display text-2xl font-bold text-foreground">
                Create an account 😊
              </h1>
              {/* Step dots like Nexa */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                <div className="w-2 h-2 rounded-full bg-foreground" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
              </div>
            </div>

            {/* Google sign-up — our auth method */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                Sign up with your Google account to get started
              </p>

              <GoogleSignInButton
                text="signup_with"
                onSuccess={(res) => {
                  const token = res.key || res.access;
                  if (token) localStorage.setItem("auth_token", token);
                  toast({ title: "Account created!", description: "Signed up with Google." });
                  navigate("/onboarding");
                }}
                onError={(msg) => toast({ title: "Google sign-up failed", description: msg, variant: "destructive" })}
              />
            </div>

            {/* Footer link — matches Nexa's "Already have an account? Log In" */}
            <p className="text-sm text-muted-foreground text-center pt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">
                Log In
              </Link>
            </p>
          </div>

          {/* Back link below card */}
          <div className="mt-6 text-center lg:hidden">
            <Link to="/" className="font-display text-xl font-bold text-accent tracking-tight">
              Nexus
            </Link>
          </div>

          <Link
            to="/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to home
          </Link>
        </motion.div>
      </div>

      {/* Theme toggle in top-right corner like Nexa */}
    </div>
  );
};

export default Register;
