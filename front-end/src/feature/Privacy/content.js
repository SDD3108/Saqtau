export const privacyEmail = "saqtauai@gmail.com";
export const privacyLanguages = { ru: "Русский", en: "English", kk: "Қазақша" };
export const privacyCopy = {
  ru: {
    title: "Политика конфиденциальности",
    description: "Конфиденциальность мобильного приложения Saqtau AI и сайта saqtauai.com.",
    home: "На главную", support: "Поддержка", contents: "Содержание", language: "Язык страницы",
    updated: "Редакция от 4 ноября 2026 года", contactTitle: "Вопросы о конфиденциальности?",
    contactText: "Напишите нам по вопросам обработки, исправления или удаления ваших данных.",
    contactForm: "Форма поддержки",
    sections: [
      { id: "general", title: "1. Общие положения", paragraphs: [
        "Эта политика описывает обработку персональных данных при использовании мобильного приложения Saqtau AI, сайта saqtauai.com и обращении в службу поддержки.",
        "Сервис предоставляется организацией, работающей под брендом Saqtau AI. По вопросам конфиденциальности и обработки персональных данных можно обратиться по адресу saqtauai@gmail.com.",
        "Состав обрабатываемых данных зависит от используемых функций: регистрации, измерений, AI-чата, семейного доступа или форм сайта."
      ] },
      { id: "account", title: "2. Учетная запись и результаты измерений", paragraphs: [
        "При регистрации и заполнении профиля обрабатываются сведения, которые пользователь указывает в приложении, включая email, имя и дату рождения. Эти сведения используются для работы учетной записи и соответствующих функций приложения.",
        "При выполнении check-in обрабатываются дата и время измерения, рассчитанные показатели и характеристики качества сигнала. К ним относятся частота сердечных сокращений (BPM), показатели вариабельности сердечного ритма, оценка стресса (stress) и качество сигнала (signal).",
        "Результаты связываются с учетной записью для отображения истории измерений и предоставления пользователю доступа к своим данным."
      ] },
      { id: "camera", title: "3. Камера, видео и голосовые записи", paragraphs: [
        "Для проведения измерения приложение запрашивает разрешение на использование камеры. Изображение используется для анализа сигнала и расчета показателей.",
        "Видео лица и голосовые записи не сохраняются Saqtau AI. Обработка исходных материалов для выполнения запрошенной функции отличается от хранения рассчитанных результатов: результаты измерений могут сохраняться в истории учетной записи.",
        "Микрофон используется при запуске пользователем голосовой функции. Если выполняется распознавание речи, текстовая расшифровка является отдельным результатом обработки и не равнозначна исходной аудиозаписи.",
        "Доступ к камере и микрофону можно отключить в настройках устройства. После отключения разрешения соответствующая функция будет недоступна до повторного предоставления доступа. Отзыв разрешения сам по себе не удаляет ранее сохраненные результаты измерений."
      ] },
      { id: "ai", title: "4. AI-функции и Google Gemini", paragraphs: [
        "Saqtau AI использует Google Gemini для подготовки ответов AI-ассистента. При обращении к ассистенту содержание запроса обрабатывается с использованием этого стороннего сервиса.",
        "Дополнительная передача сведений профиля и результатов измерений в Gemini выполняется только после согласия пользователя и нажатия кнопки «Поделиться». Эти сведения используются как контекст для подготовки ответа.",
        "Если пользователь не дает согласия и не нажимает «Поделиться», сведения профиля и результаты измерений не передаются в Gemini через эту функцию.",
        "Отказ от дальнейшей передачи данных не отменяет уже выполненную обработку ранее отправленных запросов. По вопросам ранее переданных данных можно обратиться в поддержку Saqtau AI.",
        "Не включайте в сообщения пароли, коды подтверждения и персональные данные других людей без соответствующих полномочий."
      ] },
      { id: "family", title: "5. Семейный доступ", paragraphs: [
        "Семейные функции позволяют связывать учетные записи и просматривать сведения об измерениях участников семьи в рамках предоставленного доступа.",
        "Участнику семьи, которому предоставлен доступ, доступны время последнего check-in, частота сердечных сокращений (BPM), оценка стресса (stress) и качество сигнала (signal).",
        "Эти сведения могут раскрывать информацию о самочувствии пользователя. Учитывайте это при предоставлении семейного доступа и отправке приглашений.",
        "По вопросам прекращения доступа или удаления семейной связи можно обратиться в поддержку. Удаление приложения с устройства само по себе не прекращает существующие связи между учетными записями."
      ] },
      { id: "website", title: "6. Формы сайта и обращения в поддержку", paragraphs: [
        "Форма запроса демоверсии собирает имя, фамилию и email. Эти сведения используются для рассмотрения заявки и связи с заявителем. Заявка сохраняется в базе сайта и передается команде через Telegram.",
        "Форма поддержки собирает email и текст обращения. Они передаются команде через Telegram для рассмотрения вопроса и подготовки ответа. При отправке обращения через эту форму Telegram участвует в обработке указанных сведений.",
        "При обращении по электронной почте обрабатываются адрес отправителя, содержание письма и приложенные пользователем материалы.",
        "Не отправляйте через формы сайта пароли, коды входа или результаты измерений, если они не требуются для решения вашего вопроса.",
        "Для удаления заявки или обращения напишите на saqtauai@gmail.com и укажите email, использованный при отправке."
      ] },
      { id: "storage", title: "7. Настройки браузера и поставщики услуг", paragraphs: [
        "Сайт сохраняет выбранный язык в локальном хранилище браузера. Эта настройка используется для отображения интерфейса на выбранном языке. Удалить ее можно, очистив данные сайта в браузере.",
        "Для размещения сайта используется Netlify, для серверной части сайта — Railway, для доставки обращений команде — Telegram, а для AI-функций — Google Gemini.",
        "Эти сервисы участвуют в обработке данных в пределах выполняемых ими функций. Сведения о передаче данных в Gemini и Telegram приведены в соответствующих разделах этой политики.",
        "Данные учетной записи приложения и заявки на сайте относятся к разным функциям сервиса. Удаление аккаунта приложения не следует считать автоматическим удалением ранее отправленного обращения в поддержку или заявки на демоверсию."
      ] },
      { id: "deletion", title: "8. Удаление аккаунта и управление данными", paragraphs: [
        "При удалении учетной записи из Saqtau AI удаляются связанные с ней данные приложения. Для удаления воспользуйтесь функцией удаления аккаунта в приложении. Если воспользоваться ею не получается, обратитесь в поддержку по адресу saqtauai@gmail.com.",
        "Удаление приложения с телефона не удаляет учетную запись и данные, ранее переданные сервису.",
        "Вы можете обратиться в поддержку по вопросам доступа к своим данным, исправления сведений, удаления данных или отзыва согласия на обработку. Укажите email учетной записи и суть запроса. Не отправляйте пароль.",
        "Чтобы не предоставить доступ к чужим сведениям, при рассмотрении запроса может потребоваться подтверждение принадлежности учетной записи.",
        "Для прекращения дальнейшей передачи профиля и результатов измерений в Gemini не используйте кнопку «Поделиться». По вопросам отзыва ранее предоставленного согласия и удаления уже переданных сведений обратитесь в поддержку."
      ] },
      { id: "changes", title: "9. Изменения политики", paragraphs: [
        "Политика может обновляться при изменении функций приложения, сайта или порядка обработки данных. Актуальная редакция размещается на этой странице с указанием даты обновления.",
        "По вопросам содержания политики и обработки персональных данных свяжитесь с командой Saqtau AI по адресу saqtauai@gmail.com или через страницу поддержки."
      ] }
    ]
  },
  en: {
    title: "Privacy Policy",
    description: "Privacy information for the Saqtau AI mobile app and saqtauai.com website.",
    home: "Home", support: "Support", contents: "Contents", language: "Page language",
    updated: "Revision dated November 4, 2026", contactTitle: "Questions about privacy?",
    contactText: "Contact us about the processing, correction or deletion of your data.",
    contactForm: "Support form",
    sections: [
      { id: "general", title: "1. General information", paragraphs: [
        "This policy describes the processing of personal data when you use the Saqtau AI mobile app, visit saqtauai.com or contact support.",
        "The service is provided by the organization operating under the Saqtau AI brand. For questions about privacy and personal data processing, contact saqtauai@gmail.com.",
        "The data processed depends on the features you use: registration, measurements, AI chat, family access or website forms."
      ] },
      { id: "account", title: "2. Account and measurement results", paragraphs: [
        "When you register and complete your profile, the information you enter in the app is processed, including your email address, name and date of birth. This information is used to operate your account and the relevant app features.",
        "During a check-in, the date and time of the measurement, calculated indicators and signal quality information are processed. These include heart rate (BPM), heart rate variability indicators, a stress estimate (stress) and signal quality (signal).",
        "Results are linked to your account to display your measurement history and provide access to your data."
      ] },
      { id: "camera", title: "3. Camera, video and voice recordings", paragraphs: [
        "The app requests camera permission to perform a measurement. Camera images are used to analyze the signal and calculate indicators.",
        "Saqtau AI does not store facial videos or voice recordings. Processing source materials to perform a requested function is different from storing calculated results: measurement results may be saved in your account history.",
        "The microphone is used when you start a voice feature. If speech recognition is performed, the text transcript is a separate processing result and is distinct from the original audio recording.",
        "You can disable camera and microphone access in your device settings. The corresponding feature will be unavailable until permission is granted again. Revoking permission does not itself delete previously saved measurement results."
      ] },
      { id: "ai", title: "4. AI features and Google Gemini", paragraphs: [
        "Saqtau AI uses Google Gemini to generate AI assistant responses. When you contact the assistant, the content of your request is processed using this third-party service.",
        "Additional sharing of profile information and measurement results with Gemini takes place only after you consent and press the Share button. This information is used as context to prepare a response.",
        "If you do not consent and press Share, your profile information and measurement results are not sent to Gemini through this feature.",
        "Declining further data sharing does not reverse processing already performed on previously submitted requests. Contact Saqtau AI support with questions about data already shared.",
        "Do not include passwords, verification codes or other people's personal data in messages without the appropriate authorization."
      ] },
      { id: "family", title: "5. Family access", paragraphs: [
        "Family features allow accounts to be linked and family members' measurement information to be viewed within the access granted.",
        "A family member with access can view the time of the most recent check-in, heart rate (BPM), stress estimate (stress) and signal quality (signal).",
        "This information may reveal details about a user's wellbeing. Consider this when granting family access and sending invitations.",
        "Contact support with questions about ending access or removing a family connection. Uninstalling the app does not itself end existing connections between accounts."
      ] },
      { id: "website", title: "6. Website forms and support requests", paragraphs: [
        "The demo request form collects your first name, last name and email address. This information is used to review your request and contact you. The request is saved in the website database and sent to the team through Telegram.",
        "The support form collects your email address and message. They are sent to the team through Telegram to review your question and prepare a response. When you submit this form, Telegram participates in processing that information.",
        "When you contact us by email, the sender's address, email content and any materials you attach are processed.",
        "Do not submit passwords, sign-in codes or measurement results through website forms unless they are needed to resolve your issue.",
        "To request deletion of a submission or support message, email saqtauai@gmail.com and specify the email address used to submit it."
      ] },
      { id: "storage", title: "7. Browser preferences and service providers", paragraphs: [
        "The website saves your selected language in your browser's local storage. This preference is used to display the interface in your chosen language. You can remove it by clearing the website's data in your browser.",
        "Netlify hosts the website, Railway hosts the website backend, Telegram delivers requests to the team, and Google Gemini provides AI functionality.",
        "These services participate in data processing within their respective functions. Sharing with Gemini and Telegram is described in the relevant sections of this policy.",
        "App account data and website submissions relate to different service features. Deleting an app account should not be understood as automatically deleting a previously submitted support message or demo request."
      ] },
      { id: "deletion", title: "8. Account deletion and managing your data", paragraphs: [
        "When you delete your Saqtau AI account, the associated app data is deleted. Use the account deletion feature in the app. If you cannot use it, contact support at saqtauai@gmail.com.",
        "Uninstalling the app from your phone does not delete your account or data previously sent to the service.",
        "You can contact support about accessing your data, correcting information, deleting data or withdrawing consent to processing. Provide your account email address and describe your request. Do not send your password.",
        "To avoid disclosing another person's information, we may need to verify account ownership when handling a request.",
        "To stop further sharing of your profile and measurement results with Gemini, do not use the Share button. Contact support about withdrawing previously given consent and deleting information already shared."
      ] },
      { id: "changes", title: "9. Policy updates", paragraphs: [
        "This policy may be updated when app features, website features or data processing practices change. The current version is published on this page with its revision date.",
        "For questions about this policy and personal data processing, contact the Saqtau AI team at saqtauai@gmail.com or through the support page."
      ] }
    ]
  },
  kk: {
    title: "Құпиялылық саясаты",
    description: "Saqtau AI мобильді қолданбасы мен saqtauai.com сайтының құпиялылығы туралы ақпарат.",
    home: "Басты бет", support: "Қолдау", contents: "Мазмұны", language: "Бет тілі",
    updated: "2026 жылғы 4 қарашадағы редакция", contactTitle: "Құпиялылық туралы сұрағыңыз бар ма?",
    contactText: "Деректеріңізді өңдеу, түзету немесе жою мәселелері бойынша бізге жазыңыз.",
    contactForm: "Қолдау нысаны",
    sections: [
      { id: "general", title: "1. Жалпы ережелер", paragraphs: [
        "Бұл саясат Saqtau AI мобильді қолданбасын, saqtauai.com сайтын пайдалану және қолдау қызметіне жүгіну кезінде дербес деректердің өңделуін сипаттайды.",
        "Қызметті Saqtau AI брендімен жұмыс істейтін ұйым ұсынады. Құпиялылық және дербес деректерді өңдеу мәселелері бойынша saqtauai@gmail.com мекенжайына хабарласуға болады.",
        "Өңделетін деректер пайдаланылатын функцияларға байланысты: тіркелу, өлшеулер, AI-чат, отбасылық қолжетімділік немесе сайттағы нысандар."
      ] },
      { id: "account", title: "2. Аккаунт және өлшеу нәтижелері", paragraphs: [
        "Тіркелу және профильді толтыру кезінде пайдаланушы қолданбада көрсеткен мәліметтер, соның ішінде электрондық пошта мекенжайы, аты және туған күні өңделеді. Бұл мәліметтер аккаунттың және қолданбаның тиісті функцияларының жұмысы үшін пайдаланылады.",
        "Check-in кезінде өлшеу күні мен уақыты, есептелген көрсеткіштер және сигнал сапасының сипаттамалары өңделеді. Оларға жүрек соғу жиілігі (BPM), жүрек ырғағының өзгергіштік көрсеткіштері, стресс деңгейінің бағасы (stress) және сигнал сапасы (signal) жатады.",
        "Өлшеулер тарихын көрсету және пайдаланушыға өз деректеріне қол жеткізу мүмкіндігін беру үшін нәтижелер аккаунтпен байланыстырылады."
      ] },
      { id: "camera", title: "3. Камера, бейне және дауыс жазбалары", paragraphs: [
        "Өлшеу жүргізу үшін қолданба камераны пайдалануға рұқсат сұрайды. Кескін сигналды талдау және көрсеткіштерді есептеу үшін пайдаланылады.",
        "Saqtau AI бет бейнесі түсірілген бейнежазбалар мен дауыс жазбаларын сақтамайды. Сұралған функцияны орындау үшін бастапқы материалдарды өңдеу есептелген нәтижелерді сақтаудан бөлек: өлшеу нәтижелері аккаунт тарихында сақталуы мүмкін.",
        "Микрофон пайдаланушы дауыс функциясын іске қосқан кезде қолданылады. Сөйлеуді тану орындалса, алынған мәтін өңдеудің жеке нәтижесі болып табылады және бастапқы аудиожазбадан бөлек қарастырылады.",
        "Камера мен микрофонға қолжетімділікті құрылғы баптауларында өшіруге болады. Рұқсат өшірілгеннен кейін тиісті функция қайта рұқсат берілгенге дейін қолжетімсіз болады. Рұқсатты қайтарып алу бұрын сақталған өлшеу нәтижелерін өздігінен жоймайды."
      ] },
      { id: "ai", title: "4. AI функциялары және Google Gemini", paragraphs: [
        "Saqtau AI жасанды интеллект көмекшісінің жауаптарын дайындау үшін Google Gemini қызметін пайдаланады. Көмекшіге жүгінген кезде сұраудың мазмұны осы үшінші тарап қызметі арқылы өңделеді.",
        "Профиль мәліметтері мен өлшеу нәтижелері Gemini қызметіне пайдаланушы келісім беріп, «Бөлісу» батырмасын басқаннан кейін ғана қосымша жіберіледі. Бұл мәліметтер жауапты дайындау кезінде контекст ретінде пайдаланылады.",
        "Пайдаланушы келісім бермесе және «Бөлісу» батырмасын баспаса, профиль мәліметтері мен өлшеу нәтижелері осы функция арқылы Gemini қызметіне жіберілмейді.",
        "Деректерді әрі қарай жіберуден бас тарту бұрын жіберілген сұрауларға қатысты орындалған өңдеуді кері қайтармайды. Бұрын жіберілген деректер туралы сұрақтар бойынша Saqtau AI қолдау қызметіне хабарласуға болады.",
        "Хабарламаларға құпиясөздерді, растау кодтарын немесе тиісті өкілеттіксіз басқа адамдардың дербес деректерін қоспаңыз."
      ] },
      { id: "family", title: "5. Отбасылық қолжетімділік", paragraphs: [
        "Отбасылық функциялар аккаунттарды байланыстыруға және берілген қолжетімділік шегінде отбасы мүшелерінің өлшеу мәліметтерін көруге мүмкіндік береді.",
        "Қолжетімділік берілген отбасы мүшесі соңғы check-in уақытын, жүрек соғу жиілігін (BPM), стресс деңгейінің бағасын (stress) және сигнал сапасын (signal) көре алады.",
        "Бұл мәліметтер пайдаланушының хал-жағдайы туралы ақпарат беруі мүмкін. Отбасылық қолжетімділік бергенде және шақыру жібергенде осыны ескеріңіз.",
        "Қолжетімділікті тоқтату немесе отбасылық байланысты жою мәселелері бойынша қолдау қызметіне хабарласуға болады. Қолданбаны құрылғыдан жою аккаунттар арасындағы қолданыстағы байланыстарды өздігінен тоқтатпайды."
      ] },
      { id: "website", title: "6. Сайт нысандары және қолдау өтініштері", paragraphs: [
        "Демонұсқаны сұрату нысаны атыңызды, тегіңізді және электрондық пошта мекенжайыңызды жинайды. Бұл мәліметтер өтінімді қарастыру және өтінім берушімен байланысу үшін пайдаланылады. Өтінім сайттың дерекқорында сақталып, командаға Telegram арқылы жіберіледі.",
        "Қолдау нысаны электрондық пошта мекенжайы мен өтініш мәтінін жинайды. Олар сұрақты қарастыру және жауап дайындау үшін командаға Telegram арқылы жіберіледі. Осы нысан арқылы өтініш жібергенде Telegram көрсетілген мәліметтерді өңдеуге қатысады.",
        "Электрондық пошта арқылы хабарласқанда жіберушінің мекенжайы, хат мазмұны және пайдаланушы тіркеген материалдар өңделеді.",
        "Мәселені шешуге қажет болмаса, сайт нысандары арқылы құпиясөздерді, кіру кодтарын немесе өлшеу нәтижелерін жібермеңіз.",
        "Өтінімді немесе өтінішті жою үшін saqtauai@gmail.com мекенжайына жазып, жіберу кезінде пайдаланылған электрондық пошта мекенжайын көрсетіңіз."
      ] },
      { id: "storage", title: "7. Браузер баптаулары және қызмет жеткізушілері", paragraphs: [
        "Сайт таңдалған тілді браузердің жергілікті қоймасында сақтайды. Бұл баптау интерфейсті таңдалған тілде көрсету үшін пайдаланылады. Оны браузердегі сайт деректерін тазарту арқылы жоюға болады.",
        "Сайт Netlify қызметінде, сайттың серверлік бөлігі Railway қызметінде орналастырылған. Өтініштерді командаға жеткізу үшін Telegram, ал AI функциялары үшін Google Gemini пайдаланылады.",
        "Бұл қызметтер өздері орындайтын функциялар шегінде деректерді өңдеуге қатысады. Gemini және Telegram қызметтеріне деректерді жіберу туралы ақпарат осы саясаттың тиісті бөлімдерінде берілген.",
        "Қолданба аккаунтының деректері мен сайттағы өтінімдер сервистің әртүрлі функцияларына қатысты. Қолданба аккаунтын жою бұрын жіберілген қолдау өтінішін немесе демонұсқа сұрауын автоматты түрде жою болып саналмайды."
      ] },
      { id: "deletion", title: "8. Аккаунтты жою және деректерді басқару", paragraphs: [
        "Saqtau AI аккаунтын жойған кезде онымен байланысты қолданба деректері жойылады. Жою үшін қолданбадағы аккаунтты жою функциясын пайдаланыңыз. Оны пайдалану мүмкін болмаса, saqtauai@gmail.com мекенжайы арқылы қолдау қызметіне хабарласыңыз.",
        "Қолданбаны телефоннан жою аккаунтты және сервиске бұрын жіберілген деректерді жоймайды.",
        "Өз деректеріңізге қол жеткізу, мәліметтерді түзету, деректерді жою немесе өңдеуге берілген келісімді қайтарып алу мәселелері бойынша қолдау қызметіне хабарласуға болады. Аккаунттың электрондық пошта мекенжайын және сұрау мәнін көрсетіңіз. Құпиясөзді жібермеңіз.",
        "Басқа адамның мәліметтеріне қол жеткізуді болдырмау үшін сұрауды қарастыру кезінде аккаунттың сізге тиесілі екенін растау қажет болуы мүмкін.",
        "Профиль мен өлшеу нәтижелерін Gemini қызметіне әрі қарай жіберуді тоқтату үшін «Бөлісу» батырмасын пайдаланбаңыз. Бұрын берілген келісімді қайтарып алу және жіберілген мәліметтерді жою мәселелері бойынша қолдау қызметіне хабарласыңыз."
      ] },
      { id: "changes", title: "9. Саясаттағы өзгерістер", paragraphs: [
        "Қолданба немесе сайт функциялары, сондай-ақ деректерді өңдеу тәртібі өзгерген кезде саясат жаңартылуы мүмкін. Қолданыстағы редакция жаңартылған күнімен бірге осы бетте жарияланады.",
        "Саясаттың мазмұны және дербес деректерді өңдеу мәселелері бойынша Saqtau AI командасына saqtauai@gmail.com мекенжайы немесе қолдау беті арқылы хабарласыңыз."
      ] }
    ]
  }
};
