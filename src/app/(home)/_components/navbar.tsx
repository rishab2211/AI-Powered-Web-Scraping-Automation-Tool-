// 'use client';

// import { Workflow, Menu, X } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { Button } from "@/components/ui/button";

// // Type definitions
// interface NavigationLink {
//   href: string;
//   label: string;
// }

// interface MobileMenuProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// interface NavLinkProps {
//   href: string;
//   children: React.ReactNode;
//   onClick?: () => void;
//   className?: string;
// }

// // Navigation links data
// const navigationLinks: NavigationLink[] = [
//   { href: "/", label: "Home" },
//   { href: "#features", label: "Features" },
//   { href: "#pricing", label: "Pricing" },
//   { href: "/support", label: "Support" },
// ];

// // Reusable NavLink component
// const NavLink: React.FC<NavLinkProps> = ({ href, children, onClick, className = "" }) => {
//   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     // Handle smooth scrolling for anchor links
//     if (href.startsWith('#')) {
//       e.preventDefault();
//       const element = document.getElementById(href.substring(1));
//       if (element) {
//         element.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//     onClick?.();
//   };

//   return (
//     <Link
//       href={href}
//       onClick={handleClick}
//       className={`text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200 relative group ${className}`}
//     >
//       {children}
//       <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 transition-all duration-200 group-hover:w-full"></span>
//     </Link>
//   );
// };

// // Mobile menu component
// const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
//   // Prevent rendering if not open
//   if (!isOpen) return null;
  
//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
//         onClick={onClose}
//         aria-hidden="true"
//       />
      
//       {/* Mobile menu panel */}
//       <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-200 shadow-xl lg:hidden z-50 animate-in slide-in-from-top-2 duration-200">
//         <div className="px-6 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
//           {/* Navigation Links */}
//           <nav className="space-y-4" role="navigation" aria-label="Mobile navigation">
//             {navigationLinks.map((link: NavigationLink) => (
//               <NavLink
//                 key={link.href}
//                 href={link.href}
//                 onClick={onClose}
//                 className="block py-2 text-lg"
//               >
//                 {link.label}
//               </NavLink>
//             ))}
//           </nav>
          
//           {/* Action Buttons */}
//           <div className="pt-4 border-t border-neutral-200 space-y-3">
//             <Link href="/sign-in" onClick={onClose} className="block">
//               <Button 
//                 variant="ghost" 
//                 className="w-full justify-start text-neutral-600 hover:text-neutral-900 h-12 text-lg"
//               >
//                 Sign In
//               </Button>
//             </Link>
//             <Link href="/sign-up" onClick={onClose} className="block">
//               <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white h-12 text-lg">
//                 Get Started
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// // Main Navbar component
// const Navbar: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

//   const toggleMobileMenu = (): void => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = (): void => {
//     setIsMobileMenuOpen(false);
//   };

//   // Close mobile menu on escape key
//   React.useEffect(() => {
//     const handleEscape = (event: KeyboardEvent): void => {
//       if (event.key === 'Escape') {
//         closeMobileMenu();
//       }
//     };

//     if (isMobileMenuOpen) {
//       document.addEventListener('keydown', handleEscape);
//       // Prevent body scroll when menu is open
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   return (
//     <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-200/50">
//       <nav className="max-w-7xl mx-auto px-6 lg:px-8" role="navigation" aria-label="Main navigation">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link 
//             href="/" 
//             className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded-lg"
//             aria-label="AutoFlow home"
//           >
//             <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center group-hover:bg-neutral-800 transition-colors duration-200">
//               <Workflow className="w-5 h-5 text-white" aria-hidden="true" />
//             </div>
//             <span className="text-xl font-bold text-neutral-900">AutoFlow</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Desktop navigation">
//             {navigationLinks.map((link: NavigationLink) => (
//               <NavLink key={link.href} href={link.href}>
//                 {link.label}
//               </NavLink>
//             ))}
//           </nav>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center space-x-4">
//             <Link href="/sign-in">
//               <Button 
//                 variant="ghost" 
//                 className="text-neutral-600 hover:text-neutral-900 font-medium focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
//               >
//                 Sign In
//               </Button>
//             </Link>
//             <Link href="/sign-up">
//               <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 font-medium focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2">
//                 Get Started
//               </Button>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <div className="lg:hidden">
//             <Button 
//               variant="ghost" 
//               size="sm" 
//               onClick={toggleMobileMenu}
//               className="text-neutral-600 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
//               aria-expanded={isMobileMenuOpen}
//               aria-controls="mobile-menu"
//               aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="w-6 h-6" aria-hidden="true" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <MobileMenu 
//           isOpen={isMobileMenuOpen} 
//           onClose={closeMobileMenu} 
//         />
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

















"use client"


import { Workflow, Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

// Type definitions
interface NavigationLink {
  href: string;
  label: string;
}

// Navigation links data
const navigationLinks: NavigationLink[] = [
  { href: "/", label: "Home" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

// Server-side NavLink component with smooth scroll via CSS
const NavLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ 
  href, 
  children, 
  className = "" 
}) => {
  return (
    <Link
      href={href}
      className={`text-neutral-600 hover:text-neutral-900 font-medium transition-colors duration-200 relative group ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neutral-900 transition-all duration-200 group-hover:w-full"></span>
    </Link>
  );
};

// Static mobile menu for server component
const StaticMobileMenu: React.FC = () => {
  return (
    <details className="lg:hidden group">
      <summary className="list-none">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-neutral-600 focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 group-open:bg-neutral-100"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 group-open:rotate-90 transition-transform duration-200" aria-hidden="true" />
        </Button>
      </summary>
      
      {/* Mobile menu panel */}
      <div className="absolute top-full left-0 right-0 bg-white border-t border-neutral-200 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
        <div className="px-6 py-4 space-y-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Navigation Links */}
          <nav className="space-y-4" role="navigation" aria-label="Mobile navigation">
            {navigationLinks.map((link: NavigationLink) => (
              <NavLink
                key={link.href}
                href={link.href}
                className="block py-2 text-lg"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          
          {/* Action Buttons */}
          <div className="pt-4 border-t border-neutral-200 space-y-3">
            <Link href="/sign-in" className="block">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-neutral-600 hover:text-neutral-900 h-12 text-lg"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" className="block">
              <Button className="w-full bg-neutral-900 hover:bg-neutral-800 text-white h-12 text-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </details>
  );
};

// Main Server Component Navbar
const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-neutral-200/50">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 relative" role="navigation" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 rounded-lg"
            aria-label="AutoFlow home"
          >
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center group-hover:bg-neutral-800 transition-colors duration-200">
              <Workflow className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-neutral-900">AutoFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8" role="navigation" aria-label="Desktop navigation">
            {navigationLinks.map((link: NavigationLink) => (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/sign-in">
              <Button 
                variant="ghost" 
                className="text-neutral-600 hover:text-neutral-900 font-medium focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-6 font-medium focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu using HTML details/summary */}
          <StaticMobileMenu />
        </div>
      </nav>

      {/* Add smooth scrolling behavior globally */}
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </header>
  );
};

export default Navbar;