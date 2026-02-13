import { useEffect, useRef, useCallback, useState } from "react";
import { googleLogin } from "@/lib/api";
import { Loader2 } from "lucide-react";

// Replace with your actual Google Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

interface GoogleSignInButtonProps {
  onSuccess: (response: { key?: string; access?: string }) => void;
  onError: (error: string) => void;
  /** Text to show: "signin_with" | "signup_with" | "continue_with" */
  text?: "signin_with" | "signup_with" | "continue_with";
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: Record<string, unknown>) => void;
          renderButton: (element: HTMLElement, config: Record<string, unknown>) => void;
        };
      };
    };
  }
}

const GoogleSignInButton = ({ onSuccess, onError, text = "signin_with" }: GoogleSignInButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialResponse = useCallback(
    async (response: { credential: string }) => {
      setIsLoading(true);
      try {
        const result = await googleLogin(response.credential);
        onSuccess(result);
      } catch (err: any) {
        onError(err.message || "Google sign-in failed");
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError]
  );

  useEffect(() => {
    const renderButton = () => {
      if (!window.google || !buttonRef.current) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: "popup",
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text,
        width: buttonRef.current.offsetWidth,
        logo_alignment: "left",
      });
    };

    if (window.google) {
      renderButton();
    } else {
      const interval = setInterval(() => {
        if (window.google) {
          clearInterval(interval);
          renderButton();
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [handleCredentialResponse, text]);

  return (
    <div className="relative">
      <div ref={buttonRef} className="w-full [&>div]:!w-full" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/80 backdrop-blur-sm">
          <Loader2 className="h-5 w-5 animate-spin text-accent" />
        </div>
      )}
    </div>
  );
};

export default GoogleSignInButton;
