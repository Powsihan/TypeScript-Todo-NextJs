"use client";

import { loginUser } from "@/api/user";
import Button from "@/components/Button";
import useLoaderStore from "@/store/useLoaderStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { loading, setLoading } = useLoaderStore();
  const router = useRouter();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both fields");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    loginUser({ email, password }, (response) => {
      setLoading(false);
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        router.push("/home");
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    });

  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center font-sans">
      <h1 className={` text-4xl font-bold p-5 text-blue-900`}>
        Login Here
      </h1>
      <form className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-center">
            <Button text="Sign In" onClick={handleSubmit} /></div>
          <div className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => console.log("Switch to sign up")}
              className="cursor-pointer text-blue-600 font-medium"
            >
              Create one
            </span>
          </div>
        </div>
      </form>
    </main>
  );
}
