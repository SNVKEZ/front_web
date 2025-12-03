import { useNavigate } from "react-router-dom";

export default function useViewTransitionNavigate() {
  const navigate = useNavigate();

  return (to, opts) => {
    if (!document.startViewTransition) {
      navigate(to, opts);
      return;
    }

    document.startViewTransition(() => {
      navigate(to, opts);
    });
  };
}
