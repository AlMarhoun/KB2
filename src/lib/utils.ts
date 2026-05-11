/**
 * Misc utilities: classnames helper, time formatters, share helpers.
 */

export const cn = (...classes: (string | false | null | undefined)[]): string =>
  classes.filter(Boolean).join(' ');

/**
 * Format relative time: "5 minutes ago" / "قبل 5 دقايق"
 */
export const formatRelativeTime = (
  timestamp: number,
  lang: 'ar' | 'en',
  t: { now: string; ago: string; minute: string; minutes: string; hour: string; hours: string; day: string; days: string },
): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return t.now;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    const word = minutes === 1 ? t.minute : t.minutes;
    return lang === 'ar' ? `${t.ago} ${minutes} ${word}` : `${minutes} ${word} ${t.ago}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    const word = hours === 1 ? t.hour : t.hours;
    return lang === 'ar' ? `${t.ago} ${hours} ${word}` : `${hours} ${word} ${t.ago}`;
  }

  const days = Math.floor(hours / 24);
  const word = days === 1 ? t.day : t.days;
  return lang === 'ar' ? `${t.ago} ${days} ${word}` : `${days} ${word} ${t.ago}`;
};

/**
 * Trigger native share API if available, fallback to clipboard.
 */
export const shareLink = async (
  url: string,
  title: string,
  text: string,
): Promise<'shared' | 'copied' | 'failed'> => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch {
      /* user dismissed */
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    return 'copied';
  } catch {
    return 'failed';
  }
};

/**
 * Trigger gentle haptic feedback (mobile only — silently no-op elsewhere).
 */
export const haptic = (ms = 10): void => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(ms);
  }
};
