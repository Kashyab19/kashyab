const variantStyles = {
  default: "border-transparent bg-slate-900 text-slate-50 shadow dark:bg-slate-50 dark:text-slate-900",
  secondary: "border-transparent bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
  destructive: "border-transparent bg-red-500 text-slate-50 shadow dark:bg-red-900 dark:text-slate-50",
  outline: "text-slate-950 dark:text-slate-50",
  success: "border-transparent bg-green-600 text-white shadow",
};

function Badge({ className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center rounded-md border border-slate-200 px-2.5 py-0.5 text-xs font-semibold transition-colors dark:border-slate-800";
  const variantClass = variantStyles[variant] || variantStyles.default;
  return <div className={`${base} ${variantClass} ${className}`.trim()} {...props} />;
}

export { Badge };
