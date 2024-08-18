"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CookieIcon } from "@radix-ui/react-icons";

export function OpportunityToast() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      description: (
        <div className="flex items-center">
          <CookieIcon className="h-6 w-6 mr-4" />
          <div>
            <span className="block font-semibold">Your next hire powered by coffee!</span>
          </div>
        </div>
      ),
      className: "toast-custom"
    });

    // Inject custom styles directly into the document head
    const toastStyles = `
      .toast-custom {
        background-color: #3B82F6 !important;
        color: #ffffff !important;
        padding: 1rem;
        border-radius: 0.375rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: slideInUp 0.5s ease-out;
      }

      @keyframes slideInUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @media (max-width: 768px) {
        .toast-custom {
          position: fixed;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2rem);
          max-width: 400px;
          z-index: 1000;
        }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = toastStyles;
    document.head.appendChild(styleSheet);
  }, [toast]);

  return null;
}
