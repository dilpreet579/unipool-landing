const APK_RELEASE_URL = process.env.NEXT_PUBLIC_APK_URL || "";

export const HAS_APK_URL = APK_RELEASE_URL.trim().length > 0;

// Public, stable URL on our own domain. This route redirects to the current
// GitHub Releases APK URL.
export const APK_URL = HAS_APK_URL ? "/downloads/unipool.apk" : "";

export function getApkAbsoluteUrl(origin: string): string {
  if (!HAS_APK_URL) return "";
  return new URL(APK_URL, origin).toString();
}
