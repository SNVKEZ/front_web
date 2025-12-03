import React, { useEffect, useState } from "react";
import PageSkeleton from "./components/PageSkeleton";

export default function RouteLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
    }, 120); 

    return () => {
      setLoading(true);
      clearTimeout(t);
    };
  }, [children]);

  return (
    <div className="min-h-[400px]">
      {loading ? (
        <PageSkeleton />
      ) : (
        <div className="animate-fadeIn">{children}</div>
      )}
    </div>
  );
}
