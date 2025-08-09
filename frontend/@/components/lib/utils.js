
import { clsx } from 'clsx'; // Import the 'clsx' utility for conditionally joining classNames togethe
import { twMerge } from 'tailwind-merge'; // Import 'twMerge' from 'tailwind-merge' to intelligently merge Tailwind CSS classes and resolve conflicts


export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
