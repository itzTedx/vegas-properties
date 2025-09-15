import { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Props for the SectionHeader component
 * @interface SectionHeaderProps
 * @property {string} title - The main title of the section
 * @property {string} [subtitle] - Optional subtitle or description text
 * @property {ReactNode} [icon] - Optional icon component to display before the title
 * @property {string} [badge] - Optional Badge or section text
 * @property {string} [className] - Optional additional CSS classes
 * @property {string} [titleClassName] - Optional additional CSS classes for the title
 * @property {string} [subtitleClassName] - Optional additional CSS classes for the subtitle
 * @property {boolean} [hasHighlight] - Whether to highlight part of the title with primary color
 * @property {string} [highlightText] - The text to highlight in the title
 * @property {ReactNode} [action] - Optional action component (e.g., button) to display
 * @property {string} [as] - The level of the heading to use (h1 or h2)
 */
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  containerClassName?: string;
  hasHighlight?: boolean;
  highlightText?: string;
  action?: ReactNode;
  as?: "h1" | "h2";
}

/**
 * A reusable section header component that can be used across different sections
 * with various styling options and configurations.
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="All the Essentials to Begin Your Property Journey"
 *   subtitle="Explore market trends and investment updates"
 *   icon={<IconCollection />}
 *   hasHighlight
 *   highlightText="Property Journey"
 *   action={<AnimatedButton href="/about" text="Learn More" />}
 *   as="h1"
 * />
 * ```
 */
export const SectionHeader = ({
  title,
  subtitle,
  icon,
  badge,
  className,
  titleClassName,
  subtitleClassName,
  containerClassName,
  hasHighlight,
  highlightText,
  action,
  as = "h2",
}: SectionHeaderProps) => {
  const renderTitle = () => {
    if (!hasHighlight || !highlightText) {
      return title.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          {index < title.split("\n").length - 1 && <br />}
        </span>
      ));
    }

    const parts = title.split(highlightText);
    return (
      <>
        {parts[0].split("\n").map((line, index) => (
          <span key={`before-${index}`}>
            {line}
            {index < parts[0].split("\n").length - 1 && <br />}
          </span>
        ))}
        <span className="text-brand-600">{highlightText}</span>
        {parts[1]?.split("\n").map((line, index) => (
          <span key={`after-${index}`}>
            {line}
            {index < parts[1].split("\n").length - 1 && <br />}
          </span>
        ))}
      </>
    );
  };

  return (
    <div className={cn(className)}>
      {badge && (
        <p className="mb-2 inline-flex items-center gap-1 sm:mb-3 sm:gap-1.5">
          {icon}
          {badge}
        </p>
      )}
      <div
        className={cn("z-10 mb-4 grid gap-4 sm:gap-6", "grid-cols-1 sm:grid-cols-2 md:grid-cols-3", containerClassName)}
      >
        {as === "h1" ? (
          <h1
            className={cn(
              "font-medium text-2xl leading-[1.2] sm:col-span-2 sm:text-3xl md:text-4xl lg:text-5xl",
              titleClassName
            )}
          >
            {renderTitle()}
          </h1>
        ) : (
          <h2
            className={cn(
              "font-medium text-2xl leading-[1.2] sm:col-span-2 sm:text-3xl md:text-4xl lg:text-5xl",
              titleClassName
            )}
          >
            {renderTitle()}
          </h2>
        )}
        {subtitle && (
          <p className={cn("text-balance text-base text-muted-foreground sm:text-lg md:text-xl", subtitleClassName)}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
};
