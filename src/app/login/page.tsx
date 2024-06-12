"use client";

import { useEffect, useState } from "react";
import { useMutation, gql, ApolloError } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useMutation(LOGIN_MUTATION);
  const router = useRouter();
  const { login, userId } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      router.push("/tasks");
    }
  }, [userId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      const { data } = await loginMutation({ variables: { email, password } });

      login(data.login);
    } catch (err) {
      const error = err as ApolloError;

      setError(error.message);
    }
  };

  return (
    <>
      <h1>Login</h1>
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
        <p>{error}</p>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
