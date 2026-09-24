import { recordPageView } from './supabaseService';

function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem('rentabj_analytics_sid');
    if (!sid) {
      sid = 'sid_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      sessionStorage.setItem('rentabj_analytics_sid', sid);
    }
    return sid;
  } catch {
    return 'sid_anon';
  }
}

function detectDevice(): string {
  const ua = navigator.userAgent || '';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'Tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Opera Mini/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
}

function detectBrowser(): string {
  const ua = navigator.userAgent || '';
  if (/chrome|chromium|crios/i.test(ua) && !/edg/i.test(ua)) return 'Chrome';
  if (/edg/i.test(ua)) return 'Edge';
  if (/safari/i.test(ua) && !/chrome/i.test(ua)) return 'Safari';
  if (/firefox|fxios/i.test(ua)) return 'Firefox';
  return 'Browser';
}

function cleanReferrer(ref: string): string {
  if (!ref) return 'Direct / Bookmarks';
  try {
    const url = new URL(ref);
    if (url.origin === window.location.origin) return 'Internal';
    if (url.hostname.includes('google')) return 'Google Search';
    if (url.hostname.includes('whatsapp') || ref.includes('wa.me')) return 'WhatsApp';
    if (url.hostname.includes('instagram')) return 'Instagram';
    if (url.hostname.includes('facebook') || url.hostname.includes('fb.')) return 'Facebook';
    if (url.hostname.includes('twitter') || url.hostname.includes('t.co') || url.hostname.includes('x.com')) return 'X / Twitter';
    if (url.hostname.includes('tiktok')) return 'TikTok';
    if (url.hostname.includes('linkedin')) return 'LinkedIn';
    return url.hostname.replace(/^www\./, '');
  } catch {
    return ref.slice(0, 50);
  }
}

let lastTrackedPath = '';
let lastTrackedTime = 0;

export function trackVisitor(pathname: string, search = '') {
  // Never track admin routes
  if (pathname.startsWith('/admin')) return;

  const fullPath = search ? `${pathname}${search}` : pathname;
  const now = Date.now();

  // Debounce duplicate tracking on instant reload/renders (within 3 seconds for same path)
  if (fullPath === lastTrackedPath && now - lastTrackedTime < 3000) {
    return;
  }

  lastTrackedPath = fullPath;
  lastTrackedTime = now;

  const sessionId = getSessionId();
  const device = detectDevice();
  const browser = detectBrowser();
  const referrer = cleanReferrer(document.referrer);

  // Send asynchronously
  recordPageView({
    path: fullPath,
    referrer,
    device,
    browser,
    sessionId,
  }).catch(() => {});
}
