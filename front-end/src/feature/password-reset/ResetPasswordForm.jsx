'use client';

import { useRef, useState } from 'react';
import { Check, Eye, EyeOff, LockKeyhole, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { copy, languages } from './copy';
import { isResetToken, validatePassword } from './validation';

export default function ResetPasswordForm({ token, initialLanguage = 'ru' }) {
  const [language, setLanguage] = useState(initialLanguage);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const submitting = useRef(false);
  const t = copy[language] || copy.ru;
  const validToken = isResetToken(token);
  const busy = status === 'submitting';
  const success = status === 'success';
  const invalid = !validToken || error === 'invalid';

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting.current || success || invalid) return;
    const validation = validatePassword(password, confirmation);
    if (validation) { setError(validation); return; }
    submitting.current = true;
    setStatus('submitting');
    setError('');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('/api/auth/password/reset/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept-Language': language },
        credentials: 'omit', cache: 'no-store', referrerPolicy: 'no-referrer',
        body: JSON.stringify({ token, new_password: password }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) {
        const codes = { invalid_token: 'invalid', weak_password: 'weak', rate_limited: 'rate' };
        setError(codes[result?.code] || 'retry');
        setStatus('idle');
        return;
      }
      setPassword('');
      setConfirmation('');
      setStatus('success');
    } catch {
      setStatus('idle');
      setError('network');
    } finally {
      clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return (
    <main className="flex min-h-svh flex-col bg-[#090910] bg-[radial-gradient(ellipse_at_50%_10%,#24173680,transparent_60%)] px-6 pt-8 pb-5 text-[#f5f3fa] max-[480px]:px-4 max-[480px]:py-5 [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-[#c6a2ff] [&_a:focus-visible]:outline-offset-4! [&_button:focus-visible]:outline-2 [&_button:focus-visible]:outline-[#c6a2ff] [&_button:focus-visible]:outline-offset-4! [&_input:focus-visible]:outline-2 [&_input:focus-visible]:outline-[#c6a2ff] [&_input:focus-visible]:outline-offset-4!" lang={language}>
      <header className="mx-auto mb-12 flex w-full max-w-[1080px] items-center justify-between gap-5 max-[480px]:mb-[30px] max-[480px]:gap-2.5">
        <a href="/" className="inline-flex items-center gap-2.5 text-[23px] font-bold tracking-[-0.7px] text-inherit no-underline max-[480px]:gap-[7px] max-[480px]:text-[20px]" aria-label="Saqtau AI">
          <img className="size-[38px] object-contain max-[480px]:size-[30px]" src="/logo.svg" width="38" height="38" alt="" />
          <span>Saqtau <span className="text-[#c6a2ff]">AI</span></span>
        </a>
        <nav className="flex gap-[3px] rounded-[14px] border border-[#ffffff18] p-1" aria-label={t.language}>
          {Object.entries(languages).map(([code, name]) => (
            <button className="rounded-[10px] border-0 bg-transparent px-2.5 py-[7px] text-xs font-semibold text-[#a3a0b1] aria-pressed:bg-[#282236] aria-pressed:text-[#e5d2ff] max-[480px]:px-2 max-[480px]:py-1.5" key={code} type="button" lang={code} aria-label={name} aria-pressed={language === code}
              onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>
          ))}
        </nav>
      </header>

      <section className="m-auto w-full max-w-[480px] rounded-[28px] border border-[#ffffff18] bg-[#11111bf5] p-9 shadow-[0_24px_80px_#00000030] max-[480px]:rounded-[22px] max-[480px]:px-[22px] max-[480px]:py-[26px]" aria-labelledby="reset-title">
        <div className="mb-6 flex size-[58px] items-center justify-center rounded-[18px] border border-[#c6a2ff26] bg-[#c6a2ff14] text-[#c6a2ff]" aria-hidden="true">{success ? <Check size={28} /> : <LockKeyhole size={27} />}</div>
        <p className="m-0 mb-2 text-xs font-semibold tracking-[0.6px] text-[#c6a2ff]">{t.eyebrow}</p>
        <h1 id="reset-title" className="m-0 text-[clamp(26px,4vw,34px)] leading-[1.2] font-[650] tracking-[-1px]">{success ? t.successTitle : invalid ? t.invalidTitle : t.title}</h1>
        <p className="mt-3.5 mb-7 text-[15px] leading-[1.65] text-[#a3a0b1]" role={success ? 'status' : undefined}>
          {success ? t.successBody : invalid ? t.invalid : t.intro}
        </p>

        {success ? (
          <div>
            <a className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[13px] border-0 bg-[#c6a2ff] px-4 py-3.5 text-center text-[15px] font-bold text-[#160c29]! no-underline hover:bg-[#d2b7ff] disabled:cursor-wait! disabled:opacity-[0.65]" href="saqtau:///sign-in">{t.open}<ArrowUpRight size={19} /></a>
            <p className="m-0 mt-4 text-xs leading-[1.6] text-[#a3a0b1]">{t.appHint}</p>
          </div>
        ) : invalid ? (
          <a className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[13px] border-0 bg-[#c6a2ff] px-4 py-3.5 text-center text-[15px] font-bold text-[#160c29]! no-underline hover:bg-[#d2b7ff] disabled:cursor-wait! disabled:opacity-[0.65]" href="saqtau:///forgot-password">{t.open}<ArrowUpRight size={19} /></a>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="new-password">{t.password}</label>
              <input className="block min-h-[52px] w-full rounded-xl border border-[#ffffff28] bg-[#090910] px-3.5 py-3 text-base text-[#f5f3fa] aria-invalid:border-[#ff8e98] disabled:opacity-60" id="new-password" name="new-password" type={showPassword ? 'text' : 'password'}
                autoComplete="new-password" autoCapitalize="none" spellCheck={false} required maxLength={128}
                value={password} disabled={busy} onChange={(e) => { setPassword(e.target.value); setError(''); }}
                aria-invalid={['short', 'weak'].includes(error)} aria-describedby="password-hint reset-error" />
              <p id="password-hint" className="m-0 mt-2 text-xs leading-[1.6] text-[#a3a0b1]">{t.hint}</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium" htmlFor="confirm-password">{t.repeat}</label>
              <input className="block min-h-[52px] w-full rounded-xl border border-[#ffffff28] bg-[#090910] px-3.5 py-3 text-base text-[#f5f3fa] aria-invalid:border-[#ff8e98] disabled:opacity-60" id="confirm-password" name="confirm-password" type={showPassword ? 'text' : 'password'}
                autoComplete="new-password" autoCapitalize="none" spellCheck={false} required maxLength={128}
                value={confirmation} disabled={busy} onChange={(e) => { setConfirmation(e.target.value); setError(''); }}
                aria-invalid={error === 'mismatch'} aria-describedby="reset-error" />
            </div>
            <button className="inline-flex items-center gap-2 self-start border-0 bg-transparent px-0 py-[3px] text-[13px] text-[#b8b1c5]" type="button" onClick={() => setShowPassword(!showPassword)} aria-pressed={showPassword}>
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}{showPassword ? t.hide : t.show}
            </button>
            <div id="reset-error" role="alert">{error ? <p className="m-0 rounded-xl border border-[#ff8e982c] bg-[#ff8e980b] px-3.5 py-3 text-[13px] leading-[1.6] text-[#ffb0b8]">{t[error]}</p> : null}</div>
            <button className="flex min-h-[52px] w-full items-center justify-center gap-3 rounded-[13px] border-0 bg-[#c6a2ff] px-4 py-3.5 text-center text-[15px] font-bold text-[#160c29]! no-underline hover:bg-[#d2b7ff] disabled:cursor-wait! disabled:opacity-[0.65]" type="submit" disabled={busy} aria-busy={busy}>
              {busy ? t.saving : t.submit}{busy ? null : <ArrowUpRight size={19} />}
            </button>
          </form>
        )}
        {!success && !invalid ? <p className="m-0 mt-[22px] flex items-start gap-2 text-xs leading-[1.6] text-[#a3a0b1]"><ShieldCheck className="mt-0.5 shrink-0" size={17} aria-hidden="true" />{t.footer}</p> : null}
        <div className="mt-[26px] flex flex-wrap justify-between gap-3 border-t border-[#ffffff12] pt-5 text-[13px] [&_a]:text-[#b8b1c5]! [&_a]:no-underline [&_a:hover]:text-[#e5d2ff]! [&_a:hover]:underline!"><a href="/">{t.home}</a><a href={`/support?lang=${language}`}>{t.support}</a></div>
      </section>
      <footer className="pt-9 text-center text-xs text-[#777181]">Saqtau AI</footer>
    </main>
  );
}
