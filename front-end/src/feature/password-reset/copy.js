export const languages = { ru: 'Русский', kk: 'Қазақша', en: 'English' };

export function resolveLanguage(requested, acceptLanguage = '') {
  if (typeof requested === 'string' && Object.hasOwn(languages, requested)) return requested;
  return acceptLanguage.toLowerCase().split(',').map((v) => v.trim().split(/[-;]/)[0])
    .find((v) => Object.hasOwn(languages, v)) || 'ru';
}

export const copy = {
  ru: {
    eyebrow: 'Доступ к аккаунту', title: 'Новый пароль',
    intro: 'Задайте новый пароль для вашего аккаунта Saqtau AI.',
    password: 'Новый пароль', repeat: 'Повторите пароль', hint: 'Минимум 8 символов. Используйте уникальный пароль.',
    show: 'Показать пароли', hide: 'Скрыть пароли', submit: 'Сохранить пароль', saving: 'Сохраняем…',
    mismatch: 'Пароли не совпадают.', short: 'Пароль должен содержать от 8 до 128 символов.',
    invalid: 'Ссылка недействительна или срок её действия истёк. Запросите новое письмо через «Забыли пароль?» в приложении.',
    weak: 'Этот пароль не подходит. Выберите более длинный пароль: не только цифры, не распространённый пароль и не ваши личные данные.',
    retry: 'Не удалось изменить пароль. Попробуйте ещё раз позже.', network: 'Нет ответа от сервера. Проверьте подключение и попробуйте ещё раз.',
    rate: 'Слишком много попыток. Подождите немного и попробуйте снова.',
    successTitle: 'Пароль изменён', successBody: 'Вернитесь в приложение Saqtau AI и войдите с новым паролем.',
    open: 'Открыть приложение', home: 'На главную', support: 'Нужна помощь?', language: 'Язык страницы',
    footer: 'Без регистрации на сайте. Пароль изменится только после подтверждения.',
    invalidTitle: 'Не удалось открыть ссылку', appHint: 'Если приложение не открылось, запустите его вручную на телефоне.',
  },
  en: {
    eyebrow: 'Account access', title: 'A new password',
    intro: 'Set a new password for your Saqtau AI account.',
    password: 'New password', repeat: 'Confirm password', hint: 'At least 8 characters. Use a unique password.',
    show: 'Show passwords', hide: 'Hide passwords', submit: 'Save password', saving: 'Saving…',
    mismatch: 'The passwords do not match.', short: 'Your password must contain 8 to 128 characters.',
    invalid: 'This link is invalid or has expired. Request a new email using “Forgot password?” in the app.',
    weak: 'This password cannot be used. Choose a longer password that is not entirely numeric, commonly used or based on your personal information.',
    retry: 'We could not change your password. Please try again later.', network: 'The server did not respond. Check your connection and try again.',
    rate: 'Too many attempts. Please wait a little and try again.',
    successTitle: 'Password updated', successBody: 'Return to the Saqtau AI app and sign in with your new password.',
    open: 'Open the app', home: 'Back to home', support: 'Need help?', language: 'Page language',
    footer: 'No website registration needed. Your password changes only when you confirm.',
    invalidTitle: 'Unable to open this link', appHint: 'If the app does not open, launch it manually on your phone.',
  },
  kk: {
    eyebrow: 'Аккаунтқа кіру', title: 'Жаңа құпиясөз',
    intro: 'Saqtau AI аккаунтыңыз үшін жаңа құпиясөз орнатыңыз.',
    password: 'Жаңа құпиясөз', repeat: 'Құпиясөзді қайталаңыз', hint: 'Кемінде 8 таңба. Бірегей құпиясөз қолданыңыз.',
    show: 'Құпиясөздерді көрсету', hide: 'Құпиясөздерді жасыру', submit: 'Құпиясөзді сақтау', saving: 'Сақталуда…',
    mismatch: 'Құпиясөздер сәйкес келмейді.', short: 'Құпиясөз 8–128 таңбадан тұруы керек.',
    invalid: 'Сілтеме жарамсыз немесе мерзімі өткен. Қолданбадағы «Құпиясөзді ұмыттыңыз ба?» арқылы жаңа хат сұратыңыз.',
    weak: 'Бұл құпиясөз жарамайды. Тек сандардан, жиі қолданылатын сөздерден немесе жеке деректеріңізден тұрмайтын ұзынырақ құпиясөз таңдаңыз.',
    retry: 'Құпиясөзді өзгерту мүмкін болмады. Кейінірек қайталап көріңіз.', network: 'Сервер жауап бермеді. Интернет байланысын тексеріп, қайталап көріңіз.',
    rate: 'Әрекет саны тым көп. Біраз күтіп, қайталап көріңіз.',
    successTitle: 'Құпиясөз өзгертілді', successBody: 'Saqtau AI қолданбасына оралып, жаңа құпиясөзбен кіріңіз.',
    open: 'Қолданбаны ашу', home: 'Басты бетке', support: 'Көмек керек пе?', language: 'Бет тілі',
    footer: 'Сайтта тіркелудің қажеті жоқ. Құпиясөз тек растағаннан кейін өзгереді.',
    invalidTitle: 'Сілтемені ашу мүмкін болмады', appHint: 'Қолданба ашылмаса, оны телефоннан қолмен іске қосыңыз.',
  },
};
