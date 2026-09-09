export type SupportedLanguage = 'en' | 'hi' | 'mr';

export interface TranslationDictionary {
  [key: string]: string;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    // Nav & Branding
    'nav.ministry': 'Ministry of Skill Development & Entrepreneurship',
    'nav.govIndia': 'Government of India',
    'nav.tagline': 'Track • Analyse • Build Better Futures',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.impact': 'Impact',
    'nav.resources': 'Resources',
    'nav.signIn': 'Sign In',
    'nav.asStudent': 'As a Student',
    'nav.asGov': 'As a Government Officer',
    'nav.asAdmin': 'As an Admin',
    'nav.search': 'Search',

    // Accessibility Bar
    'a11y.skip': 'Skip to Main Content',
    'a11y.screenReader': 'Screen Reader',
    'a11y.reset': 'Reset Font',
    'a11y.highContrast': 'High Contrast',
    'a11y.lightMode': 'Light Mode',
    'a11y.darkMode': 'Dark Mode',
    'a11y.india': '🇮🇳 India',
    'a11y.langLabel': 'Select Language',

    // Hero
    'hero.badge': '“The certificate is not the outcome. What happens after the certificate is.”',
    'hero.titleLine1': 'Track Skills. Measure Outcomes.',
    'hero.titleLine2': 'Build a Better Future.',
    'hero.desc': 'Skill Saarthi is India\'s consent-based Outcome Intelligence Layer connecting training credentials with verified post-placement careers, retention, wage growth, and skill gap remediation.',
    'hero.exploreStudent': 'Explore Student Portal',
    'hero.officerConsole': 'Officer & Admin Console',
    'hero.watchVideo': 'System Overview',
    'hero.statTrainees': 'Trainees Tracked',
    'hero.statTriangulation': 'Triangulation Accuracy',
    'hero.statWindow': 'Longitudinal Window',
    'hero.stageTraining': 'Training',
    'hero.stageAssessment': 'Assessment',
    'hero.stageSkillGap': 'Skill Gap',
    'hero.stageApprenticeship': 'Apprenticeship',
    'hero.stageEmployment': 'Employment',
    'hero.stageFollowUp': 'Follow-up',

    // Problem
    'problem.badge': 'The Critical Information Gap',
    'problem.title': 'The Missing 18 Months After Certification',
    'problem.desc': 'India excels at training and certifying millions. However, government stakeholders lack reliable visibility into what happens after: Did the learner enter employment? Is retention sustained after 6, 12, or 24 months?',
    'problem.card1Title': 'Unverified Placement Claims',
    'problem.card1Desc': 'Placement statistics are often single-point self-reports without multi-source triangulation or document verification.',
    'problem.card2Title': 'Early Career Attrition',
    'problem.card2Desc': 'Over 38% of placed youth leave their initial jobs within 6 months due to wage dissatisfaction or migration hurdles.',
    'problem.card3Title': 'Blind Skill-Job Mismatches',
    'problem.card3Desc': 'No feedback loop to inform ITIs and training centers which curriculum modules failed real industrial workplace demands.',

    // Solution
    'solution.badge': 'Outcome Intelligence Layer',
    'solution.title': 'Moving from Counting Placements to Measuring Livelihoods',
    'solution.axiom': 'CONNECT → FOLLOW → VERIFY → MEASURE → EXPLAIN → ACT',
    'solution.desc': 'Skill Saarthi does not claim absolute certainty. Instead, our Outcome Evidence Engine asks: “How strong is the available evidence supporting this reported outcome?”',

    // Features
    'features.badge': 'Engine Capabilities',
    'features.title': 'Engineered for High-Trust Governance',
    'features.feat1Title': 'Multi-Source Triangulation',
    'features.feat1Desc': 'Cross-validates learner WhatsApp surveys, employer confirmation, salary consistency, and DigiLocker records.',
    'features.feat2Title': 'AI Skill Gap Diagnostics',
    'features.feat2Desc': 'PIN-points exact technical defects and non-placement causes to suggest personalized bridge courses.',
    'features.feat3Title': 'DPDP Act 2023 Consent Ledger',
    'features.feat3Desc': 'Cryptographic consent trails ensuring all post-training outcome data is shared strictly with learner permission.',
    'features.feat4Title': 'Section 10 National Decision Matrix',
    'features.feat4Desc': 'Calibrated decision bands: ≥75% Verified Outcome, 40-74% Desk Review, <40% Unverified Outcome.',

