import React from "react";

const CategoryBadge = ({ className, icon, children }) => {
  console.log("CategoryBadge rendered with class:", className); // Log the class name
  return (
    <div
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {icon} {/* Render the icon here */}
      {children}
    </div>
  );
};

export default CategoryBadge;
