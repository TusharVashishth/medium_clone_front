"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { CHECK_CREDENTIALS } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthStateType>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: [],
    password: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    axios
      .post(CHECK_CREDENTIALS, authState, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        const response = res.data;
        setLoading(false);
        if (response?.status == 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            redirect: true,
            callbackUrl: "/",
          });
        } else if (response?.status == 401) {
          toast.error(response?.message, { theme: "colored" });
        }
      })
      .catch((err) => {
        setLoading(false);
        setErrors(err?.response?.data?.errors);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Welcome back!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Type your email.."
              onChange={(e) =>
                setAuthState({ ...authState, email: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.email?.[0]}</span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Type your password.."
              type="password"
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.password?.[0]}</span>
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {" "}
              {loading ? "Processing.." : "Login"}{" "}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
