"use client";

import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CookieIcon } from "@radix-ui/react-icons";

export function OpportunityToast() {
  const { toast } = useToast();

  useEffect(() => {
    // Adding inline styles to ensure the toast appears from the bottom on mobile and is visually distinct
    const toastStyles = `
      @media (max-width: 768px) {
        .toast-container {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          max-width: 400px;
          z-index: 1000;
        }
        .toast {
          width: 100%;
          max-width: 400px;
          color: #fff; /* White text for contrast */
          border-radius: 0.375rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      }
    `;

    // Inject the styles into the document head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = toastStyles;
    document.head.appendChild(styleSheet);

    toast({
      description: (
        <div className="flex items-center">
          <CookieIcon className="h-6 w-6 mr-4" />
          <div>
            <span className="block font-semibold">Your next hire powered by coffee!</span>
          </div>
        </div>
      ),
      className: "toast-container",
    });
  }, [toast]);

  return null;
}
