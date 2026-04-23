export const APK_URL = process.env.NEXT_PUBLIC_APK_URL || "/downloads/unipool.apk";

export function getApkAbsoluteUrl(origin: string): string {
  return new URL(APK_URL, origin).toString();
}
