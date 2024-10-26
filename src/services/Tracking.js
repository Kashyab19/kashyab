// tracking.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Add a flag to prevent duplicate tracking
let hasTracked = false;

export const trackPortfolioView = async () => {
  // Return early if already tracked
  if (hasTracked) {
    return;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const companyName = params.get('medium');

    if (!companyName) return;

    const sanitizedCompany = companyName
      .trim()
      .replace(/[<>{}()]/g, '')
      .slice(0, 100);

    // Set flag before making the request
    hasTracked = true;

    const { error } = await supabase
      .from('link_clicks')
      .insert([{
        company_name: sanitizedCompany
      }]);

    if (error) throw error;

    if (import.meta.env.DEV) {
      console.log('Successfully tracked view for:', sanitizedCompany);
    }
  } catch (error) {
    console.error('Failed to track view:', error);
    // Reset flag if tracking failed
    hasTracked = false;
  }
};