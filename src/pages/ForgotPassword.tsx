import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
    } catch (err: any) {
      // Don't reveal whether email exists — always show success
      setSubmitted(true);
      toast({ title: "Check your email", description: "If that email exists, we've sent reset instructions." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.06),transparent_60%)]" />
      <Card className="w-full max-w-md relative z-10 border-border/50 shadow-xl">
        <CardHeader className="text-center space-y-1">
          <Link to="/" className="font-display text-2xl font-bold text-accent mb-2 inline-block">
            NexusLedger
          </Link>
          <CardTitle className="text-xl font-semibold">Reset your password</CardTitle>
          <CardDescription>
            {submitted
              ? "Check your inbox for a reset link."
              : "Enter your email and we'll send instructions."}
          </CardDescription>
        </CardHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-4">
              <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? "Sending…" : <><Mail className="h-4 w-4 mr-2" /> Send Reset Link</>}
              </Button>
              <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Back to login
              </Link>
            </CardFooter>
          </form>
        ) : (
          <CardFooter className="flex-col gap-4 pt-2">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
              <Mail className="h-8 w-8 text-accent" />
            </div>
            <Link to="/login">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to login
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
