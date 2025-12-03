import React from "react";
import { useLocation } from "react-router-dom";
import useViewTransitionNavigate from "../utils/useViewTransitionNavigate";

export default function VTLink({ to, children, className, ...props }) {
  const vtNav = useViewTransitionNavigate();
  const location = useLocation();

  const click = (e) => {
    e.preventDefault();
    if (location.pathname !== to) vtNav(to);
  };

  return (
    <a href={to} className={className} onClick={click} {...props}>
      {children}
    </a>
  );
}
