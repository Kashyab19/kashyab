import React from "react";

// Social icons SVG paths
const socialIcons = {
  linkedin: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4.983 3.5C4.983 4.60457 4.08757 5.5 2.983 5.5C1.87843 5.5 0.983002 4.60457 0.983002 3.5C0.983002 2.39543 1.87843 1.5 2.983 1.5C4.08757 1.5 4.983 2.39543 4.983 3.5Z" fill="currentColor" />
      <path d="M0.999512 8.25H4.96618V22.5H0.999512V8.25Z" fill="currentColor" />
      <path d="M8.24951 8.25H12.0662V10.091C12.5942 9.232 13.8455 8.0625 15.9095 8.0625C19.0438 8.0625 20.9995 10.1122 20.9995 13.737V22.5H17.0328V14.737C17.0328 12.9412 16.397 11.8125 14.8995 11.8125C13.427 11.8125 12.7162 12.8602 12.7162 14.737V22.5H8.74951V8.25H8.24951Z" fill="currentColor" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 16.623 4.487 20.536 8.624 21.977C9.124 22.066 9.309 21.756 9.309 21.484C9.309 21.242 9.3 20.579 9.295 19.763C6.766 20.313 6.182 18.615 6.182 18.615C5.73 17.461 5.053 17.151 5.053 17.151C4.087 16.495 5.126 16.509 5.126 16.509C6.193 16.584 6.755 17.605 6.755 17.605C7.707 19.229 9.272 18.758 9.892 18.5C9.981 17.834 10.244 17.383 10.535 17.135C8.418 16.885 6.2 16.084 6.2 12.493C6.2 11.47 6.564 10.62 7.178 9.94C7.081 9.69 6.767 8.694 7.27 7.408C7.27 7.408 8.069 7.142 9.287 8.057C10.043 7.846 10.856 7.74 11.668 7.736C12.48 7.74 13.294 7.846 14.051 8.057C15.268 7.142 16.066 7.408 16.066 7.408C16.57 8.694 16.255 9.69 16.158 9.94C16.774 10.62 17.136 11.47 17.136 12.493C17.136 16.094 14.915 16.883 12.792 17.129C13.143 17.428 13.452 18.02 13.452 18.92C13.452 20.213 13.439 21.17 13.439 21.484C13.439 21.758 13.62 22.07 14.129 21.976C18.265 20.534 21.25 16.622 21.25 12C21.25 6.201 16.549 1.5 10.75 1.5H12Z" fill="currentColor" />
    </svg>
  ),
  substack: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M3 4.5H21V6.75H3V4.5Z" fill="currentColor" />
      <path d="M3 8.25H21V10.5H3V8.25Z" fill="currentColor" />
      <path d="M12 20.25L3 13.5V12.75H21V13.5L12 20.25Z" fill="currentColor" />
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18.244 2.25H21.25L14.48 10.02L22.446 21.75H15.99L11.094 14.69L5.493 21.75H2.485L9.754 13.38L2.145 2.25H8.75L13.17 8.64L18.244 2.25ZM17.12 19.68H18.9L7.56 4.22H5.65L17.12 19.68Z" fill="currentColor" />
    </svg>
  ),
};

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kashyab-murali/",
    icon: socialIcons.linkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/Kashyab19",
    icon: socialIcons.github,
  },
  {
    name: "Substack",
    url: "https://kashyabnarrates.substack.com/",
    icon: socialIcons.substack,
  },
  {
    name: "Twitter",
    url: "https://x.com/karpathism",
    icon: socialIcons.twitter,
  },
];

export const personalInfo = {
  name: "Kashyab",
  heading: "hi, this is Kashyab",
  bio: "i like to build things. when i am not building, i am either writing my blogs or listening to podcasts - mostly about tech, business, economics and startups (sometimes history).",
  current: "current: looking for a new challenge (aka full time job). based in boston",
};

export const works = [
  {
    title: "founding engineer at tradible marketplace",
    url: "https://tradible.io",
    description: "a marketplace for real world collectibles. built the platform from 0 - 1 in 6 months",
  },
  {
    title: "software engineer at verizon",
    url: "https://verizon.com",
    description: "built and maintained the receipt management system for 140M customers (high bills? not my problem)",
  },
  {
    title: "product and engineering at summerize.ai",
    url: "https://summerize.ai",
    description: "built an ai-powered one-click summary tool that worked on websites, videoss, and pdfs. reached 300 organic users in less than 10 days",
  },
  {
    title: "thinking and writing about how systems work?",
    url: "https://kashyabnarrates.substack.com/",
    description: "wrote nearly 10+ system design topics on my substack. grew it 1500 views and 35 subscribers.",
  },
];

export const beliefs = [
  "slow is fake",
  "never stop learning",
  "be patient with the results and impatient with the actions",
];

export const navLinks = [
  {
    label: "email",
    url: "mailto:kashyabmu19@gmail.com",
  },
  {
    label: "twitter",
    url: "https://x.com/karpathism",
  },
  {
    label: "github",
    url: "https://github.com/Kashyab19",
  },
];

