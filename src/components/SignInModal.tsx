
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export const SignInModal = () => {
  const id = useId();
  
  return (
    <DialogContent>
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          <svg
            className="stroke-zinc-800 dark:stroke-zinc-100"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
          </svg>
        </div>
        <DialogHeader>
          <DialogTitle className="sm:text-center">Sign in to FlowSense</DialogTitle>
          <DialogDescription className="sm:text-center">
            Enter your credentials to access your dashboard.
          </DialogDescription>
        </DialogHeader>
      </div>

      <form className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${id}-name`}>Full name</Label>
            <Input id={`${id}-name`} placeholder="Enter your full name" type="text" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-email`}>Email</Label>
            <Input id={`${id}-email`} placeholder="Enter your email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Input
              id={`${id}-password`}
              placeholder="Enter your password"
              type="password"
              required
            />
          </div>
        </div>
        <Button type="button" className="w-full">
          Sign in
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        By signing in you agree to our{" "}
        <a className="underline hover:no-underline" href="#">
          Terms of Service
        </a>
        .
      </p>
    </DialogContent>
  );
};