    // How It Works
    'how.badge': 'Continuous Lifecycle',
    'how.title': 'How Skill Saarthi Operates',
    'how.step1Title': '1. Consent & Connect',
    'how.step1Desc': 'Learners grant purpose-bound consent during PMKVY/ITI certification to securely track livelihood milestones.',
    'how.step2Title': '2. Automated Follow-up',
    'how.step2Desc': 'Quick 30-second WhatsApp micro-surveys at Month 3, 6, 12, and 24 to check employment, wages, and challenges.',
    'how.step3Title': '3. Triangulate & Verify',
    'how.step3Desc': 'Outcome Evidence Engine calculates confidence score (0-100%) against employer attestation and salary consistency.',
    'how.step4Title': '4. Institutional Action',
    'how.step4Desc': 'Officers audit low-performing centers; learners receive automated upskilling paths and bridge certifications.',

    // Portals Section
    'portals.badge': 'Role-Based Ecosystem',
    'portals.title': 'Three Dedicated Consoles',
    'portals.studentTitle': 'Learner Outcome Passport',
    'portals.studentDesc': 'Access your longitudinal skill passport, log employment updates, get AI gap analysis, and control data consents.',
    'portals.govTitle': 'Government Officer Intelligence',
    'portals.govDesc': 'District & state dashboards, VTP accreditation tracking, Section 14 Nashik benchmark equations, and cohort reviews.',
    'portals.adminTitle': 'Central Ops & Policy Master',
    'portals.adminDesc': 'System telemetry, Section 10 evidence weight calibration, DPDP cryptographic logs, and Section 20 cohort generation.',
    'portals.openPortal': 'Launch Portal →',

    // Impact
    'impact.badge': 'Target Outcomes',
    'impact.title': 'Measurable National Impact',
    'impact.metric1Val': '42,750+',
    'impact.metric1Label': 'Active Consented Trainees',
    'impact.metric2Val': '74.2%',
    'impact.metric2Label': 'Verified Employment Rate',
    'impact.metric3Val': '61.0%',
    'impact.metric3Label': '6-Month Sustained Retention',
    'impact.metric4Val': '+18.4%',
    'impact.metric4Label': 'Average Wage Progression',

    // Why It Matters
    'why.badge': 'Ecosystem Benefits',
    'why.title': 'Value Across the Skilling Value Chain',
    'why.student': 'For Students: Lifelong verified career credentials, wage growth tracking, and rapid upskilling recommendations.',
    'why.provider': 'For Training Providers: Objective performance recognition, outcome-based funding validation, and employer tie-ups.',
    'why.government': 'For Government: Evidence-based fund allocation, elimination of ghost placements, and targeted curriculum policy.',

    // CTA
    'cta.title': 'Begin Measuring Real Skilling Outcomes Today',
    'cta.desc': 'Join India\'s unified outcome intelligence initiative and help move our skilling ecosystem from placement numbers to sustainable livelihoods.',
    'cta.student': 'Student Login',
    'cta.gov': 'Government Officer Login',
    'cta.admin': 'Admin Console',

    // Footer
    'footer.dept': 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    'footer.gov': 'Government of India',
    'footer.partner': 'Technical Directorate: National Informatics Centre (NIC)',
    'footer.dpdpNotice': 'Compliant with Digital Personal Data Protection (DPDP) Act 2023 • Section 20 Synthetic Data Protocol Enabled',
    'footer.rights': '© 2026 Skill Saarthi. All Rights Reserved.',

