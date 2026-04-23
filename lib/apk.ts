export const APK_URL = process.env.NEXT_PUBLIC_APK_URL || "";

export const HAS_APK_URL = APK_URL.trim().length > 0;

export function getApkAbsoluteUrl(origin: string): string {
  if (!HAS_APK_URL) return "";
  return new URL(APK_URL, origin).toString();
}
