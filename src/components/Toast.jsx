"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function OpportunityToast() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      description: (
        <div className="flex items-center">
          <span className="text-2xl mr-2" role="img" aria-label="Announcement">📣</span>
          <div>
            <span className="font-bold">Open to new opportunities</span>
            <span className="block text-sm text-gray-500">Let's connect and explore possibilities!</span>
          </div>
        </div>
      ),
      className: "opportunity-toast",
      duration: 5000, // Display for 5 seconds
    });

    // Inject custom styles directly into the document head
    const toastStyles = `
      .opportunity-toast {
        background-color: #F0FDF4;
        color: #166534;
        border: 1px solid #BBF7D0;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        animation: slideInUp 0.5s ease-out, fadeOut 0.5s ease-in 4.5s forwards;
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

      @keyframes fadeOut {
        from {
          opacity: 1;
        }
        to {
          opacity: 0;
        }
      }

      @media (max-width: 768px) {
        .opportunity-toast {
          width: calc(100% - 2rem);
          max-width: 400px;
          margin: 0 auto;
        }
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = toastStyles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, [toast]);

  return null;
}
