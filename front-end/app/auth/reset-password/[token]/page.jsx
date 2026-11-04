import { headers } from 'next/headers';
import ResetPasswordForm from '@/src/feature/password-reset/ResetPasswordForm';
import { resolveLanguage } from '@/src/feature/password-reset/copy';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Reset password · Saqtau AI',
  description: 'Reset your Saqtau AI account password.',
  robots: { index: false, follow: false, nocache: true },
  referrer: 'no-referrer',
};

export default async function ResetPasswordPage({ params, searchParams }) {
  const { token } = await params;
  const requested = (await searchParams)?.lang;
  const locale = resolveLanguage(requested, (await headers()).get('accept-language') || '');
  return <ResetPasswordForm token={token} initialLanguage={locale} />;
}
