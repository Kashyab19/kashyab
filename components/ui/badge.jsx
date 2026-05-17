import "./badge.css";

function Badge({ className = "", variant = "default", ...props }) {
  const variantClass = `badge badge--${variant}`;
  return <span className={`${variantClass} ${className}`.trim()} {...props} />;
}

export { Badge };