    // Common Portal Labels
    'portal.theme': 'Theme',
    'portal.lang': 'Language',
    'portal.light': 'Light',
    'portal.dark': 'Dark',
    'portal.signOut': 'Sign Out',
    'portal.demoWatermark': 'DEMO / SYNTHETIC DATA (Section 20 Protocol)',
    'portal.verified': 'Verified',
    'portal.review': 'Needs Review',
    'portal.unverified': 'Unverified',
  },

  hi: {
    // Nav & Branding
    'nav.ministry': 'कौशल विकास एवं उद्यमशीलता मंत्रालय',
    'nav.govIndia': 'भारत सरकार',
    'nav.tagline': 'ट्रैक करें • विश्लेषण करें • बेहतर भविष्य बनाएं',
    'nav.home': 'होम',
    'nav.about': 'परिचय',
    'nav.features': 'विशेषताएं',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.impact': 'प्रभाव',
    'nav.resources': 'संसाधन',
    'nav.signIn': 'साइन इन करें',
    'nav.asStudent': 'प्रशिक्षार्थी के रूप में',
    'nav.asGov': 'सरकारी अधिकारी के रूप में',
    'nav.asAdmin': 'व्यवस्थापक (एडमिन) के रूप में',
    'nav.search': 'खोजें',

    // Accessibility Bar
    'a11y.skip': 'मुख्य सामग्री पर जाएं',
    'a11y.screenReader': 'स्क्रीन रीडर',
    'a11y.reset': 'फ़ॉन्ट रीसेट',
    'a11y.highContrast': 'उच्च कंट्रास्ट',
    'a11y.lightMode': 'लाइट मोड',
    'a11y.darkMode': 'डार्क मोड',
    'a11y.india': '🇮🇳 भारत',
    'a11y.langLabel': 'भाषा चुनें',

    // Hero
    'hero.badge': '“प्रमाणपत्र अंतिम परिणाम नहीं है। प्रमाणपत्र के बाद क्या होता है, वह वास्तविक परिणाम है।”',
    'hero.titleLine1': 'कौशल ट्रैक करें। परिणाम मापें।',
    'hero.titleLine2': 'बेहतर भविष्य का निर्माण करें।',
    'hero.desc': 'स्किल सारथी भारत का सहमति-आधारित आउटकम इंटेलिजेंस प्लेटफ़ॉर्म है जो प्रशिक्षण प्रमाणपत्रों को सत्यापित रोजगार, प्रतिधारण, वेतन वृद्धि और कौशल अंतर सुधार से जोड़ता है।',
    'hero.exploreStudent': 'छात्र पोर्टल देखें',
    'hero.officerConsole': 'अधिकारी व एडमिन पोर्टल',
    'hero.watchVideo': 'प्रणाली अवलोकन',
    'hero.statTrainees': 'ट्रैक किए गए प्रशिक्षार्थी',
    'hero.statTriangulation': 'सत्यापन सटीकता',
    'hero.statWindow': 'ट्रैकिंग समयसीमा',
    'hero.stageTraining': 'प्रशिक्षण',
    'hero.stageAssessment': 'मूल्यांकन',
    'hero.stageSkillGap': 'कौशल अंतर',
    'hero.stageApprenticeship': 'प्रशिक्षुता',
    'hero.stageEmployment': 'रोजगार',
    'hero.stageFollowUp': 'फॉलो-अप',

    // Problem
    'problem.badge': 'महत्वपूर्ण सूचना अंतर',
    'problem.title': 'प्रमाणन के बाद के गुम 18 महीने',
    'problem.desc': 'भारत लाखों युवाओं को प्रशिक्षित और प्रमाणित करने में अग्रणी है। लेकिन प्रमाणन के बाद क्या हुआ, इसकी कोई स्पष्ट जानकारी नहीं होती: क्या युवा रोजगार में बने रहे? 6 या 12 महीने बाद उनकी स्थिति क्या है?',
    'problem.card1Title': 'असत्यापित प्लेसमेंट दावे',
    'problem.card1Desc': 'अधिकांश प्लेसमेंट आंकड़े केवल कागजी रिपोर्ट होते हैं, जिनकी कोई बहु-स्रोत जांच नहीं होती।',
    'problem.card2Title': 'प्रारंभिक रोजगार में उच्च पलायन',
    'problem.card2Desc': '38% से अधिक युवा वेतन असंतोष या स्थानांतरण कठिनाइयों के कारण 6 महीने के भीतर पहली नौकरी छोड़ देते हैं।',
    'problem.card3Title': 'अप्रत्यक्ष कौशल बेमेल',
    'problem.card3Desc': 'प्रशिक्षण केंद्रों को यह फीडबैक नहीं मिल पाता कि उनके पाठ्यक्रम का कौन सा हिस्सा उद्योग की जरूरतों पर खरा नहीं उतरा।',

    // Solution
    'solution.badge': 'आउटकम इंटेलिजेंस लेयर',
    'solution.title': 'प्लेसमेंट गिनती से सतत आजीविका मापन की ओर',
    'solution.axiom': 'जोड़ें → अनुसरण करें → सत्यापित करें → मापें → समझें → कार्य करें',
    'solution.desc': 'स्किल सारथी झूठे दावे नहीं करता। हमारा इंजन पूछता है: “इस रोजगार परिणाम के समर्थन में उपलब्ध साक्ष्य कितने मजबूत हैं?”',

    // Features
    'features.badge': 'इंजन क्षमताएं',
    'features.title': 'उच्च-विश्वसनीय सुशासन के लिए निर्मित',
    'features.feat1Title': 'बहु-स्रोत साक्ष्य त्रिकोणीयकरण',
    'features.feat1Desc': 'व्हाट्सएप सर्वेक्षण, नियोक्ता पुष्टि, बैंक वेतन निरंतरता और डिजिलॉकर रिकॉर्ड का संगम।',
    'features.feat2Title': 'एआई कौशल अंतर निदान',
    'features.feat2Desc': 'सटीक तकनीकी और व्यावहारिक कमियों की पहचान कर व्यक्तिगत अपस्किलिंग ब्रिज कोर्स सुझाता है।',
    'features.feat3Title': 'डीपीडीपी अधिनियम 2023 सहमति बही',
    'features.feat3Desc': 'क्रिप्टोग्राफिक सहमति रिकॉर्ड सुनिश्चित करते हैं कि डेटा केवल प्रशिक्षार्थी की अनुमति से ही उपयोग हो।',
    'features.feat4Title': 'राष्ट्रीय साक्ष्य निर्णय मैट्रिक्स (धारा 10)',
    'features.feat4Desc': 'मानकीकृत निर्णय श्रेणियां: ≥75% सत्यापित परिणाम, 40-74% समीक्षा आवश्यक, <40% असत्यापित परिणाम।',

    // How It Works
    'how.badge': 'निरंतर जीवन चक्र',
    'how.title': 'स्किल सारथी कैसे कार्य करता है',
    'how.step1Title': '1. सहमति और जुड़ाव',
    'how.step1Desc': 'प्रशिक्षार्थी प्रमाणन के दौरान उद्देश्य-विशिष्ट सहमति प्रदान करते हैं ताकि आजीविका के पड़ावों को ट्रैक किया जा सके।',
    'how.step2Title': '2. स्वचालित सूक्ष्म-फॉलो-अप',
    'how.step2Desc': '3, 6, 12 और 24वें महीने में 30 सेकंड के व्हाट्सएप सर्वे द्वारा रोजगार, वेतन और चुनौतियों की जांच।',
    'how.step3Title': '3. मिलान और सत्यापन',
    'how.step3Desc': 'आउटकम साक्ष्य इंजन नियोक्ता पुष्टि और वेतन निरंतरता के आधार पर 0-100% स्कोर तय करता है।',
    'how.step4Title': '4. संस्थागत सुधारात्मक कदम',
    'how.step4Desc': 'अधिकारी कमजोर केंद्रों का ऑडिट करते हैं; युवाओं को तत्काल ब्रिज अपस्किलिंग कोर्स मिलते हैं।',

    // Portals Section
    'portals.badge': 'भूमिका-आधारित कंसोल',
    'portals.title': 'सभी हितधारकों के लिए तीन समर्पित पोर्टल',
    'portals.studentTitle': 'प्रशिक्षार्थी आउटकम पासपोर्ट',
    'portals.studentDesc': 'अपने सत्यापित करियर रिकॉर्ड देखें, वेतन अपडेट करें, एआई कौशल सलाह पाएं और डेटा सहमति प्रबंधित करें।',
    'portals.govTitle': 'सरकारी अधिकारी इंटेलिजेंस',
    'portals.govDesc': 'जिला व राज्य डैशबोर्ड, प्रशिक्षण प्रदाता रेटिंग, धारा 14 नासिक बेंचमार्क समीकरण और समीक्षा।',
    'portals.adminTitle': 'केंद्रीय संचालन एवं नीति मास्टर',
    'portals.adminDesc': 'सिस्टम स्वास्थ्य, धारा 10 साक्ष्य भार समायोजन, डीपीडीपी ऑडिट लॉग्स और धारा 20 कोहॉर्ट निर्माण।',
    'portals.openPortal': 'पोर्टल खोलें →',

    // Impact
    'impact.badge': 'लक्ष्य परिणाम',
    'impact.title': 'मापने योग्य राष्ट्रीय प्रभाव',
    'impact.metric1Val': '42,750+',
    'impact.metric1Label': 'सक्रिय सहमति प्राप्त प्रशिक्षार्थी',
    'impact.metric2Val': '74.2%',
    'impact.metric2Label': 'सत्यापित रोजगार दर',
    'impact.metric3Val': '61.0%',
    'impact.metric3Label': '6-माह सतत प्रतिधारण',
    'impact.metric4Val': '+18.4%',
    'impact.metric4Label': 'औसत वेतन वृद्धि',

    // Why It Matters
    'why.badge': 'पारिस्थितिकी तंत्र के लाभ',
    'why.title': 'कौशल मूल्य श्रृंखला के प्रत्येक स्तर के लिए',
    'why.student': 'प्रशिक्षार्थियों के लिए: आजीवन सत्यापित करियर क्रेडेंशियल, वेतन प्रगति और त्वरित अपस्किलिंग।',
    'why.provider': 'प्रशिक्षण प्रदाताओं के लिए: पारदर्शी प्रदर्शन मूल्यांकन, परिणाम-आधारित फंडिंग और नियोक्ता नेटवर्क।',
    'why.government': 'सरकार के लिए: साक्ष्य-आधारित बजट आवंटन, फर्जी प्लेसमेंट का खात्मा और सटीक नीति निर्माण।',

    // CTA
    'cta.title': 'आज ही वास्तविक कौशल परिणामों को मापना शुरू करें',
    'cta.desc': 'भारत की एकीकृत आउटकम इंटेलिजेंस पहल से जुड़ें और केवल प्लेसमेंट संख्या से आगे बढ़कर स्थायी आजीविका बनाएं।',
    'cta.student': 'प्रशिक्षार्थी लॉगिन',
    'cta.gov': 'सरकारी अधिकारी लॉगिन',
    'cta.admin': 'एडमिन कंसोल',

    // Footer
    'footer.dept': 'कौशल विकास एवं उद्यमशीलता मंत्रालय (MSDE)',
    'footer.gov': 'भारत सरकार',
    'footer.partner': 'तकनीकी कार्यान्वयन: राष्ट्रीय सूचना विज्ञान केंद्र (NIC)',
    'footer.dpdpNotice': 'डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम 2023 के अनुरूप • धारा 20 प्रोटोकॉल सक्रिय',
    'footer.rights': '© 2026 स्किल सारथी। सर्वाधिकार सुरक्षित।',

    // Common Portal Labels
    'portal.theme': 'थीम',
    'portal.lang': 'भाषा',
    'portal.light': 'लाइट',
    'portal.dark': 'डार्क',
    'portal.signOut': 'लॉग आउट',
    'portal.demoWatermark': 'डेमो / सिंथेटिक डेटा (धारा 20 प्रोटोकॉल)',
    'portal.verified': 'सत्यापित',
    'portal.review': 'समीक्षा आवश्यक',
    'portal.unverified': 'असत्यापित',
  },

  mr: {
    // Nav & Branding
    'nav.ministry': 'कौशल्य विकास आणि उद्योजकता मंत्रालय',
    'nav.govIndia': 'भारत सरकार',
    'nav.tagline': 'मागोवा घ्या • विश्लेषण करा • उज्ज्वल भविष्य घडवा',
    'nav.home': 'मुख्यपृष्ठ',
    'nav.about': 'माहिती',
    'nav.features': 'वैशिष्ट्ये',
    'nav.howItWorks': 'हे कसे चालते',
    'nav.impact': 'प्रभाव',
    'nav.resources': 'संसाधने',
    'nav.signIn': 'साइन इन करा',
    'nav.asStudent': 'प्रशिक्षार्थी म्हणून',
    'nav.asGov': 'शासकीय अधिकारी म्हणून',
    'nav.asAdmin': 'प्रशासक (अ‍ॅडमिन) म्हणून',
    'nav.search': 'शोधा',

    // Accessibility Bar
    'a11y.skip': 'मुख्य घटकाकडे जा',
    'a11y.screenReader': 'स्क्रीन रीडर',
    'a11y.reset': 'फॉन्ट पूर्ववत',
    'a11y.highContrast': 'उच्च कॉन्ट्रास्ट',
    'a11y.lightMode': 'लाइट मोड',
    'a11y.darkMode': 'डार्क मोड',
    'a11y.india': '🇮🇳 भारत',
    'a11y.langLabel': 'भाषा निवडा',

    // Hero
    'hero.badge': '“प्रमाणपत्र हा अंतिम परिणाम नाही. प्रमाणपत्रा नंतर काय घडते, तो खरा परिणाम आहे.”',
    'hero.titleLine1': 'कौशल्यांचा मागोवा घ्या. परिणाम मोजा.',
    'hero.titleLine2': 'अधिक चांगले भविष्य घडवा.',
    'hero.desc': 'स्किल सारथी हे भारताचे संमती-आधारित आउटकम इंटेलिजन्स व्यासपीठ आहे, जे प्रशिक्षण प्रमाणपत्रांना पडताळणीकृत रोजगार, टिकून राहणे, वेतनवाढ आणि कौशल्य तफावत सुधारणेशी जोडते.',
    'hero.exploreStudent': 'विद्यार्थी पोर्टल पहा',
    'hero.officerConsole': 'अधिकारी व अ‍ॅडमिन पोर्टल',
    'hero.watchVideo': 'प्रणाली आढावा',
    'hero.statTrainees': 'मागोवा घेतलेले प्रशिक्षणार्थी',
    'hero.statTriangulation': 'पडताळणी अचूकता',
    'hero.statWindow': 'मागोवा कालावधी',
    'hero.stageTraining': 'प्रशिक्षण',
    'hero.stageAssessment': 'मूल्यांकन',
    'hero.stageSkillGap': 'कौशल्य तफावत',
    'hero.stageApprenticeship': 'प्रशिक्षणार्थीपद',
    'hero.stageEmployment': 'रोजगार',
    'hero.stageFollowUp': 'पाठपुरावा',

    // Problem
    'problem.badge': 'माहितीतील महत्त्वपूर्ण अंतर',
    'problem.title': 'प्रमाणपत्रानंतरचे हरवलेले १८ महिने',
    'problem.desc': 'लाखो तरुणांना प्रशिक्षण व प्रमाणपत्र देण्यात भारत अग्रेसर आहे. पण प्रमाणपत्रानंतर पुढे काय झाले याची शाश्वत नोंद नसते: तरुण रोजगारात टिकून राहिले का? ६ किंवा १२ महिन्यांनंतर त्यांची स्थिती काय आहे?',
    'problem.card1Title': 'अपडताळणीकृत प्लेसमेंटचे दावे',
    'problem.card1Desc': 'अनेक प्लेसमेंट आकडे हे केवळ कागदोपत्री असतात, ज्यांची कोणतीही बहु-स्त्रोत पडताळणी नसते.',
    'problem.card2Title': 'सुरुवातीच्या नोकरीत गळती',
    'problem.card2Desc': 'कमी वेतन किंवा स्थलांतराच्या अडचणींमुळे ३८% पेक्षा जास्त युवक ६ महिन्यांच्या आत पहिली नोकरी सोडतात.',
    'problem.card3Title': 'कौशल्य-काम असंतुलन',
    'problem.card3Desc': 'अभ्यासक्रमातील कोणत्या त्रुटींमुळे प्रत्यक्ष कामाच्या ठिकाणी अडचण आली, याचा प्रशिक्षण संस्थांना अभिप्राय मिळत नाही.',

    // Solution
    'solution.badge': 'आउटकम इंटेलिजन्स थर',
    'solution.title': 'प्लेसमेंट मोजण्यापासून शाश्वत उपजीविका मोजण्याकडे',
    'solution.axiom': 'जोडा → पाठपुरावा करा → पडताळा → मोजा → स्पष्ट करा → कृती करा',
    'solution.desc': 'स्किल सारथी निरर्थक दावे करत नाही. आमचे इंजिन विचारते: “नोंदवलेल्या या रोजगाराच्या समर्थनार्थ उपलब्ध पुरावे किती भक्कम आहेत?”',

    // Features
    'features.badge': 'इंजिनची क्षमता',
    'features.title': 'उच्च-विश्वासार्ह प्रशासनासाठी विकसित',
    'features.feat1Title': 'बहु-स्त्रोत पुरावा पडताळणी',
    'features.feat1Desc': 'व्हॉट्सअ‍ॅप सर्वेक्षण, मालकांची पुष्टी, बँक वेतन सातत्य आणि डिजिलॉकर नोंदींचा त्रिकोणी संगम.',
    'features.feat2Title': 'एआय कौशल्य तफावत निदान',
    'features.feat2Desc': 'तांत्रिक व वर्तणूक दोषांची अचूक ओळख करून योग्य अपस्किलिंग ब्रिज कोर्स सुचवते.',
    'features.feat3Title': 'डीपीडीपी कायदा २०२३ संमती नोंदवही',
    'features.feat3Desc': 'क्रिप्टोग्राफिक नोंदी ज्यामुळे माहिती केवळ प्रशिक्षणार्थ्याच्या संमतीनेच उपयोगात आणली जाते.',
    'features.feat4Title': 'कलम १० राष्ट्रीय निर्णय मॅट्रिक्स',
    'features.feat4Desc': 'मानकीकृत वर्गवारी: ≥७५% पडताळणीकृत परिणाम, ४०-७४% पुनरावलोकन आवश्यक, <४०% अपडताळणीकृत.',

    // How It Works
    'how.badge': 'अखंड जीवनचक्र',
    'how.title': 'स्किल सारथी कसे काम करते',
    'how.step1Title': '१. संमती आणि जोडणी',
    'how.step1Desc': 'प्रशिक्षार्थी प्रमाणपत्राच्या वेळी निश्चित हेतूसाठी संमती देतात जेणेकरून कारकीर्दीचे टप्पे नोंदवले जातात.',
    'how.step2Title': '२. स्वयंचलित पाठपुरावा',
    'how.step2Desc': '३, ६, १२ आणि २४ व्या महिन्यात ३० सेकंदांच्या व्हॉट्सअ‍ॅप सर्वेक्षणातून रोजगार आणि वेतनाची चौकशी.',
    'how.step3Title': '३. पडताळणी व गुणदान',
    'how.step3Desc': 'आउटकम पुरावा इंजिन मालकाचा प्रतिसाद आणि वेतनाच्या आधारे ०-१००% विश्वासार्हता ठरवते.',
    'how.step4Title': '४. संस्थात्मक सुधारणा',
    'how.step4Desc': 'अधिकारी निकृष्ट केंद्रांचे ऑडिट करतात; विद्यार्थ्यांना तातडीने पुढील कौशल्यवृद्धीचे पर्याय मिळतात.',

    // Portals Section
    'portals.badge': 'भूमिका-आधारित प्रवेश',
    'portals.title': 'सर्व घटकांसाठी तीन स्वतंत्र पोर्टल',
    'portals.studentTitle': 'प्रशिक्षार्थी आउटकम पासपोर्ट',
    'portals.studentDesc': 'तुमच्या प्रमाणित कारकीर्दीचा मागोवा घ्या, वेतन अपडेट करा, एआय कौशल्य सल्ला मिळवा आणि संमती व्यवस्थापित करा.',
    'portals.govTitle': 'शासकीय अधिकारी इंटेलिजन्स',
    'portals.govDesc': 'जिल्हा व राज्य डॅशबोर्ड, संस्था मूल्यांकन, कलम १४ नाशिक बेंचमार्क समीकरणे आणि आढावा.',
    'portals.adminTitle': 'केंद्रीय ऑपरेशन्स व धोरण मास्टर',
    'portals.adminDesc': 'सिस्टम आरोग्य, पुरावा भारांक कॅलिब्रेशन, डीपीडीपी ऑडिट नोंदी आणि कलम २० तुकडी निर्मिती.',
    'portals.openPortal': 'पोर्टल उघडा →',

    // Impact
    'impact.badge': 'लक्ष्य परिणाम',
    'impact.title': 'मोजण्याजोगा राष्ट्रीय प्रभाव',
    'impact.metric1Val': '४२,७५०+',
    'impact.metric1Label': 'सक्रिय संमतीप्राप्त प्रशिक्षणार्थी',
    'impact.metric2Val': '७४.२%',
    'impact.metric2Label': 'पडताळणीकृत रोजगार दर',
    'impact.metric3Val': '६१.०%',
    'impact.metric3Label': '६ महिने टिकून राहण्याचा दर',
    'impact.metric4Val': '+१८.४%',
    'impact.metric4Label': 'सरासरी वेतनवाढ',

    // Why It Matters
    'why.badge': 'परिसंस्थेचे फायदे',
    'why.title': 'कौशल्य मूल्य साखळीच्या सर्व घटकांसाठी',
    'why.student': 'विद्यार्थ्यांसाठी: आजीवन प्रमाणित कारकीर्द ओळख, वेतनवाढ आणि झटपट कौशल्यवृद्धी.',
    'why.provider': 'प्रशिक्षण संस्थांसाठी: पारदर्शक कामगिरी पडताळणी, गुणवत्तेवर आधारित निधी आणि रोजगार जोडणी.',
    'why.government': 'शासनासाठी: पुराव्यांवर आधारित निधी वाटप, बोगस प्लेसमेंटला आळा आणि अचूक धोरण आखणी.',

    // CTA
    'cta.title': 'आजच खरी उपजीविका मोजण्यास सुरुवात करा',
    'cta.desc': 'भारताच्या आउटकम इंटेलिजन्स उपक्रमात सामील व्हा आणि केवळ प्लेसमेंट दाखवण्याऐवजी शाश्वत आजीविका निर्माण करा.',
    'cta.student': 'प्रशिक्षार्थी लॉगिन',
    'cta.gov': 'शासकीय अधिकारी लॉगिन',
    'cta.admin': 'अ‍ॅडमिन कन्सोल',

    // Footer
    'footer.dept': 'कौशल्य विकास आणि उद्योजकता मंत्रालय (MSDE)',
    'footer.gov': 'भारत सरकार',
    'footer.partner': 'तांत्रिक अंमलबजावणी: राष्ट्रीय माहिती विज्ञान केंद्र (NIC)',
    'footer.dpdpNotice': 'डिजिटल वैयक्तिक डेटा संरक्षण (DPDP) कायदा २०२३ नुसार • कलम २० प्रोटोकॉल सक्रिय',
    'footer.rights': '© २०२६ स्किल सारथी. सर्व हक्क राखीव.',

    // Common Portal Labels
    'portal.theme': 'थीम',
    'portal.lang': 'भाषा',
    'portal.light': 'लाइट',
    'portal.dark': 'डार्क',
    'portal.signOut': 'लॉग आउट',
    'portal.demoWatermark': 'डेमो / सिंथेटिक डेटा (कलम २० प्रोटोकॉल)',
    'portal.verified': 'पडताळणीकृत',
    'portal.review': 'पुनरावलोकन आवश्यक',
    'portal.unverified': 'अपडताळणीकृत',
  },
};

