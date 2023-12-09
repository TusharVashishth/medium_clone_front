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
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [authState, setAuthState] = useState<AuthStateType>({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState({
    name: [],
    email: [],
    password: [],
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await axios
      .post(REGISTER_URL, authState, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        toast.success("Account created successfully!.please login now.", {
          theme: "colored",
        });
        setLoading(false);
        setAuthState({});
      })
      .catch((err) => {
        setLoading(false);
        console.log("The response is", err.response?.data);
        setErrors(err.response?.data?.errors);
      });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Welcome to Medium and publish your Articals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <form onSubmit={handleSubmit}>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Type your email.."
              onChange={(e) =>
                setAuthState({ ...authState, name: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.name?.[0]}</span>
          </div>
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
              type="password"
              placeholder="Type your password.."
              onChange={(e) =>
                setAuthState({ ...authState, password: e.target.value })
              }
            />
            <span className="text-red-500">{errors?.password?.[0]}</span>
          </div>
          <div className="space-y-1">
            <Label htmlFor="cPasword">Confirm Pasword</Label>
            <Input
              id="cPasword"
              type="password"
              placeholder="Confirm password.."
              onChange={(e) =>
                setAuthState({
                  ...authState,
                  password_confirmation: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4">
            <Button className="w-full" disabled={loading}>
              {loading ? "Processing.." : "Register"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
