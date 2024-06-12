"use client";

import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
  }
`;

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUp] = useMutation(SIGNUP_MUTATION);
  const { login, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/tasks");
    }
  }, [userId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await signUp({ variables: { email, password } });

      const token = data.signUp;
      login(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}
