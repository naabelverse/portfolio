type ClassValue = string | false | null | undefined | ClassValue[];

/**
 * Joins class names, dropping anything falsy.
 *
 * Deliberately does not merge conflicting Tailwind utilities: this project
 * renames the `text-*` and `rounded-*` scales to the DESIGN.md tokens, which
 * merge libraries misclassify (they read `text-body` as a colour). Components
 * therefore compose classes additively and never rely on override order.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else {
      out.push(input);
    }
  }

  return out.join(" ");
}
