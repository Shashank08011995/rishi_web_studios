import { WA_LINK } from "../constants.js";
import { WaIcon } from "./icons.jsx";

export default function WhatsappButton({ children = "Chat on WhatsApp", className = "btn btn-wa" }) {
  return (
    <a className={className} href={WA_LINK} target="_blank" rel="noopener noreferrer">
      <WaIcon />
      {children}
    </a>
  );
}
