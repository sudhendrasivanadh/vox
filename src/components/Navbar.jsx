import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar({ accessibilityMode }) {
  const location = useLocation();

  useEffect(() => {
    if (accessibilityMode !== "blind") return;

    const pageName =
      location.pathname === "/"
        ? "Dashboard"
        : location.pathname.replace("/", "");

    const utterance = new SpeechSynthesisUtterance(
      `You are on the ${pageName} page`
    );

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [location, accessibilityMode]);

  return (
    <div className="navbar">
      <div className="search-wrapper">
        <input placeholder="Search..." />
      </div>
    </div>
  );
}

export default Navbar;