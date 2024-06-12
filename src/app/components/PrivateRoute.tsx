import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userId) {
      router.push("/login");
    }
  }, [userId, router]);

  if (!userId) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
