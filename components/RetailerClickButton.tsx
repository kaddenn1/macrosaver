"use client";

import { trackRetailerClick, type RetailerClickEvent } from "@/lib/analytics";

export default function RetailerClickButton({
  href,
  label,
  className,
  event,
}: {
  href: string;
  label: string;
  className?: string;
  event: RetailerClickEvent;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow sponsored noopener"
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        trackRetailerClick(event);
      }}
    >
      {label}
    </a>
  );
}
