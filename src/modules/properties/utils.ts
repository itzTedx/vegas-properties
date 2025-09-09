export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const result = document.execCommand("copy");
    textArea.remove();
    return result;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Opens email client with pre-filled subject and body
 * @param subject - Email subject
 * @param body - Email body
 * @param to - Email recipient (optional)
 */
export function shareViaEmail(subject: string, body: string, to?: string): void {
  const mailtoUrl = `mailto:${to || ""}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, "_blank");
}

/**
 * Opens Facebook share dialog in a new tab
 * @param url - URL to share
 * @param text - Optional text to include
 */
export function shareViaFacebook(url: string, text?: string | null): void {
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}${text ? `&quote=${encodeURIComponent(text)}` : ""}`;
  window.open(shareUrl, "_blank");
}

/**
 * Opens Twitter/X share dialog in a new tab
 * @param url - URL to share
 * @param text - Optional text to include
 */
export function shareViaTwitter(url: string, text?: string | null): void {
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}${text ? `&text=${encodeURIComponent(text)}` : ""}`;
  window.open(shareUrl, "_blank");
}

/**
 * Opens Instagram (note: Instagram doesn't support direct sharing via URL)
 * This will copy the link to clipboard and show a message
 * @param url - URL to share
 */
export function shareViaInstagram(url: string): void {
  copyToClipboard(url).then((success) => {
    if (success) {
      // You can add a toast notification here
      console.log("Link copied! You can now paste it in Instagram.");
    }
  });
}

/**
 * Uses the Web Share API if available, falls back to copy to clipboard
 * @param url - URL to share
 * @param title - Optional title
 * @param text - Optional text
 */
export async function shareViaNativeAPI(url: string, title?: string, text?: string): Promise<boolean> {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || "Check out this deal!",
        text: text || "I found an amazing deal you might like!",
        url: url,
      });
      return true;
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error sharing:", error);
      }
      return false;
    }
  } else {
    // Fallback to copy to clipboard
    return await copyToClipboard(url);
  }
}
