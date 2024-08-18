"use client";

import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { CookieIcon, LightningBoltIcon, Cross2Icon } from "@radix-ui/react-icons"


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
       // Ensure the toast itself is aligned properly
      });
    }, [toast]);
  
    return null;
  }