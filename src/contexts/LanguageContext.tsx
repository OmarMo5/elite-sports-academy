import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

// Translations
const translations: Record<string, Record<Language, string>> = {
  // Nav
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.about": { en: "About", ar: "من نحن" },
  "nav.programs": { en: "Programs", ar: "البرامج" },
  "nav.branches": { en: "Branches", ar: "الفروع" },
  "nav.membership": { en: "Membership", ar: "العضوية" },
  "nav.events": { en: "Events", ar: "الفعاليات" },
  "nav.gallery": { en: "Gallery", ar: "المعرض" },
  "nav.contact": { en: "Contact", ar: "تواصل معنا" },
  "nav.joinNow": { en: "Join Now", ar: "انضم الآن" },

  // Hero
  "hero.badge": { en: "🏆 10+ Years of Excellence", ar: "🏆 أكثر من 10 سنوات من التميز" },
  "hero.title1": { en: "Forging", ar: "نصنع" },
  "hero.titleHighlight": { en: "Champions", ar: "الأبطال" },
  "hero.title2": { en: "Across Egypt", ar: "في جميع أنحاء مصر" },
  "hero.subtitle": { en: "World-class coaching in swimming, tennis & 6+ sports. Join 2,500+ students training across 8 branches.", ar: "تدريب عالمي المستوى في السباحة والتنس وأكثر من 6 رياضات. انضم لأكثر من 2,500 طالب يتدربون في 8 فروع." },
  "hero.exploreProgramsBtn": { en: "Explore Programs", ar: "استكشف البرامج" },

  // Stats
  "stats.years": { en: "Years of Excellence", ar: "سنوات من التميز" },
  "stats.branches": { en: "Branches Across Egypt", ar: "فروع في جميع أنحاء مصر" },
  "stats.students": { en: "Active Students", ar: "طالب نشط" },
  "stats.awards": { en: "Awards Won", ar: "جائزة" },

  // Timeline
  "timeline.title": { en: "Our Journey", ar: "رحلتنا" },
  "timeline.subtitle": { en: "A decade of building champions", ar: "عقد من صناعة الأبطال" },

  // Sports
  "sports.title": { en: "Our Sports Programs", ar: "برامجنا الرياضية" },
  "sports.subtitle": { en: "World-class training across multiple disciplines", ar: "تدريب عالمي المستوى عبر تخصصات متعددة" },
  "sports.viewAll": { en: "View All Programs", ar: "عرض جميع البرامج" },

  // Events Section
  "events.title": { en: "Upcoming Events", ar: "الفعاليات القادمة" },
  "events.subtitle": { en: "Competitions and celebrations ahead", ar: "مسابقات واحتفالات قادمة" },
  "events.upcoming": { en: "Upcoming", ar: "القادمة" },
  "events.past": { en: "Past Events", ar: "الفعاليات السابقة" },
  "events.participants": { en: "participants", ar: "مشارك" },
  "events.heroTitle": { en: "Events &", ar: "الفعاليات و" },
  "events.heroHighlight": { en: "Competitions", ar: "المسابقات" },
  "events.heroSubtitle": { en: "From local inter-branch tournaments to national championships — see where our athletes compete and shine.", ar: "من البطولات المحلية بين الفروع إلى البطولات الوطنية — شاهد أين يتنافس رياضيونا ويتألقون." },
  "events.goldMedals": { en: "Gold Medals", ar: "ميداليات ذهبية" },
  "events.silverMedals": { en: "Silver Medals", ar: "ميداليات فضية" },
  "events.bronzeMedals": { en: "Bronze Medals", ar: "ميداليات برونزية" },

  // Testimonials
  "testimonials.title": { en: "What Families Say", ar: "ماذا تقول العائلات" },
  "testimonials.subtitle": { en: "Trusted by thousands of parents across Egypt", ar: "موثوق به من قبل آلاف الأهالي في مصر" },

  // CTA
  "cta.title": { en: "Ready to Start Your Champion Journey?", ar: "مستعد لبدء رحلة البطل؟" },
  "cta.subtitle": { en: "Join 2,500+ students across 8 branches. Find the perfect program for your child today.", ar: "انضم لأكثر من 2,500 طالب في 8 فروع. اعثر على البرنامج المثالي لطفلك اليوم." },
  "cta.enrollNow": { en: "Enroll Now", ar: "سجل الآن" },

  // About
  "about.heroBadge": { en: "🏆 Our Story", ar: "🏆 قصتنا" },
  "about.heroTitle1": { en: "10+ Years of", ar: "أكثر من 10 سنوات من" },
  "about.heroHighlight": { en: "Excellence", ar: "التميز" },
  "about.heroTitle2": { en: "in Sports Training", ar: "في التدريب الرياضي" },
  "about.heroSubtitle": { en: "From a single swimming pool in Cairo to 8 branches across Egypt — discover the journey that built Egypt's premier sports academy.", ar: "من حمام سباحة واحد في القاهرة إلى 8 فروع في جميع أنحاء مصر — اكتشف الرحلة التي بنت أفضل أكاديمية رياضية في مصر." },
  "about.storyTitle1": { en: "Where It All", ar: "حيث بدأ" },
  "about.storyHighlight": { en: "Began", ar: "كل شيء" },
  "about.storyP1": { en: "Champions Sports Academy was founded in 2014 by a group of passionate athletes and educators who shared a vision: to create a world-class sports training environment right here in Egypt.", ar: "تأسست أكاديمية الأبطال الرياضية في عام 2014 من قبل مجموعة من الرياضيين والمعلمين الشغوفين الذين شاركوا رؤية واحدة: إنشاء بيئة تدريب رياضي عالمية المستوى هنا في مصر." },
  "about.storyP2": { en: "What started as a small swimming and tennis program in Maadi, Cairo, has grown into Egypt's most comprehensive multi-sport academy, with 8 branches serving over 2,500 students.", ar: "ما بدأ كبرنامج صغير للسباحة والتنس في المعادي بالقاهرة، نما ليصبح أشمل أكاديمية متعددة الرياضات في مصر، مع 8 فروع تخدم أكثر من 2,500 طالب." },
  "about.storyP3": { en: "Our mission is simple — to develop well-rounded athletes who excel not just in their sport, but in character, discipline, and leadership. Every child who walks through our doors is a future champion.", ar: "مهمتنا بسيطة — تطوير رياضيين متكاملين يتفوقون ليس فقط في رياضتهم، ولكن في الشخصية والانضباط والقيادة. كل طفل يدخل أبوابنا هو بطل المستقبل." },
  "about.ourPrograms": { en: "Our Programs", ar: "برامجنا" },
  "about.students": { en: "Students", ar: "طلاب" },
  "about.medalsWon": { en: "Medals Won", ar: "ميداليات" },
  "about.programs": { en: "Programs", ar: "برامج" },
  "about.branchesLabel": { en: "Branches", ar: "فروع" },
  "about.timelineTitle": { en: "Our Journey", ar: "رحلتنا" },
  "about.timelineSubtitle": { en: "A decade of milestones and achievements", ar: "عقد من الإنجازات والمعالم" },
  "about.coachesTitle": { en: "Meet Our Coaches", ar: "تعرف على مدربينا" },
  "about.coachesSubtitle": { en: "World-class expertise, dedicated mentorship", ar: "خبرة عالمية المستوى، إرشاد مخصص" },
  "about.clickToFlip": { en: "Click to flip →", ar: "← انقر للقلب" },
  "about.awardsTitle": { en: "Awards & Recognition", ar: "الجوائز والتقدير" },
  "about.awardsSubtitle": { en: "Recognized for excellence across the region", ar: "معترف بالتميز في جميع أنحاء المنطقة" },
  "about.pressTitle": { en: "Press & Testimonials", ar: "الصحافة والشهادات" },
  "about.pressSubtitle": { en: "What people are saying about Champions Academy", ar: "ما يقوله الناس عن أكاديمية الأبطال" },

  // Programs
  "programs.heroTitle": { en: "Our", ar: "برامجنا" },
  "programs.heroHighlight": { en: "Programs", ar: "الرياضية" },
  "programs.heroSubtitle": { en: "World-class training across 6 sports disciplines, designed for athletes of every age and skill level.", ar: "تدريب عالمي المستوى عبر 6 تخصصات رياضية، مصمم للرياضيين من جميع الأعمار ومستويات المهارة." },
  "programs.all": { en: "All", ar: "الكل" },
  "programs.beginner": { en: "Beginner", ar: "مبتدئ" },
  "programs.intermediate": { en: "Intermediate", ar: "متوسط" },
  "programs.advanced": { en: "Advanced", ar: "متقدم" },
  "programs.competitive": { en: "Competitive", ar: "تنافسي" },
  "programs.studentsLabel": { en: "Students", ar: "طلاب" },
  "programs.intensity": { en: "Intensity", ar: "الكثافة" },
  "programs.enrollment": { en: "Enrollment", ar: "التسجيل" },

  // Branches
  "branches.heroTitle": { en: "Our", ar: "فروعنا" },
  "branches.heroHighlight": { en: "Branches", ar: "" },
  "branches.heroSubtitle": { en: "8 state-of-the-art facilities across Egypt. Find the branch nearest to you.", ar: "8 مرافق حديثة في جميع أنحاء مصر. اعثر على الفرع الأقرب إليك." },
  "branches.clickMarker": { en: "Click a marker to explore", ar: "انقر على علامة للاستكشاف" },
  "branches.clickMapHint": { en: "← Click a marker on the map to see branch details", ar: "انقر على علامة على الخريطة لرؤية تفاصيل الفرع →" },
  "branches.allBranches": { en: "All Branches", ar: "جميع الفروع" },
  "branches.allBranchesSubtitle": { en: "Explore our facilities across Egypt", ar: "استكشف مرافقنا في جميع أنحاء مصر" },
  "branches.availableSports": { en: "Available Sports", ar: "الرياضات المتاحة" },
  "branches.egypt": { en: "Egypt", ar: "مصر" },

  // Membership
  "membership.heroTitle1": { en: "Join the", ar: "انضم إلى عائلة" },
  "membership.heroHighlight": { en: "Champions", ar: "الأبطال" },
  "membership.heroTitle2": { en: "Family", ar: "" },
  "membership.heroSubtitle": { en: "Choose the plan that fits your champion's journey. Flexible memberships for every level.", ar: "اختر الخطة التي تناسب رحلة بطلك. عضويات مرنة لكل مستوى." },
  "membership.mostPopular": { en: "⭐ Most Popular", ar: "⭐ الأكثر شعبية" },
  "membership.quickEnrollment": { en: "Quick Enrollment", ar: "التسجيل السريع" },
  "membership.quickEnrollmentSub": { en: "Fill in the form and we'll get back to you", ar: "املأ النموذج وسنتواصل معك" },
  "membership.parentName": { en: "Parent Name", ar: "اسم ولي الأمر" },
  "membership.childName": { en: "Child's Name", ar: "اسم الطفل" },
  "membership.email": { en: "Email", ar: "البريد الإلكتروني" },
  "membership.phone": { en: "Phone", ar: "الهاتف" },
  "membership.submitApp": { en: "Submit Application", ar: "تقديم الطلب" },
  "membership.memberStories": { en: "Member Stories", ar: "قصص الأعضاء" },
  "membership.faqTitle": { en: "Frequently Asked Questions", ar: "الأسئلة الشائعة" },
  "membership.fillFields": { en: "Please fill all required fields", ar: "يرجى ملء جميع الحقول المطلوبة" },
  "membership.appSubmitted": { en: "Application Submitted! 🎉", ar: "تم تقديم الطلب! 🎉" },
  "membership.appSubmittedDesc": { en: "We'll contact you within 24 hours.", ar: "سنتواصل معك خلال 24 ساعة." },

  // Gallery
  "gallery.heroTitle": { en: "Photo", ar: "معرض" },
  "gallery.heroHighlight": { en: "Gallery", ar: "الصور" },
  "gallery.heroSubtitle": { en: "Capturing excellence — moments from training, competitions, and celebrations.", ar: "نلتقط التميز — لحظات من التدريب والمسابقات والاحتفالات." },
  "gallery.all": { en: "All", ar: "الكل" },
  "gallery.training": { en: "Training", ar: "التدريب" },
  "gallery.competition": { en: "Competition", ar: "المسابقات" },
  "gallery.awards": { en: "Awards", ar: "الجوائز" },

  // Contact
  "contact.heroTitle": { en: "Get in", ar: "تواصل" },
  "contact.heroHighlight": { en: "Touch", ar: "معنا" },
  "contact.heroSubtitle": { en: "Have a question? We'd love to hear from you. Reach out and we'll respond within 24 hours.", ar: "لديك سؤال؟ يسعدنا سماع رأيك. تواصل معنا وسنرد خلال 24 ساعة." },
  "contact.sendMessage": { en: "Send a Message", ar: "أرسل رسالة" },
  "contact.name": { en: "Name", ar: "الاسم" },
  "contact.message": { en: "Message", ar: "الرسالة" },
  "contact.sendBtn": { en: "Send Message", ar: "إرسال الرسالة" },
  "contact.contactInfo": { en: "Contact Information", ar: "معلومات الاتصال" },
  "contact.mainOffice": { en: "Main Office", ar: "المكتب الرئيسي" },
  "contact.followUs": { en: "Follow Us", ar: "تابعنا" },
  "contact.interactiveMap": { en: "Interactive Map", ar: "خريطة تفاعلية" },
  "contact.mapReady": { en: "Google Maps integration ready", ar: "جاهز لتكامل خرائط جوجل" },
  "contact.quickHelp": { en: "Quick Help", ar: "مساعدة سريعة" },
  "contact.fillRequired": { en: "Please fill required fields", ar: "يرجى ملء الحقول المطلوبة" },
  "contact.messageSent": { en: "Message Sent! ✉️", ar: "تم إرسال الرسالة! ✉️" },
  "contact.messageSentDesc": { en: "Thank you for reaching out. We'll get back to you soon.", ar: "شكراً لتواصلك. سنرد عليك قريباً." },

  // Dashboard
  "dashboard.memberLogin": { en: "Member Login", ar: "تسجيل دخول الأعضاء" },
  "dashboard.accessDashboard": { en: "Access your child's dashboard", ar: "الوصول إلى لوحة تحكم طفلك" },
  "dashboard.signIn": { en: "Sign In", ar: "تسجيل الدخول" },
  "dashboard.demoHint": { en: "Demo: Use any email & password", ar: "تجريبي: استخدم أي بريد وكلمة مرور" },
  "dashboard.overview": { en: "Overview", ar: "نظرة عامة" },
  "dashboard.performance": { en: "Performance", ar: "الأداء" },
  "dashboard.schedule": { en: "Schedule", ar: "الجدول" },
  "dashboard.notifications": { en: "Notifications", ar: "الإشعارات" },
  "dashboard.signOut": { en: "Sign Out", ar: "تسجيل الخروج" },
  "dashboard.attendance": { en: "Attendance", ar: "الحضور" },
  "dashboard.sessionsAttended": { en: "Sessions Attended", ar: "الحصص المحضورة" },
  "dashboard.sportsActive": { en: "Sports Active", ar: "الرياضات النشطة" },
  "dashboard.sportPerformance": { en: "Sport Performance", ar: "الأداء الرياضي" },
  "dashboard.progressOverTime": { en: "Progress Over Time", ar: "التقدم عبر الزمن" },
  "dashboard.strengths": { en: "Strengths", ar: "نقاط القوة" },
  "dashboard.areasToImprove": { en: "Areas to Improve", ar: "مجالات التحسين" },
  "dashboard.upcomingClasses": { en: "Upcoming Classes", ar: "الحصص القادمة" },
  "dashboard.downloadReport": { en: "Download PDF Report", ar: "تحميل تقرير PDF" },
  "dashboard.swimmingProgress": { en: "Swimming Progress", ar: "تقدم السباحة" },
  "dashboard.tennisProgress": { en: "Tennis Progress", ar: "تقدم التنس" },
  "dashboard.welcomeBack": { en: "Welcome back! 👋", ar: "مرحباً بعودتك! 👋" },
  "dashboard.password": { en: "Password", ar: "كلمة المرور" },
  "dashboard.fillAllFields": { en: "Please fill all fields", ar: "يرجى ملء جميع الحقول" },

  // Footer
  "footer.quickLinks": { en: "Quick Links", ar: "روابط سريعة" },
  "footer.ourSports": { en: "Our Sports", ar: "رياضاتنا" },
  "footer.contactUs": { en: "Contact Us", ar: "تواصل معنا" },
  "footer.rights": { en: "© 2024 Spirit Sports Academy. All rights reserved.", ar: "© 2024 أكاديمية سبيريت الرياضية. جميع الحقوق محفوظة." },
  "footer.description": { en: "Egypt's premier sports academy. Forging champions since 2014 with world-class coaching and facilities.", ar: "أفضل أكاديمية رياضية في مصر. نصنع الأبطال منذ 2014 بتدريب ومرافق عالمية المستوى." },

  // Sports names
  "sport.swimming": { en: "Swimming", ar: "السباحة" },
  "sport.tennis": { en: "Tennis", ar: "التنس" },
  "sport.football": { en: "Football", ar: "كرة القدم" },
  "sport.basketball": { en: "Basketball", ar: "كرة السلة" },
  "sport.gymnastics": { en: "Gymnastics", ar: "الجمباز" },
  "sport.martialArts": { en: "Martial Arts", ar: "الفنون القتالية" },

  // Common
  "common.est": { en: "Est.", ar: "تأسس" },

  // Milestones Arabic
  "milestone.2014.title": { en: "Founded", ar: "التأسيس" },
  "milestone.2014.desc": { en: "Champions Academy established in Cairo with swimming & tennis programs.", ar: "تأسيس أكاديمية الأبطال في القاهرة مع برامج السباحة والتنس." },
  "milestone.2016.title": { en: "First National Title", ar: "أول لقب وطني" },
  "milestone.2016.desc": { en: "Our swimmers won 12 gold medals at the Egyptian National Championships.", ar: "فاز سباحونا بـ 12 ميدالية ذهبية في البطولة الوطنية المصرية." },
  "milestone.2018.title": { en: "Expansion", ar: "التوسع" },
  "milestone.2018.desc": { en: "Opened 3 new branches in Alexandria, Giza, and New Cairo.", ar: "افتتاح 3 فروع جديدة في الإسكندرية والجيزة والقاهرة الجديدة." },
  "milestone.2020.title": { en: "Digital Transformation", ar: "التحول الرقمي" },
  "milestone.2020.desc": { en: "Launched virtual training & performance analytics platform.", ar: "إطلاق منصة التدريب الافتراضي وتحليلات الأداء." },
  "milestone.2022.title": { en: "International Stage", ar: "المحفل الدولي" },
  "milestone.2022.desc": { en: "15 athletes represented Egypt in international competitions.", ar: "15 رياضياً مثلوا مصر في المسابقات الدولية." },
  "milestone.2024.title": { en: "8 Branches Strong", ar: "8 فروع قوية" },
  "milestone.2024.desc": { en: "Expanded to 8 branches across Egypt, serving 2500+ students.", ar: "التوسع إلى 8 فروع في مصر، نخدم أكثر من 2500 طالب." },

  // Awards Arabic
  "award.1.title": { en: "Best Sports Academy in Egypt", ar: "أفضل أكاديمية رياضية في مصر" },
  "award.1.org": { en: "Egyptian Sports Federation", ar: "الاتحاد المصري للرياضة" },
  "award.2.title": { en: "Excellence in Youth Development", ar: "التميز في تنمية الشباب" },
  "award.2.org": { en: "Ministry of Youth & Sports", ar: "وزارة الشباب والرياضة" },
  "award.3.title": { en: "Top Swimming Program", ar: "أفضل برنامج سباحة" },
  "award.3.org": { en: "African Aquatics Association", ar: "الاتحاد الأفريقي للسباحة" },
  "award.4.title": { en: "Community Impact Award", ar: "جائزة التأثير المجتمعي" },
  "award.4.org": { en: "Cairo Governorate", ar: "محافظة القاهرة" },
  "award.5.title": { en: "Innovation in Sports Training", ar: "الابتكار في التدريب الرياضي" },
  "award.5.org": { en: "Arab Sports Council", ar: "مجلس الرياضة العربي" },

  // Testimonials Arabic
  "testimonial.1.text": { en: "My daughter's confidence has skyrocketed since joining Champions. The coaches are exceptional and truly care about each child's development.", ar: "ارتفعت ثقة ابنتي بشكل كبير منذ انضمامها للأبطال. المدربون استثنائيون ويهتمون حقاً بتطور كل طفل." },
  "testimonial.2.text": { en: "I've been training here for 4 years and won my first national medal last year. The facilities and coaching are world-class.", ar: "أتدرب هنا منذ 4 سنوات وفزت بأول ميدالية وطنية العام الماضي. المرافق والتدريب على مستوى عالمي." },
  "testimonial.3.text": { en: "The progress tracking dashboard helps me stay connected to my children's development. Best academy in Egypt, no doubt.", ar: "لوحة تتبع التقدم تساعدني على البقاء على اتصال بتطور أطفالي. أفضل أكاديمية في مصر، بلا شك." },
  "testimonial.4.text": { en: "Both my sons train in swimming and football. The multi-sport approach has made them well-rounded athletes.", ar: "كلا ابنيّ يتدربان في السباحة وكرة القدم. النهج متعدد الرياضات جعلهم رياضيين متكاملين." },
  "testimonial.5.text": { en: "The coaches push us to be our best while making training fun. I've improved my 100m freestyle by 8 seconds this year!", ar: "المدربون يدفعوننا لنكون الأفضل مع جعل التدريب ممتعاً. حسّنت زمني في 100 متر حرة بـ 8 ثوانٍ هذا العام!" },

  // Contact FAQ Arabic
  "contactFaq.1.q": { en: "What are your operating hours?", ar: "ما هي ساعات العمل؟" },
  "contactFaq.1.a": { en: "Our branches are open Saturday–Thursday, 8:00 AM – 9:00 PM. Friday hours are 2:00 PM – 8:00 PM.", ar: "فروعنا مفتوحة من السبت إلى الخميس، 8:00 صباحاً – 9:00 مساءً. ساعات الجمعة 2:00 مساءً – 8:00 مساءً." },
  "contactFaq.2.q": { en: "Can I book a trial session?", ar: "هل يمكنني حجز جلسة تجريبية؟" },
  "contactFaq.2.a": { en: "Yes! We offer one free trial session for any sport. Contact us to schedule.", ar: "نعم! نقدم جلسة تجريبية مجانية واحدة لأي رياضة. تواصل معنا للحجز." },
  "contactFaq.3.q": { en: "How do I reach a specific branch?", ar: "كيف أتواصل مع فرع محدد؟" },
  "contactFaq.3.a": { en: "Each branch has a direct phone line listed on our Branches page, or you can call our main line.", ar: "لكل فرع خط هاتف مباشر مدرج في صفحة الفروع، أو يمكنك الاتصال بخطنا الرئيسي." },
  "contactFaq.4.q": { en: "Do you offer transport services?", ar: "هل تقدمون خدمات نقل؟" },
  "contactFaq.4.a": { en: "Some branches offer shuttle services within a 5km radius. Contact the branch directly for details.", ar: "بعض الفروع تقدم خدمات نقل في نطاق 5 كم. تواصل مع الفرع مباشرة للتفاصيل." },

  // Membership FAQ Arabic
  "memberFaq.1.q": { en: "Can I switch plans mid-month?", ar: "هل يمكنني تغيير الخطة في منتصف الشهر؟" },
  "memberFaq.1.a": { en: "Yes, you can upgrade anytime. The difference will be prorated. Downgrades take effect at the next billing cycle.", ar: "نعم، يمكنك الترقية في أي وقت. سيتم احتساب الفرق. التخفيضات تسري في دورة الفوترة التالية." },
  "memberFaq.2.q": { en: "Is there a registration fee?", ar: "هل هناك رسوم تسجيل؟" },
  "memberFaq.2.a": { en: "A one-time registration fee of 500 EGP applies for new members, which includes assessment and kit.", ar: "رسوم تسجيل لمرة واحدة قدرها 500 جنيه مصري للأعضاء الجدد، تشمل التقييم والمعدات." },
  "memberFaq.3.q": { en: "Can siblings get a discount?", ar: "هل يحصل الأشقاء على خصم؟" },
  "memberFaq.3.a": { en: "Yes! We offer 10% off for the second child and 15% off for the third child enrolled.", ar: "نعم! نقدم خصم 10% للطفل الثاني و15% للطفل الثالث المسجل." },
  "memberFaq.4.q": { en: "What's the cancellation policy?", ar: "ما هي سياسة الإلغاء؟" },
  "memberFaq.4.a": { en: "You can cancel anytime with 30 days notice. No cancellation fees for members who have been with us for 3+ months.", ar: "يمكنك الإلغاء في أي وقت بإشعار 30 يوماً. لا رسوم إلغاء للأعضاء الذين معنا منذ 3+ أشهر." },
  "memberFaq.5.q": { en: "Do you offer summer camp programs?", ar: "هل تقدمون برامج معسكرات صيفية؟" },
  "memberFaq.5.a": { en: "Yes, we run intensive summer camps in June–August with special pricing. These are separate from regular memberships.", ar: "نعم، ننظم معسكرات صيفية مكثفة في يونيو–أغسطس بأسعار خاصة. وهي منفصلة عن العضويات العادية." },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "ar" ? "ar" : "en") as Language;
  });

  const isRTL = lang === "ar";

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    if (isRTL) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [lang, isRTL]);

  const t = (key: string): string => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};
