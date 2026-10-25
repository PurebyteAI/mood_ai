/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, Emotion, AcademicContext, PreferredStyle } from '../types';

export interface Translations {
  appName: string;
  nav: {
    overview: string;
    reflect: string;
    summary: string;
    privacy: string;
    support: string;
    settings: string;
    startReflection: string;
    viewSummary: string;
    newMirror: string;
  };
  settings: {
    title: string;
    subtitle: string;
    appearance: string;
    appearanceDesc: string;
    themeLight: string;
    themeLightDesc: string;
    themeDark: string;
    themeDarkDesc: string;
    themeRomantic: string;
    themeRomanticDesc: string;
    language: string;
    languageDesc: string;
    close: string;
    heartsEffect: string;
  };
  landing: {
    campusPreset: string;
    heroTitle: string;
    heroSubtitle: string;
    noLogin: string;
    zeroStorage: string;
    wipedOnClose: string;
    openMirror: string;
    readPromise: string;
    academicQuote: string;
    threeWays: string;
    threeWaysSubtitle: string;
    writeTitle: string;
    writeDesc: string;
    writeCta: string;
    drawTitle: string;
    drawDesc: string;
    drawCta: string;
    talkTitle: string;
    talkDesc: string;
    talkCta: string;
    situationsTitle: string;
    situationsSubtitle: string;
    sitExamTitle: string;
    sitExamDesc: string;
    sitExamOffer: string;
    sitDeadlineTitle: string;
    sitDeadlineDesc: string;
    sitDeadlineOffer: string;
    sitGroupTitle: string;
    sitGroupDesc: string;
    sitGroupOffer: string;
    sitPresTitle: string;
    sitPresDesc: string;
    sitPresOffer: string;
    privacyHeading: string;
    privacyLead: string;
    privacyRule1: string;
    privacyRule2: string;
    privacyRule3: string;
    privacyRule4: string;
    inspectDoc: string;
    readyTitle: string;
    readySubtitle: string;
    startCta: string;
  };
  context: {
    step1: string;
    title: string;
    subtitle: string;
    toneTitle: string;
    toneStored: string;
    step2: string;
    modeTitle: string;
    needHelp: string;
  };
  contexts: Record<AcademicContext, { title: string; subtitle: string }>;
  styles: Record<PreferredStyle, { label: string; desc: string }>;
  write: {
    back: string;
    title: string;
    subtitle: string;
    spark: string;
    placeholder: string;
    chars: string;
    reflecting: string;
    reflectNow: string;
    inTransit: string;
  };
  draw: {
    back: string;
    title: string;
    subtitle: string;
    fine: string;
    medium: string;
    heavy: string;
    undo: string;
    clear: string;
    interpreting: string;
    submit: string;
    specs: string;
  };
  talk: {
    back: string;
    title: string;
    subtitle: string;
    micIdle: string;
    startSpeaking: string;
    pauseMic: string;
    status: string;
    transcriptLabel: string;
    editable: string;
    placeholder: string;
    reflectVoice: string;
    thinking: string;
  };
  result: {
    complete: string;
    reading: string;
    disclaimer: string;
    newReflection: string;
    summaryCta: string;
    dominantFeeling: string;
    listen: string;
    copy: string;
    copied: string;
    exportPng: string;
    visualizeArt: string;
    visualizeSubtitle: string;
    generateArt: string;
    generating: string;
    downloadArt: string;
    talkHuman: string;
  };
  summary: {
    visitMemory: string;
    title: string;
    subtitle: string;
    newReflection: string;
    exportPdf: string;
    clearSession: string;
    emptyTitle: string;
    emptyDesc: string;
    startFirst: string;
    reflectionsCount: string;
    latestDominant: string;
    stressTrajectory: string;
    calmnessShift: string;
    chartTitle: string;
    chartSubtitle: string;
    tabAll: string;
    tabStressCalm: string;
    tabAverages: string;
    galleryTitle: string;
    chronoTitle: string;
    wipeNotice: string;
  };
  emotions: Record<Emotion, string>;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'AI Mood Mirror',
    nav: {
      overview: 'Overview',
      reflect: 'Reflect',
      summary: 'Session Summary',
      privacy: 'Zero-Data Privacy',
      support: 'Need Support?',
      settings: 'Settings',
      startReflection: 'Start Reflection',
      viewSummary: 'View Summary',
      newMirror: 'New Mirror',
    },
    settings: {
      title: 'Preferences & Appearance',
      subtitle: 'Customize themes and interface language. Stored only in this visit.',
      appearance: 'Appearance & Theme',
      appearanceDesc: 'Choose your preferred visual atmosphere.',
      themeLight: 'Mindful Light',
      themeLightDesc: 'Calm academic stone and warm amber tones.',
      themeDark: 'Obsidian Dark',
      themeDarkDesc: 'Gentle on tired eyes during late-night study crunches.',
      themeRomantic: 'Romantic Rose',
      themeRomanticDesc: 'Pastel blush pink with sweet floating heart accents.',
      language: 'Language',
      languageDesc: 'Choose your preferred language for interface and AI reflections.',
      close: 'Save & Close',
      heartsEffect: 'Romantic heart animations active',
    },
    landing: {
      campusPreset: 'Campus Preset:',
      heroTitle: 'Pause. Reflect. Find your way.',
      heroSubtitle: 'A little space to understand your feelings, untangle your thoughts, and reconnect with yourself.',
      noLogin: 'No Login or Email',
      zeroStorage: 'Zero Data Stored on Server',
      wipedOnClose: 'Tab Wiped on Close',
      openMirror: 'Open the Mirror',
      readPromise: 'Read Zero-Storage Promise',
      academicQuote: '"When finals loom and sleep slips away, five minutes of naming the feeling brings steady ground."',
      threeWays: 'Three Ways to Express',
      threeWaysSubtitle: 'No forced forms or rigid questionnaires. Express your internal state however it comes out.',
      writeTitle: 'Write & Dictate',
      writeDesc: 'Type thoughts or dictate out loud with live speech-to-text. Vent about test panic, deadlines, or burnout.',
      writeCta: 'Express & Reflect',
      drawTitle: 'Sketch & Draw',
      drawDesc: 'Too tangled for words? Draw with tactile mood inks. The Mirror interprets visual pressure, stroke chaos, and tone.',
      drawCta: 'Open Canvas',
      talkTitle: '1-to-1 Voice Companion',
      talkDesc: 'Speak naturally with a calm, supportive peer friend. Turn-aware listening, cognitive reframing, and tiny study resets.',
      talkCta: 'Talk with Companion',
      situationsTitle: 'Academic Grounding',
      situationsSubtitle: 'We focus on the specific academic pressures that universities rarely give students space to voice.',
      sitExamTitle: 'Exam Period Pressure',
      sitExamDesc: 'Revision fatigue, blanking during prep, sleep loss, and panic before midterms or finals.',
      sitExamOffer: 'Mirror offers: Calming reflection & 5-min break tip',
      sitDeadlineTitle: '11:59 PM Deadline Crunch',
      sitDeadlineDesc: 'Unfinished term papers, code compiling errors at 2 AM, and runaway academic impostor syndrome.',
      sitDeadlineOffer: 'Mirror offers: Reset perspective & stress demystification',
      sitGroupTitle: 'Group Project Friction',
      sitGroupDesc: 'Carrying the entire workload, unresponsive teammates, and frustrating communication breakdowns.',
      sitGroupOffer: 'Mirror offers: Neutral venting space & assertiveness prompt',
      sitPresTitle: 'Defense & Stage Fright',
      sitPresDesc: 'Shaky voice, racing heart before speaking in front of professors, or symposium jitters.',
      sitPresOffer: 'Mirror offers: Grounding breathing cadence & quiet boost',
      privacyHeading: 'Nothing you write, sketch, or say is ever saved.',
      privacyLead: 'Most mental health and journaling apps monetize vulnerability by creating persistent profiles and databases. AI Mood Mirror is built on an inverse philosophy:',
      privacyRule1: 'No database exists on the server. There is literally nowhere for text or sketches to be saved.',
      privacyRule2: 'Zero third-party trackers or cookies. No Google Analytics, no Facebook pixels, no advertising beacons.',
      privacyRule3: 'RAM-only processing. Input is analyzed in transit and discarded the moment the response is returned.',
      privacyRule4: 'Tab closes, everything vanishes. Session trends exist exclusively in temporary browser tab memory.',
      inspectDoc: 'Inspect technical privacy documentation →',
      readyTitle: 'Ready for a moment of quiet perspective?',
      readySubtitle: 'No sign up. No email. Open the mirror, express what is weighing on you, and receive an honest reading in seconds.',
      startCta: 'Start Student Reflection',
    },
    context: {
      step1: 'Step 1: Frame Your Reflection',
      title: 'Pause. Reflect. Find your way.',
      subtitle: 'A little space to understand your feelings, untangle your thoughts, and reconnect with yourself.',
      toneTitle: 'Preferred Reflection Tone',
      toneStored: 'Stored only in current tab',
      step2: 'Step 2: Choose Mode',
      modeTitle: 'How would you like to express?',
      needHelp: 'Need immediate support?',
    },
    contexts: {
      exam: { title: 'Exam Period', subtitle: 'Revising, test anxiety, burnout, sleep loss' },
      deadline: { title: 'Deadline Crunch', subtitle: 'Essays, coding projects, thesis submissions' },
      group: { title: 'Group Project', subtitle: 'Unequal workload, team friction, ghosting' },
      presentation: { title: 'Presentation Nerves', subtitle: 'Public speaking, oral defense, stage jitters' },
      general: { title: 'General Study Life', subtitle: 'Motivation dips, imposter syndrome, daily grind' },
    },
    styles: {
      study_tip: { label: 'Study Break Tip', desc: 'A 5-min restorative action' },
      poem: { label: 'Poetic Reflection', desc: 'Short, abstract & grounding' },
      motivation: { label: 'Gentle Encouragement', desc: 'Warm without toxic positivity' },
      humor: { label: 'Relatable Student Wit', desc: 'Gentle university humor' },
      surprise: { label: 'Surprise Me', desc: 'Let the Mirror adapt' },
    },
    write: {
      back: 'Back to Context & Modes',
      title: 'Write freely. Nothing is judged.',
      subtitle: 'Pour out your thoughts, frustration, exhaustion, or doubts. Your raw words are never saved.',
      spark: 'Need a spark? Click a student thought:',
      placeholder: 'What is going on with your studies right now? Be as raw and honest as you need...',
      chars: 'characters',
      reflecting: 'Reflecting...',
      reflectNow: 'Reflect Now',
      inTransit: 'All text travels in transit memory only and disappears after reflection.',
    },
    draw: {
      back: 'Back to Context & Modes',
      title: 'Sketch what words cannot hold.',
      subtitle: 'Scribble the weight of the deadline, dark tangled knots, or smooth flowing strokes.',
      fine: 'Fine',
      medium: 'Medium',
      heavy: 'Heavy',
      undo: 'Undo stroke',
      clear: 'Clear sketch',
      interpreting: 'Interpreting Visual Energy...',
      submit: 'Reflect on Sketch',
      specs: 'Exported as 512×512 PNG · Sent in-flight only',
    },
    talk: {
      back: 'Back to Context & Modes',
      title: 'Talk to the Mirror.',
      subtitle: 'Audio is processed live in memory and never saved or egressed. Speak aloud to unburden your thoughts.',
      micIdle: 'Microphone idle. Click Start below to begin speaking.',
      startSpeaking: 'Start Speaking',
      pauseMic: 'Pause Microphone',
      status: 'Status:',
      transcriptLabel: 'Live Transcript (or type directly):',
      editable: 'Editable',
      placeholder: 'Listening to your voice... start speaking freely...',
      reflectVoice: 'Reflect on Voice',
      thinking: 'Interpreting Spoken Reflection...',
    },
    result: {
      complete: 'Reflection Complete',
      reading: "The Mirror's Reading",
      disclaimer: 'Honest reflection estimates grounded in academic life · Never a medical or diagnostic measurement',
      newReflection: 'New Reflection',
      summaryCta: 'Session Summary',
      dominantFeeling: 'Dominant Feeling',
      listen: 'Listen to reflection spoken gently',
      copy: 'Copy reflection',
      copied: 'Copied',
      exportPng: 'Export PNG Card',
      visualizeArt: 'Visualize Mood Art',
      visualizeSubtitle: 'Transform your emotional wavelength into an abstract fine-art card.',
      generateArt: 'Generate Art',
      generating: 'Generating...',
      downloadArt: 'Download full-resolution art PNG →',
      talkHuman: 'Need to talk with a human counselor?',
    },
    summary: {
      visitMemory: 'Current Visit Memory',
      title: 'Session Summary & Emotional Trajectory',
      subtitle: 'Held in temporary browser memory',
      newReflection: 'New Reflection',
      exportPdf: 'Export PDF',
      clearSession: 'Clear Session',
      emptyTitle: 'No reflections in current session',
      emptyDesc: 'Take a moment to write, sketch, or speak what is on your mind. The Mirror will chart your emotional shift over time.',
      startFirst: 'Start First Reflection',
      reflectionsCount: 'Reflections',
      latestDominant: 'Latest Dominant',
      stressTrajectory: 'Stress Trajectory',
      calmnessShift: 'Calmness Shift',
      chartTitle: 'Emotional Progression Visualizer',
      chartSubtitle: 'Recharts-powered trajectory tracking shifts across reflection turns',
      tabAll: 'All Emotions',
      tabStressCalm: 'Stress vs. Calm',
      tabAverages: 'Session Averages',
      galleryTitle: 'Visit Mood Art Gallery',
      chronoTitle: 'Chronological Reflections',
      wipeNotice: 'Closing this tab or refreshing completely wipes this session.',
    },
    emotions: {
      happiness: 'Happiness',
      sadness: 'Sadness',
      stress: 'Academic Stress',
      calmness: 'Calmness',
      anger: 'Frustration / Anger',
      curiosity: 'Curiosity / Drive',
    },
  },

  fr: {
    appName: 'Miroir d’Humeur IA',
    nav: {
      overview: 'Présentation',
      reflect: 'Réfléchir',
      summary: 'Bilan de session',
      privacy: 'Confidentialité Zéro Donnée',
      support: 'Besoin d’aide ?',
      settings: 'Paramètres',
      startReflection: 'Commencer',
      viewSummary: 'Voir le bilan',
      newMirror: 'Nouveau miroir',
    },
    settings: {
      title: 'Préférences et Apparence',
      subtitle: 'Personnalisez le thème et la langue. Conservé uniquement durant cette visite.',
      appearance: 'Thème et Apparence',
      appearanceDesc: 'Choisissez votre ambiance visuelle préférée.',
      themeLight: 'Clair Apaisant',
      themeLightDesc: 'Nuances chaleureuses de pierre et d’ambre académique.',
      themeDark: 'Obsidienne Sombre',
      themeDarkDesc: 'Doux pour les yeux pendant les révisions tardives.',
      themeRomantic: 'Rose Romantique',
      themeRomanticDesc: 'Rose pastel poudré avec de doux cœurs flottants.',
      language: 'Langue de l’interface',
      languageDesc: 'Sélectionnez votre langue pour l’application et les réflexions IA.',
      close: 'Enregistrer et Fermer',
      heartsEffect: 'Effet de petits cœurs romantiques actif',
    },
    landing: {
      campusPreset: 'Campus universitaire :',
      heroTitle: 'Pause. Réfléchissez. Trouvez votre voie.',
      heroSubtitle: 'Un petit espace pour comprendre vos émotions, démêler vos pensées et vous reconnecter avec vous-même.',
      noLogin: 'Sans Inscription ni Email',
      zeroStorage: 'Zéro Donnée Conservée sur Serveur',
      wipedOnClose: 'Onglet Effacé à la Fermeture',
      openMirror: 'Ouvrir le Miroir',
      readPromise: 'Lire l’Engagement de Confidentialité',
      academicQuote: '« Quand les partiels approchent et que le sommeil fuit, cinq minutes pour nommer ce que l’on ressent offrent un vrai ancrage. »',
      threeWays: 'Trois Façons de s’Exprimer',
      threeWaysSubtitle: 'Aucun questionnaire rigide. Exprimez votre état intérieur avec spontanéité.',
      writeTitle: 'Écrire Librement',
      writeDesc: 'Déversez jusqu’à 1 000 caractères. Parlez du partenaire inefficace, de la panique d’un partiel ou du blocage.',
      writeCta: 'Commencer à écrire',
      drawTitle: 'Esquisser le Ressenti',
      drawDesc: 'Trop confus pour des mots ? Dessinez avec nos encres d’ambiance. Le Miroir analyse la dynamique des traits.',
      drawCta: 'Ouvrir la toile',
      talkTitle: 'Parler au Miroir',
      talkDesc: 'Extériorisez à voix haute avant une soutenance. Onde sonore en direct et réponse vocale.',
      talkCta: 'Commencer à parler',
      situationsTitle: 'Ancrage Académique',
      situationsSubtitle: 'Pensé pour les réalités étudiantes que l’université écoute trop peu.',
      sitExamTitle: 'Période de Partiels',
      sitExamDesc: 'Fatigue des révisions, trou noir, manque de sommeil et stress des examens.',
      sitExamOffer: 'Le Miroir offre : Réflexion apaisante et pause de 5 min',
      sitDeadlineTitle: 'Bouclage de Minuit',
      sitDeadlineDesc: 'Rapports inachevés, erreurs de compilation à 2h du matin et syndrome de l’imposteur.',
      sitDeadlineOffer: 'Le Miroir offre : Prise de recul et dédramatisation',
      sitGroupTitle: 'Friction en Groupe',
      sitGroupDesc: 'Porter tout le travail sur ses épaules, coéquipiers silencieux et incompréhensions.',
      sitGroupOffer: 'Le Miroir offre : Espace de décharge et pistes d’affirmation',
      sitPresTitle: 'Trac de Soutenance',
      sitPresDesc: 'Voix tremblante et palpitations avant de s’exprimer devant un jury.',
      sitPresOffer: 'Le Miroir offre : Cadence de respiration et encouragement',
      privacyHeading: 'Rien de ce que vous écrivez, dessinez ou dites n’est conservé.',
      privacyLead: 'Contrairement aux applications qui monétisent vos vulnérabilités, nous reposons sur une règle absolue :',
      privacyRule1: 'Aucune base de données sur nos serveurs. Nulle part où stocker vos textes.',
      privacyRule2: 'Zéro traceurs ou cookies tiers. Pas de pixels publicitaires.',
      privacyRule3: 'Traitement uniquement en mémoire vive (RAM) durant la requête, puis effacement.',
      privacyRule4: 'Dès que l’onglet se ferme, tout disparaît immédiatement.',
      inspectDoc: 'Consulter la documentation technique de confidentialité →',
      readyTitle: 'Prêt pour un instant de recul ?',
      readySubtitle: 'Sans compte ni inscription. Ouvrez le miroir et partagez ce qui pèse.',
      startCta: 'Démarrer la réflexion étudiante',
    },
    context: {
      step1: 'Étape 1 : Poser le contexte',
      title: 'Pause. Réfléchissez. Trouvez votre voie.',
      subtitle: 'Un petit espace pour comprendre vos émotions, démêler vos pensées et vous reconnecter avec vous-même.',
      toneTitle: 'Tonalité souhaitée',
      toneStored: 'Conservé uniquement dans cet onglet',
      step2: 'Étape 2 : Choisir le mode',
      modeTitle: 'Comment préférez-vous vous exprimer ?',
      needHelp: 'Besoin d’aide immédiate ?',
    },
    contexts: {
      exam: { title: 'Période d’Examens', subtitle: 'Révisions, angoisse des tests, sommeil perturbé' },
      deadline: { title: 'Date Limite Imminente', subtitle: 'Mémoires, code à rendre, soumissions urgentes' },
      group: { title: 'Projet de Groupe', subtitle: 'Charge inégale, coéquipiers absents, tensions' },
      presentation: { title: 'Trac de Présentation', subtitle: 'Prise de parole, soutenance orale, trac' },
      general: { title: 'Vie Étudiante Générale', subtitle: 'Baisse de motivation, doute de soi, routine' },
    },
    styles: {
      study_tip: { label: 'Conseil de Pause', desc: 'Une micro-action de 5 min' },
      poem: { label: 'Reflet Poétique', desc: 'Court, abstrait et apaisant' },
      motivation: { label: 'Encouragement Doux', desc: 'Bienveillance sans positivité toxique' },
      humor: { label: 'Humour Étudiant', desc: 'Complicité universitaire bienveillante' },
      surprise: { label: 'Surprenez-moi', desc: 'Le Miroir choisit le meilleur ton' },
    },
    write: {
      back: 'Retour aux modes',
      title: 'Écrivez librement. Sans jugement.',
      subtitle: 'Exprimez vos doutes, votre fatigue ou votre colère. Vos mots bruts ne sont jamais enregistrés.',
      spark: 'Besoin d’une inspiration ? Cliquez sur une phrase :',
      placeholder: 'Que traversez-vous dans vos études en ce moment ? Soyez aussi spontané que nécessaire...',
      chars: 'caractères',
      reflecting: 'Réflexion en cours...',
      reflectNow: 'Réfléchir maintenant',
      inTransit: 'Tout le texte transite en mémoire éphémère et disparaît après réflexion.',
    },
    draw: {
      back: 'Retour aux modes',
      title: 'Dessinez ce que les mots ne disent pas.',
      subtitle: 'Gribouillez le poids de la date limite, des nœuds sombres ou des traits fluides.',
      fine: 'Fin',
      medium: 'Moyen',
      heavy: 'Épais',
      undo: 'Annuler le trait',
      clear: 'Effacer la toile',
      interpreting: 'Lecture de l’énergie visuelle...',
      submit: 'Réfléchir sur le dessin',
      specs: 'Exporté en PNG 512×512 · Traité en vol uniquement',
    },
    talk: {
      back: 'Retour aux modes',
      title: 'Parlez au Miroir.',
      subtitle: 'Le son est analysé en direct dans la mémoire vive, jamais enregistré. Soulagez votre esprit.',
      micIdle: 'Microphone inactif. Cliquez ci-dessous pour parler.',
      startSpeaking: 'Activer le micro',
      pauseMic: 'Mettre en pause',
      status: 'Statut :',
      transcriptLabel: 'Transcription en direct (ou tapez au clavier) :',
      editable: 'Modifiable',
      placeholder: 'À votre écoute... parlez librement...',
      reflectVoice: 'Réfléchir sur la voix',
      thinking: 'Interprétation en cours...',
    },
    result: {
      complete: 'Réflexion Terminée',
      reading: 'La Lecture du Miroir',
      disclaimer: 'Estimations bienveillantes pour les études · Ne remplace pas un avis médical ou psychologique',
      newReflection: 'Nouvelle Réflexion',
      summaryCta: 'Bilan de Session',
      dominantFeeling: 'Émotion Dominante',
      listen: 'Écouter la réflexion à voix haute',
      copy: 'Copier le texte',
      copied: 'Copié !',
      exportPng: 'Exporter la Carte PNG',
      visualizeArt: 'Art Visuel Émotionnel',
      visualizeSubtitle: 'Transformez votre onde émotionnelle en œuvre abstraite.',
      generateArt: 'Générer l’Œuvre',
      generating: 'Création...',
      downloadArt: 'Télécharger le visuel PNG →',
      talkHuman: 'Besoin de parler à un professionnel ?',
    },
    summary: {
      visitMemory: 'Mémoire de la Visite Actuelle',
      title: 'Bilan de Session et Trajectoire Émotionnelle',
      subtitle: 'Conservé uniquement dans la mémoire temporaire de cet onglet',
      newReflection: 'Nouvelle Réflexion',
      exportPdf: 'Exporter en PDF',
      clearSession: 'Effacer la Session',
      emptyTitle: 'Aucune réflexion dans cette session',
      emptyDesc: 'Prenez quelques minutes pour écrire, dessiner ou parler. Le Miroir retracera votre évolution.',
      startFirst: 'Démarrer la première réflexion',
      reflectionsCount: 'Réflexions',
      latestDominant: 'Dernière Dominante',
      stressTrajectory: 'Tendance du Stress',
      calmnessShift: 'Gain de Sérénité',
      chartTitle: 'Visualiseur de Progression Émotionnelle',
      chartSubtitle: 'Suivi dynamique des ressentis tout au long de la session',
      tabAll: 'Toutes les Émotions',
      tabStressCalm: 'Stress vs Sérénité',
      tabAverages: 'Moyennes de Session',
      galleryTitle: 'Galerie d’Art de la Visite',
      chronoTitle: 'Historique Chronologique',
      wipeNotice: 'Fermer ou actualiser cet onglet effacera définitivement cette session.',
    },
    emotions: {
      happiness: 'Joie / Soulagement',
      sadness: 'Mélancolie',
      stress: 'Stress Académique',
      calmness: 'Sérénité',
      anger: 'Frustration / Colère',
      curiosity: 'Curiosité / Élan',
    },
  },

  it: {
    appName: 'Specchio d’Umore IA',
    nav: {
      overview: 'Panoramica',
      reflect: 'Rifletti',
      summary: 'Riepilogo Sessione',
      privacy: 'Zero Dati Salvati',
      support: 'Serve Aiuto?',
      settings: 'Impostazioni',
      startReflection: 'Inizia Riflessione',
      viewSummary: 'Vedi Riepilogo',
      newMirror: 'Nuovo Specchio',
    },
    settings: {
      title: 'Preferenze e Aspetto',
      subtitle: 'Personalizza il tema e la lingua. Attivo solo per questa sessione.',
      appearance: 'Aspetto e Tema',
      appearanceDesc: 'Scegli la tua atmosfera visiva preferita.',
      themeLight: 'Luce Serena',
      themeLightDesc: 'Tonalità calde di pietra e ambra accademica.',
      themeDark: 'Ossidiana Notturna',
      themeDarkDesc: 'Ideale per non affaticare la vista durante lo studio a tarda notte.',
      themeRomantic: 'Rosa Romantico',
      themeRomanticDesc: 'Rosa pastello cipria con teneri cuori fluttuanti.',
      language: 'Lingua dell’interfaccia',
      languageDesc: 'Scegli la lingua per l’interfaccia e le risposte del modello IA.',
      close: 'Salva e Chiudi',
      heartsEffect: 'Effetto cuori romantici attivo',
    },
    landing: {
      campusPreset: 'Campus Universitario:',
      heroTitle: 'Pausa. Rifletti. Trova la tua strada.',
      heroSubtitle: 'Un piccolo spazio per comprendere i tuoi sentimenti, districare i tuoi pensieri e riconnetterti con te stesso.',
      noLogin: 'Nessun Account o Email',
      zeroStorage: 'Nessun Dato Salvato sul Server',
      wipedOnClose: 'Cancellato alla Chiusura',
      openMirror: 'Apri lo Specchio',
      readPromise: 'Leggi il Patto di Riservatezza',
      academicQuote: '«Quando la sessione si avvicina e il sonno manca, cinque minuti per dare un nome a ciò che provi donano lucidità.»',
      threeWays: 'Tre Modi per Esprimerti',
      threeWaysSubtitle: 'Nessun modulo rigido. Esprimi il tuo stato interiore con totale naturalezza.',
      writeTitle: 'Scrivi a Parole Tue',
      writeDesc: 'Scrivi fino a 1.000 caratteri. Sfogati sui colleghi assenti o sul panico prima dell’esame.',
      writeCta: 'Inizia a scrivere',
      drawTitle: 'Disegna l’Emozione',
      drawDesc: 'Troppo confuso per le parole? Disegna con i nostri inchiostri emotivi. Lo Specchio legge il tratto.',
      drawCta: 'Apri la tela',
      talkTitle: 'Parla allo Specchio',
      talkDesc: 'Esercitati prima di un esame orale o presentazione. Forma d’onda audio dal vivo e risposta vocale.',
      talkCta: 'Inizia a parlare',
      situationsTitle: 'Contesti di Studio',
      situationsSubtitle: 'Dedicato alle pressioni accademiche reali degli studenti universitari.',
      sitExamTitle: 'Sessione d’Esami',
      sitExamDesc: 'Fatica da ripasso, vuoti di memoria, insonnia e ansia da prestazione.',
      sitExamOffer: 'Lo Specchio offre: Calma interiore e pausa rigenerante di 5 min',
      sitDeadlineTitle: 'Consegna a Mezzanotte',
      sitDeadlineDesc: 'Codice che non compila alle due di notte e sindrome dell’impostore.',
      sitDeadlineOffer: 'Lo Specchio offre: Nuova prospettiva e distensione',
      sitGroupTitle: 'Progetti di Gruppo',
      sitGroupDesc: 'Portare avanti tutto il carico da soli e colleghi che spariscono.',
      sitGroupOffer: 'Lo Specchio offre: Sfogatoio neutrale e chiarezza',
      sitPresTitle: 'Ansia da Presentazione',
      sitPresDesc: 'Voce tremula e batticuore prima di parlare davanti ai docenti.',
      sitPresOffer: 'Lo Specchio offre: Respirazione guidata e fiducia',
      privacyHeading: 'Nulla di ciò che scrivi, disegni o dici viene salvato.',
      privacyLead: 'A differenza delle app che monetizzano la vulnerabilità, la nostra architettura garantisce:',
      privacyRule1: 'Nessun database sul server. È fisicamente impossibile registrare i tuoi testi.',
      privacyRule2: 'Nessun cookie pubblicitario o tracciatore di terze parti.',
      privacyRule3: 'Elaborazione solo in memoria volatile (RAM), scartata dopo la risposta.',
      privacyRule4: 'Chiudendo la scheda del browser, tutto scompare per sempre.',
      inspectDoc: 'Consulta la documentazione di privacy tecnica →',
      readyTitle: 'Pronto per un momento di riflessione sincera?',
      readySubtitle: 'Senza registrazioni. Apri lo specchio e alleggerisci la mente in pochi secondi.',
      startCta: 'Inizia Riflessione',
    },
    context: {
      step1: 'Fase 1: Inquadra il contesto',
      title: 'Pausa. Rifletti. Trova la tua strada.',
      subtitle: 'Un piccolo spazio per comprendere i tuoi sentimenti, districare i tuoi pensieri e riconnetterti con te stesso.',
      toneTitle: 'Tono desiderato',
      toneStored: 'Conservato solo per questa scheda',
      step2: 'Fase 2: Scegli la modalità',
      modeTitle: 'Come vuoi esprimerti?',
      needHelp: 'Serve aiuto urgente?',
    },
    contexts: {
      exam: { title: 'Sessione Esami', subtitle: 'Studio intenso, ansia da test, stanchezza' },
      deadline: { title: 'Scadenza Imminente', subtitle: 'Tesi, progetti di codice, consegne urgenti' },
      group: { title: 'Lavoro di Gruppo', subtitle: 'Carico squilibrato, attriti tra colleghi' },
      presentation: { title: 'Ansia da Esposizione', subtitle: 'Esami orali, presentazioni in aula' },
      general: { title: 'Vita Universitaria', subtitle: 'Calo di motivazione, insicurezza, routine' },
    },
    styles: {
      study_tip: { label: 'Consiglio di Pausa', desc: 'Azione rigenerante di 5 min' },
      poem: { label: 'Riflesso Poetico', desc: 'Breve, astratto e distensivo' },
      motivation: { label: 'Incoraggiamento Dolce', desc: 'Calore senza ottimismo tossico' },
      humor: { label: 'Ironia Universitaria', desc: 'Spirito studentesco leggero' },
      surprise: { label: 'Sorprendimi', desc: 'Lo Specchio sceglie il tono migliore' },
    },
    write: {
      back: 'Torna ai contesti',
      title: 'Scrivi liberamente. Nessun giudizio.',
      subtitle: 'Riversa dubbi, sfinimento o sfoghi. I tuoi testi non vengono mai salvati.',
      spark: 'Serve uno spunto? Clicca un pensiero:',
      placeholder: 'Cosa sta accadendo con i tuoi studi in questo momento? Esprimiti con totale sincerità...',
      chars: 'caratteri',
      reflecting: 'Riflessione in corso...',
      reflectNow: 'Rifletti Ora',
      inTransit: 'Tutti i testi transitano solo in RAM e svaniscono subito dopo.',
    },
    draw: {
      back: 'Torna ai contesti',
      title: 'Disegna ciò che le parole non sanno dire.',
      subtitle: 'Traccia la pressione delle scadenze, grovigli o linee serene.',
      fine: 'Sottile',
      medium: 'Medio',
      heavy: 'Marcato',
      undo: 'Annulla tratto',
      clear: 'Pulisci tela',
      interpreting: 'Lettura dell’energia visiva...',
      submit: 'Rifletti sul disegno',
      specs: 'Esportato in PNG 512×512 · Solo in transito',
    },
    talk: {
      back: 'Torna ai contesti',
      title: 'Parla allo Specchio.',
      subtitle: 'L’audio è elaborato dal vivo in memoria e mai archiviato. Dai voce ai pensieri.',
      micIdle: 'Microfono inattivo. Clicca sotto per parlare.',
      startSpeaking: 'Inizia a Parlare',
      pauseMic: 'Metti in Pausa',
      status: 'Stato:',
      transcriptLabel: 'Trascrizione dal vivo (o digita):',
      editable: 'Modificabile',
      placeholder: 'In ascolto... parla pure liberamente...',
      reflectVoice: 'Rifletti sulla voce',
      thinking: 'Elaborazione in corso...',
    },
    result: {
      complete: 'Riflessione Completata',
      reading: 'La Lettura dello Specchio',
      disclaimer: 'Stima indicativa per il benessere di studio · Non costituisce diagnosi medica o clinica',
      newReflection: 'Nuova Riflessione',
      summaryCta: 'Riepilogo Sessione',
      dominantFeeling: 'Emozione Principale',
      listen: 'Ascolta la riflessione a voce',
      copy: 'Copia riflessione',
      copied: 'Copiato!',
      exportPng: 'Esporta Cartolina PNG',
      visualizeArt: 'Arte Emotiva Astratta',
      visualizeSubtitle: 'Trasforma la tua vibrazione emotiva in un’opera d’arte.',
      generateArt: 'Genera Arte',
      generating: 'Creazione...',
      downloadArt: 'Scarica l’immagine PNG →',
      talkHuman: 'Vuoi parlare con un professionista dell’ateneo?',
    },
    summary: {
      visitMemory: 'Memoria della Visita Corrente',
      title: 'Riepilogo Sessione e Traiettoria Emotiva',
      subtitle: 'Conservato solo nella scheda temporanea del browser',
      newReflection: 'Nuova Riflessione',
      exportPdf: 'Esporta PDF',
      clearSession: 'Azzera Sessione',
      emptyTitle: 'Nessuna riflessione in questa sessione',
      emptyDesc: 'Prenditi un attimo per scrivere, disegnare o parlare. Lo Specchio traccerà l’evoluzione dei tuoi stati d’animo.',
      startFirst: 'Inizia la prima riflessione',
      reflectionsCount: 'Riflessioni',
      latestDominant: 'Ultima Dominante',
      stressTrajectory: 'Andamento Stress',
      calmnessShift: 'Guadagno di Calma',
      chartTitle: 'Grafico di Progressione Emotiva',
      chartSubtitle: 'Monitoraggio Recharts dei cambiamenti interiori',
      tabAll: 'Tutte le Emozioni',
      tabStressCalm: 'Stress vs Calma',
      tabAverages: 'Medie di Sessione',
      galleryTitle: 'Galleria d’Arte della Visita',
      chronoTitle: 'Cronologia Riflessioni',
      wipeNotice: 'Chiudere o aggiornare questa scheda cancellerà del tutto i dati.',
    },
    emotions: {
      happiness: 'Sollievo / Gioia',
      sadness: 'Malinconia',
      stress: 'Stress da Studio',
      calmness: 'Tranquillità',
      anger: 'Frustrazione / Rabbia',
      curiosity: 'Curiosità / Slancio',
    },
  },

  es: {
    appName: 'Espejo de Ánimo IA',
    nav: {
      overview: 'Inicio',
      reflect: 'Reflexionar',
      summary: 'Resumen de Sesión',
      privacy: 'Privacidad Cero Datos',
      support: '¿Necesitas Ayuda?',
      settings: 'Ajustes',
      startReflection: 'Empezar',
      viewSummary: 'Ver Resumen',
      newMirror: 'Nuevo Espejo',
    },
    settings: {
      title: 'Preferencias y Apariencia',
      subtitle: 'Personaliza temas y lengua de la interfaz. Activo solo durante esta sesión.',
      appearance: 'Apariencia y Tema',
      appearanceDesc: 'Elige tu ambientación visual favorita.',
      themeLight: 'Luz Serena',
      themeLightDesc: 'Tonos cálidos de piedra y ámbar académico.',
      themeDark: 'Obsidiana Oscura',
      themeDarkDesc: 'Descanso visual para noches largas de estudio y biblioteca.',
      themeRomantic: 'Rosa Romántico',
      themeRomanticDesc: 'Rosa pastel con encantadores corazones flotantes.',
      language: 'Idioma de la interfaz',
      languageDesc: 'Elige el idioma tanto para la aplicación como para los consejos de la IA.',
      close: 'Guardar y Cerrar',
      heartsEffect: 'Animación de corazones románticos activa',
    },
    landing: {
      campusPreset: 'Campus Universitario:',
      heroTitle: 'Pausa. Reflexiona. Encuentra tu camino.',
      heroSubtitle: 'Un pequeño espacio para comprender tus sentimientos, desenredar tus pensamientos y reconectar contigo mismo.',
      noLogin: 'Sin Registro ni Correo',
      zeroStorage: 'Cero Datos Guardados en Servidor',
      wipedOnClose: 'Pestaña Borrada al Salir',
      openMirror: 'Abrir el Espejo',
      readPromise: 'Leer Compromiso de Privacidad',
      academicQuote: '«Cuando los finales se acercan y el descanso escasea, cinco minutos para poner nombre a lo que sientes devuelven la serenidad.»',
      threeWays: 'Tres Formas de Expresarte',
      threeWaysSubtitle: 'Sin cuestionarios rígidos. Expresa tu mundo interior exactamente como surja.',
      writeTitle: 'Escríbelo',
      writeDesc: 'Vuelca hasta 1.000 caracteres. Desahógate sobre el compañero que no ayuda o el bloqueo con la tesis.',
      writeCta: 'Empezar a escribir',
      drawTitle: 'Dibuja el Sentimiento',
      drawDesc: '¿Demasiado enredado para palabras? Dibuja con nuestras tintas de ánimo. El Espejo lee la energía del trazo.',
      drawCta: 'Abrir lienzo',
      talkTitle: 'Habla con el Espejo',
      talkDesc: 'Desahógate en voz alta antes de una defensa o presentación. Onda de sonido en directo y voz empática.',
      talkCta: 'Empezar a hablar',
      situationsTitle: 'Realidades Académicas',
      situationsSubtitle: 'Enfocado en las tensiones reales de la vida estudiantil que pocas veces se escuchan.',
      sitExamTitle: 'Época de Exámenes',
      sitExamDesc: 'Agotamiento de temarios, mente en blanco, desvelos y angustia previa.',
      sitExamOffer: 'El Espejo ofrece: Calma mental y pauta de descanso de 5 min',
      sitDeadlineTitle: 'Entregas a las 23:59',
      sitDeadlineDesc: 'Trabajos sin terminar, código con errores a las 3 AM y síndrome del impostor.',
      sitDeadlineOffer: 'El Espejo ofrece: Perspectiva y alivio de presión',
      sitGroupTitle: 'Fricciones en Grupo',
      sitGroupDesc: 'Cargar con casi todo el proyecto y lidiar con miembros ausentes.',
      sitGroupOffer: 'El Espejo ofrece: Desahogo neutral y consejos asertivos',
      sitPresTitle: 'Miedo Escénico',
      sitPresDesc: 'Voz temblorosa y taquicardia antes de hablar frente a profesores.',
      sitPresOffer: 'El Espejo ofrece: Cadencia de respiración y serenidad',
      privacyHeading: 'Nada de lo que escribes, dibujas o dices se guarda.',
      privacyLead: 'A diferencia de apps que lucran con tus vulnerabilidades, nosotros aplicamos:',
      privacyRule1: 'No hay base de datos en el servidor. No existe lugar donde almacenar tus escritos.',
      privacyRule2: 'Cero rastreadores o cookies de terceros. Sin publicidad.',
      privacyRule3: 'Procesamiento solo en memoria RAM volátil, desechado al terminar.',
      privacyRule4: 'Al cerrar la pestaña, todo desaparece de forma instantánea.',
      inspectDoc: 'Revisar documentación técnica de privacidad →',
      readyTitle: '¿Listo para un momento de serenidad?',
      readySubtitle: 'Sin cuentas ni esperas. Abre el espejo y encuentra alivio en segundos.',
      startCta: 'Iniciar Reflexión',
    },
    context: {
      step1: 'Paso 1: Define tu situación',
      title: 'Pausa. Reflexiona. Encuentra tu camino.',
      subtitle: 'Un pequeño espacio para comprender tus sentimientos, desenredar tus pensamientos y reconectar contigo mismo.',
      toneTitle: 'Tono de respuesta preferido',
      toneStored: 'Guardado solo en esta pestaña',
      step2: 'Paso 2: Elige el modo',
      modeTitle: '¿Cómo prefieres expresarte?',
      needHelp: '¿Necesitas apoyo de urgencia?',
    },
    contexts: {
      exam: { title: 'Época de Exámenes', subtitle: 'Repaso exhaustivo, miedo a suspender, insomnio' },
      deadline: { title: 'Entrega Inminente', subtitle: 'Ensayos, programación, entregas de tesis' },
      group: { title: 'Trabajo en Grupo', subtitle: 'Carga desigual, falta de respuesta, malestar' },
      presentation: { title: 'Nervios de Exposición', subtitle: 'Hablar en público, defensa oral, ansiedad' },
      general: { title: 'Rutina Universitaria', subtitle: 'Baja motivación, dudas vocacionales, rutina' },
    },
    styles: {
      study_tip: { label: 'Consejo de Pausa', desc: 'Acción restaurativa de 5 min' },
      poem: { label: 'Reflejo Poético', desc: 'Breve, abstracto y reconfortante' },
      motivation: { label: 'Ánimo Cercano', desc: 'Acompañamiento sin positivismo tóxico' },
      humor: { label: 'Humor Universitario', desc: 'Ingenio estudiantil afable' },
      surprise: { label: 'Sorpréndeme', desc: 'El Espejo elegirá el mejor tono' },
    },
    write: {
      back: 'Volver a opciones',
      title: 'Escribe sin filtros. Nadie juzga.',
      subtitle: 'Descarga tus dudas, cansancio o frustración. Tus palabras nunca se almacenan.',
      spark: '¿Buscas una idea? Pulsa un pensamiento común:',
      placeholder: '¿Qué te preocupa de tus estudios ahora mismo? Exprésate con libertad total...',
      chars: 'caracteres',
      reflecting: 'Reflexionando...',
      reflectNow: 'Reflexionar Ahora',
      inTransit: 'El texto viaja solo en memoria en tránsito y se esfuma tras responder.',
    },
    draw: {
      back: 'Volver a opciones',
      title: 'Dibuja lo que cuesta decir con palabras.',
      subtitle: 'Garabatea el peso de la entrega, nudos oscuros o trazos de calma.',
      fine: 'Fino',
      medium: 'Medio',
      heavy: 'Grueso',
      undo: 'Deshacer trazo',
      clear: 'Borrar lienzo',
      interpreting: 'Interpretando energía visual...',
      submit: 'Reflexionar sobre el Boceto',
      specs: 'Exportado como PNG 512×512 · En vuelo únicamente',
    },
    talk: {
      back: 'Volver a opciones',
      title: 'Habla con el Espejo.',
      subtitle: 'El audio se procesa en directo en RAM y jamás se graba. Libera tu mente.',
      micIdle: 'Micrófono inactivo. Haz clic abajo para comenzar.',
      startSpeaking: 'Empezar a Hablar',
      pauseMic: 'Pausar Micrófono',
      status: 'Estado:',
      transcriptLabel: 'Transcripción en directo (o escribe aquí):',
      editable: 'Editable',
      placeholder: 'Escuchando tu voz... habla con calma...',
      reflectVoice: 'Reflexionar sobre la Voz',
      thinking: 'Interpretando audio...',
    },
    result: {
      complete: 'Reflexión Lista',
      reading: 'La Lectura del Espejo',
      disclaimer: 'Orientación empática para la vida académica · No es diagnóstico médico o psicológico',
      newReflection: 'Nueva Reflexión',
      summaryCta: 'Resumen de Sesión',
      dominantFeeling: 'Sentimiento Dominante',
      listen: 'Escuchar reflexión en voz suave',
      copy: 'Copiar texto',
      copied: '¡Copiado!',
      exportPng: 'Exportar Tarjeta PNG',
      visualizeArt: 'Arte Emocional Abstracto',
      visualizeSubtitle: 'Convierte tu estado de ánimo en una pieza visual abstracta.',
      generateArt: 'Crear Arte',
      generating: 'Generando...',
      downloadArt: 'Descargar imagen PNG →',
      talkHuman: '¿Deseas hablar con un orientador universitario?',
    },
    summary: {
      visitMemory: 'Memoria de la Visita Actual',
      title: 'Resumen de Sesión y Trayectoria Emocional',
      subtitle: 'Guardado exclusivamente en la memoria temporal de esta pestaña',
      newReflection: 'Nueva Reflexión',
      exportPdf: 'Exportar a PDF',
      clearSession: 'Borrar Sesión',
      emptyTitle: 'No hay reflexiones en esta sesión',
      emptyDesc: 'Toma un momento para escribir, dibujar o hablar. El Espejo graficará cómo cambia tu energía.',
      startFirst: 'Hacer primera reflexión',
      reflectionsCount: 'Reflexiones',
      latestDominant: 'Última Dominante',
      stressTrajectory: 'Tendencia de Estrés',
      calmnessShift: 'Ganancia de Calma',
      chartTitle: 'Visualizador de Progreso Emocional',
      chartSubtitle: 'Monitoreo Recharts de la evolución de ánimo en la sesión',
      tabAll: 'Todas las Emociones',
      tabStressCalm: 'Estrés vs Calma',
      tabAverages: 'Promedios de Sesión',
      galleryTitle: 'Galería de Arte de la Visita',
      chronoTitle: 'Reflexiones Cronológicas',
      wipeNotice: 'Cerrar o recargar esta pestaña borrará la sesión para siempre.',
    },
    emotions: {
      happiness: 'Alivio / Alegría',
      sadness: 'Tristeza / Desánimo',
      stress: 'Estrés Académico',
      calmness: 'Calma / Sosiego',
      anger: 'Frustración / Enojo',
      curiosity: 'Curiosidad / Interés',
    },
  },

  zh: {
    appName: 'AI 情绪之镜',
    nav: {
      overview: '概述',
      reflect: '情绪映照',
      summary: '会话回顾',
      privacy: '零数据留存',
      support: '寻求支持',
      settings: '设置',
      startReflection: '开始倾诉',
      viewSummary: '查看总结',
      newMirror: '新的映照',
    },
    settings: {
      title: '偏好设置与界面外观',
      subtitle: '自定义色彩主题与显示语言。仅在当前标签页访问期间生效。',
      appearance: '外观与主题',
      appearanceDesc: '选择你最喜欢的视觉氛围。',
      themeLight: '清澄明亮',
      themeLightDesc: '宁静的书香石色与暖琥珀色调。',
      themeDark: '深邃曜黑',
      themeDarkDesc: '适合深夜图书馆自习与备考，呵护疲劳的双眼。',
      themeRomantic: '浪漫粉心',
      themeRomanticDesc: '温柔淡粉色调，点缀轻盈浮动的爱心元素。',
      language: '界面语言',
      languageDesc: '选择应用界面与 AI 情感反馈的语言。',
      close: '保存并关闭',
      heartsEffect: '浪漫爱心动画已激活',
    },
    landing: {
      campusPreset: '高校预设：',
      heroTitle: '停下脚步。静心观照。找寻前路。',
      heroSubtitle: '一个专属的静心角落，倾听心声、梳理杂绪，重新找回内心的从容。',
      noLogin: '无需注册或邮箱',
      zeroStorage: '服务器零数据存储',
      wipedOnClose: '关闭标签即刻抹除',
      openMirror: '开启情绪之镜',
      readPromise: '阅读零留存承诺',
      academicQuote: '“当期末临近、睡眠流失之时，花五分钟辨识内心的感受，便能重新找回内心的定力。”',
      threeWays: '三种倾诉表达方式',
      threeWaysSubtitle: '没有刻板的心理量表。以最放松的方式随心倾吐。',
      writeTitle: '文字倾倒',
      writeDesc: '自由输入多达 1,000 字。尽情倾诉敷衍的组员、期中恐慌或论文卡壳的苦恼。',
      writeCta: '开始输入',
      drawTitle: '涂鸦心绪',
      drawDesc: '千言万语难以言表？用情绪触感笔触涂鸦。情绪之镜会解读笔锋中的焦躁或平和。',
      drawCta: '打开画板',
      talkTitle: '对镜言语',
      talkDesc: '在大考或答辩前放声宣泄。实时声波图谱与温柔语音回馈。',
      talkCta: '开始倾诉',
      situationsTitle: '大学现实场景',
      situationsSubtitle: '聚焦高校日常中最真实、却最容易被忽视的学业心理重负。',
      sitExamTitle: '考试周高压',
      sitExamDesc: '背诵疲劳、考前大脑空白、失眠焦虑以及对绩点的担忧。',
      sitExamOffer: '镜子提供：舒缓反馈与 5 分钟微休息建议',
      sitDeadlineTitle: '23:59 截稿死线',
      sitDeadlineDesc: '未完成的论文、凌晨两点报红的代码以及冒名顶替综合征。',
      sitDeadlineOffer: '镜子提供：重构心理视角与压力拆解',
      sitGroupTitle: '小组作业摩擦',
      sitGroupDesc: '一人扛起全部大梁、搭档玩失踪与沟通内耗。',
      sitGroupOffer: '镜子提供：中立情绪宣泄与沟通建议',
      sitPresTitle: '答辩与演讲恐慌',
      sitPresDesc: '在教授与同学面前心跳加速、声音发颤的怯场感。',
      sitPresOffer: '镜子提供：平稳呼吸节奏与宁静鼓励',
      privacyHeading: '你写下、画下或说出的每一句话，均不会被保存。',
      privacyLead: '许多心理健康工具靠积累个人隐私数据获利。AI 情绪之镜遵循截然相反的原则：',
      privacyRule1: '服务器端没有数据库。在物理上就不存在持久化储存你言语的场所。',
      privacyRule2: '零第三方跟踪器或 Cookie。没有任何商业分析像素。',
      privacyRule3: '纯内存运算。输入数据仅在生成回应的几秒内在 RAM 中流转，随后立即销毁。',
      privacyRule4: '标签页关闭即刻归零。所有情绪走势图只留在当前浏览器的瞬时内存中。',
      inspectDoc: '查看完整技术隐私文档 →',
      readyTitle: '准备好开启属于你的沉静片刻了吗？',
      readySubtitle: '无需账户，无需等待。即刻倾吐学业烦忧，数秒内收获真挚倾听。',
      startCta: '开始学生情绪映照',
    },
    context: {
      step1: '第 1 步：锚定学业场景',
      title: '停下脚步。静心观照。找寻前路。',
      subtitle: '一个专属的静心角落，倾听心声、梳理杂绪，重新找回内心的从容。',
      toneTitle: '偏好的反馈风格',
      toneStored: '仅保存在当前标签页',
      step2: '第 2 步：选择倾诉方式',
      modeTitle: '你想以何种方式表达？',
      needHelp: '需要紧急心理援助？',
    },
    contexts: {
      exam: { title: '考试周期', subtitle: '复习疲倦、应试恐慌、失眠' },
      deadline: { title: '赶截稿日', subtitle: '大作业、程序编译、毕业设计' },
      group: { title: '小组合作', subtitle: '组员划水、分工不均、沟通疲惫' },
      presentation: { title: '答辩演讲', subtitle: '公开演说、答辩怯场、紧张手抖' },
      general: { title: '大学日常', subtitle: '缺乏动力、自我怀疑、学术内耗' },
    },
    styles: {
      study_tip: { label: '学习休息锦囊', desc: '5分钟放松身心小行动' },
      poem: { label: '诗意映照', desc: '简练、抽象且充满宁静' },
      motivation: { label: '温柔鼓舞', desc: '真诚宽慰，拒绝有毒正能量' },
      humor: { label: '学生幽默', desc: '轻松诙谐的高校共鸣' },
      surprise: { label: '随机惊喜', desc: '由情绪之镜自动匹配适宜语气' },
    },
    write: {
      back: '返回模式选择',
      title: '自由书写。这里没有审判。',
      subtitle: '倾倒你的杂乱思绪、疲惫或困惑。你的原始文字永远不会被记录。',
      spark: '没有头绪？点击同龄人的心声：',
      placeholder: '最近学业上有什么烦心事？尽管如实倾诉...',
      chars: '字',
      reflecting: '情绪映照中...',
      reflectNow: '立即映照',
      inTransit: '所有文字仅在网络中转内存短暂停留，回应后即刻消失。',
    },
    draw: {
      back: '返回模式选择',
      title: '画出言语无法盛装的心绪。',
      subtitle: '乱涂死线带来的压抑感、画出杂乱的线条或是平静的线条。',
      fine: '细',
      medium: '中',
      heavy: '粗',
      undo: '撤销上一笔',
      clear: '清空画布',
      interpreting: '正在解读笔触情绪...',
      submit: '映照涂鸦心绪',
      specs: '导出为 512×512 PNG · 仅瞬时处理',
    },
    talk: {
      back: '返回模式选择',
      title: '对镜言说。',
      subtitle: '音频在内存中实时分析，绝不录音留存。放声说话以释重荷。',
      micIdle: '麦克风空闲。点击下方开始说话。',
      startSpeaking: '开始讲话',
      pauseMic: '暂停麦克风',
      status: '状态：',
      transcriptLabel: '实时语音转文字（亦可在此直接打字编辑）：',
      editable: '可编辑',
      placeholder: '正在聆听...请随意倾诉...',
      reflectVoice: '映照语音心绪',
      thinking: '正在体察心声...',
    },
    result: {
      complete: '映照完成',
      reading: '情绪之镜的观察',
      disclaimer: '基于学业情境的客观感受估算 · 绝非医学或临床心理诊断',
      newReflection: '重新倾诉',
      summaryCta: '会话回顾',
      dominantFeeling: '主导情绪',
      listen: '轻声朗读这段回响',
      copy: '复制文字',
      copied: '已复制！',
      exportPng: '导出卡片 PNG',
      visualizeArt: '视觉化情绪艺术',
      visualizeSubtitle: '将你的情绪波长转化为独一无二的抽象画作。',
      generateArt: '生成艺术图',
      generating: '创作中...',
      downloadArt: '下载高清艺术画 PNG →',
      talkHuman: '需要联系高校专业心理咨询师？',
    },
    summary: {
      visitMemory: '当前访问临时记忆',
      title: '会话回顾与情绪轨迹走势',
      subtitle: '仅留存在当前标签页内存中',
      newReflection: '新的一次映照',
      exportPdf: '导出 PDF 报告',
      clearSession: '抹除当前会话',
      emptyTitle: '当前会话暂无记录',
      emptyDesc: '花几分钟写写、画画或说说话，情绪之镜将为你描摹内心能量的变化轨迹。',
      startFirst: '开始首次映照',
      reflectionsCount: '倾诉次数',
      latestDominant: '当前主导情绪',
      stressTrajectory: '学业压力走势',
      calmnessShift: '内心平静增长',
      chartTitle: '情绪起伏动态走势图',
      chartSubtitle: '采用 Recharts 绘制的会话心理波动曲线',
      tabAll: '全部情绪',
      tabStressCalm: '压力 vs 平和',
      tabAverages: '会话平均值',
      galleryTitle: '本次生成的艺术画廊',
      chronoTitle: '时间线回顾',
      wipeNotice: '关闭或刷新当前网页标签，所有数据将被即刻永久清空。',
    },
    emotions: {
      happiness: '释然 / 愉悦',
      sadness: '失落 / 沮丧',
      stress: '学业压力',
      calmness: '内心平静',
      anger: '烦躁 / 委屈',
      curiosity: '好奇 / 探索动力',
    },
  },

  de: {
    appName: 'KI Stimmungsspiegel',
    nav: {
      overview: 'Übersicht',
      reflect: 'Reflektieren',
      summary: 'Sitzungsübersicht',
      privacy: 'Null-Daten-Schutz',
      support: 'Hilfe nötig?',
      settings: 'Einstellungen',
      startReflection: 'Starten',
      viewSummary: 'Zusammenfassung',
      newMirror: 'Neuer Spiegel',
    },
    settings: {
      title: 'Einstellungen & Erscheinungsbild',
      subtitle: 'Farbschemata und Sprache wählen. Nur für diesen Besuch gespeichert.',
      appearance: 'Design & Farbschema',
      appearanceDesc: 'Wähle deine bevorzugte visuelle Atmosphäre.',
      themeLight: 'Sanftes Tageslicht',
      themeLightDesc: 'Warme Sand- und Bernsteintöne für konzentriertes Arbeiten.',
      themeDark: 'Obsidian Dunkel',
      themeDarkDesc: 'Schont die Augen bei nächtlichen Lernphasen in der Bibliothek.',
      themeRomantic: 'Romantisches Rosa',
      themeRomanticDesc: 'Zartes Pastellrosa mit schwebenden Herzchen.',
      language: 'Sprache',
      languageDesc: 'Wähle die Sprache für Benutzeroberfläche und KI-Antworten.',
      close: 'Speichern & Schließen',
      heartsEffect: 'Romantischer Herz-Effekt aktiviert',
    },
    landing: {
      campusPreset: 'Campus-Voreinstellung:',
      heroTitle: 'Innehalten. Reflektieren. Deinen Weg finden.',
      heroSubtitle: 'Ein kleiner Raum, um deine Gefühle zu verstehen, Gedanken zu ordnen und dich wieder mit dir selbst zu verbinden.',
      noLogin: 'Ohne Login oder E-Mail',
      zeroStorage: 'Keine Daten auf dem Server',
      wipedOnClose: 'Tab schließt, alles weg',
      openMirror: 'Den Spiegel öffnen',
      readPromise: 'Datenschutzversprechen lesen',
      academicQuote: '„Wenn Klausuren näher rücken und der Schlaf fehlt, bringen fünf Minuten ehrliches Innehalten wieder festen Boden.“',
      threeWays: 'Drei Wege des Ausdrucks',
      threeWaysSubtitle: 'Keine starren Fragebögen. Drücke dein inneres Erleben so aus, wie es gerade kommt.',
      writeTitle: 'Niederschreiben',
      writeDesc: 'Schreibe bis zu 1.000 Zeichen frei herunter. Frust über untätige Gruppenmitglieder oder Klausurpanik.',
      writeCta: 'Tippen beginnen',
      drawTitle: 'Gefühl Skizzieren',
      drawDesc: 'Zu verworren für Worte? Zeichne mit Stimmungsfarben. Der Spiegel deutet Linienführung und Energie.',
      drawCta: 'Leinwand öffnen',
      talkTitle: 'Mit dem Spiegel Sprechen',
      talkDesc: 'Sprich dich vor einem Referat oder einer mündlichen Prüfung aus. Live-Wellenform und Sprachreflexion.',
      talkCta: 'Sprechen starten',
      situationsTitle: 'Akademischer Alltag',
      situationsSubtitle: 'Fokussiert auf die realen Belastungen des Studiums, die an der Hochschule selten Raum finden.',
      sitExamTitle: 'Prüfungsphase',
      sitExamDesc: 'Lernerschöpfung, Angst vor dem Blackout, Schlafmangel und Notendruck.',
      sitExamOffer: 'Der Spiegel bietet: Beruhigende Einordnung & 5-Minuten-Pause',
      sitDeadlineTitle: '23:59 Uhr Abgabefrist',
      sitDeadlineDesc: 'Unfertige Hausarbeiten, Compiler-Fehler um 2 Uhr nachts und Hochstapler-Gefühle.',
      sitDeadlineOffer: 'Der Spiegel bietet: Neubewertung und Entlastung',
      sitGroupTitle: 'Gruppenarbeiten',
      sitGroupDesc: 'Die Hauptlast allein tragen und Frust über unzuverlässige Kommilitonen.',
      sitGroupOffer: 'Der Spiegel bietet: Neutralen Raum zum Frustablassen',
      sitPresTitle: 'Präsentationsnervosität',
      sitPresDesc: 'Zittern und Herzklopfen vor dem Vortrag vor Professoren und Saal.',
      sitPresOffer: 'Der Spiegel bietet: Beruhigenden Atemimpuls und Zuspruch',
      privacyHeading: 'Nichts von dem, was du schreibst, zeichnest oder sagst, wird gespeichert.',
      privacyLead: 'Im Gegensatz zu Apps, die seelische Belastungen kommerziell erfassen, gilt bei uns:',
      privacyRule1: 'Keine Datenbank auf dem Server. Es gibt keinen Ort, an dem Texte abgelegt werden könnten.',
      privacyRule2: 'Keine Tracker oder Cookies von Drittanbietern. Keine Werbepixel.',
      privacyRule3: 'Verarbeitung ausschließlich im flüchtigen Arbeitsspeicher (RAM). Sofortige Freigabe.',
      privacyRule4: 'Sobald du den Tab schließt, ist alles spurlos gelöscht.',
      inspectDoc: 'Technische Dokumentation einsehen →',
      readyTitle: 'Bereit für einen Moment stiller Klarheit?',
      readySubtitle: 'Ohne Anmeldung. Öffne den Spiegel und gewinne in Sekunden neue Gelassenheit.',
      startCta: 'Reflexion Starten',
    },
    context: {
      step1: 'Schritt 1: Situation einordnen',
      title: 'Innehalten. Reflektieren. Deinen Weg finden.',
      subtitle: 'Ein kleiner Raum, um deine Gefühle zu verstehen, Gedanken zu ordnen und dich wieder mit dir selbst zu verbinden.',
      toneTitle: 'Gewünschter Tonfall',
      toneStored: 'Nur in diesem Tab aktiv',
      step2: 'Schritt 2: Modus wählen',
      modeTitle: 'Wie möchtest du dich ausdrücken?',
      needHelp: 'Dringende Hilfe nötig?',
    },
    contexts: {
      exam: { title: 'Prüfungszeit', subtitle: 'Lernstress, Prüfungsangst, Schlafmangel' },
      deadline: { title: 'Abgabedruck', subtitle: 'Hausarbeiten, Programmierprojekte, Thesis' },
      group: { title: 'Gruppenarbeit', subtitle: 'Ungerechte Arbeitslast, Funkstille, Frust' },
      presentation: { title: 'Vortragsnervosität', subtitle: 'Referate, mündliche Prüfungen, Lampenfieber' },
      general: { title: 'Studienalltag', subtitle: 'Motivationstiefs, Selbstzweifel, Campus-Routine' },
    },
    styles: {
      study_tip: { label: 'Lernpausen-Tipp', desc: 'Kleine 5-minütige Erholungsaktion' },
      poem: { label: 'Poetische Reflexion', desc: 'Kurz, bildhaft und erdend' },
      motivation: { label: 'Sanfte Ermutigung', desc: 'Wohlwollend ohne toxische Positivität' },
      humor: { label: 'Studentischer Humor', desc: 'Verständnisvoller Uni-Witz' },
      surprise: { label: 'Überrasch mich', desc: 'Der Spiegel wählt den passendsten Ton' },
    },
    write: {
      back: 'Zurück zur Auswahl',
      title: 'Schreibe frei von der Leber weg.',
      subtitle: 'Schütte Gedanken, Frust oder Zweifel aus. Deine Rohworte werden niemals gespeichert.',
      spark: 'Brauchst du einen Impuls? Wähle einen Gedanken:',
      placeholder: 'Was beschäftigt dich im Studium gerade am meisten? Schreibe so ehrlich du magst...',
      chars: 'Zeichen',
      reflecting: 'Reflektiere...',
      reflectNow: 'Jetzt Reflektieren',
      inTransit: 'Der Text existiert nur während der Übertragung im RAM und verflüchtigt sich danach.',
    },
    draw: {
      back: 'Zurück zur Auswahl',
      title: 'Zeichne, wofür Worte fehlen.',
      subtitle: 'Kritzle die Last der Frist, dunkle Knoten oder sanft fließende Striche.',
      fine: 'Fein',
      medium: 'Mittel',
      heavy: 'Kräftig',
      undo: 'Strich rückgängig',
      clear: 'Zeichnung löschen',
      interpreting: 'Deute visuelle Energie...',
      submit: 'Skizze Reflektieren',
      specs: 'Exportiert als 512×512 PNG · Nur im Arbeitsspeicher',
    },
    talk: {
      back: 'Zurück zur Auswahl',
      title: 'Sprich mit dem Spiegel.',
      subtitle: 'Audio wird live im RAM verarbeitet und niemals mitgeschnitten. Sprich dich frei.',
      micIdle: 'Mikrofon inaktiv. Klicke unten, um zu sprechen.',
      startSpeaking: 'Sprechen Beginnen',
      pauseMic: 'Mikrofon Pausieren',
      status: 'Status:',
      transcriptLabel: 'Live-Transkript (oder tippe direkt hier):',
      editable: 'Editierbar',
      placeholder: 'Ich höre zu... sprich ganz ungezwungen...',
      reflectVoice: 'Stimme Reflektieren',
      thinking: 'Deute Sprachausdruck...',
    },
    result: {
      complete: 'Reflexion Abgeschlossen',
      reading: 'Die Lesart des Spiegels',
      disclaimer: 'Achtsame Einschätzung für den Studienalltag · Keine medizinische oder therapeutische Diagnose',
      newReflection: 'Neue Reflexion',
      summaryCta: 'Sitzungsübersicht',
      dominantFeeling: 'Dominantes Gefühl',
      listen: 'Reflexion sanft vorlesen lassen',
      copy: 'Text kopieren',
      copied: 'Kopiert!',
      exportPng: 'PNG-Karte exportieren',
      visualizeArt: 'Stimmungskunst Visualisieren',
      visualizeSubtitle: 'Verwandle deine emotionale Schwingung in abstrakte Kunst.',
      generateArt: 'Kunst Generieren',
      generating: 'Erschaffe...',
      downloadArt: 'Hochauflösendes Kunst-PNG herunterladen →',
      talkHuman: 'Möchtest du mit einer universitären Beratungsstelle sprechen?',
    },
    summary: {
      visitMemory: 'Speicher des Aktuellen Besuchs',
      title: 'Sitzungsübersicht & Emotionale Entwicklung',
      subtitle: 'Nur im flüchtigen Speicher dieses Browser-Tabs',
      newReflection: 'Neue Reflexion',
      exportPdf: 'PDF Exportieren',
      clearSession: 'Sitzung Löschen',
      emptyTitle: 'Noch keine Einträge in dieser Sitzung',
      emptyDesc: 'Nimm dir kurz Zeit zu schreiben, zeichnen oder sprechen. Der Spiegel zeichnet deine Stimmungsentwicklung auf.',
      startFirst: 'Erste Reflexion starten',
      reflectionsCount: 'Reflexionen',
      latestDominant: 'Aktuell Dominant',
      stressTrajectory: 'Stressverlauf',
      calmnessShift: 'Ruhegewinn',
      chartTitle: 'Emotionaler Verlaufs-Visualisierer',
      chartSubtitle: 'Recharts-gestützte Entwicklung über die Reflexionsrunden hinweg',
      tabAll: 'Alle Gefühle',
      tabStressCalm: 'Stress vs. Ruhe',
      tabAverages: 'Sitzungsschnitt',
      galleryTitle: 'Galerie dieses Besuchs',
      chronoTitle: 'Chronologischer Verlauf',
      wipeNotice: 'Schließen oder Neuladen des Tabs löscht diese Sitzung unwiderruflich.',
    },
    emotions: {
      happiness: 'Erleichterung / Freude',
      sadness: 'Niedergeschlagenheit',
      stress: 'Studienstress',
      calmness: 'Gelassenheit',
      anger: 'Frustration / Wut',
      curiosity: 'Neugier / Tatendrang',
    },
  },
};
