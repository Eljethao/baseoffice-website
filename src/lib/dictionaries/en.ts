/** Interface text in English. `lo.ts` must have the same shape (checked by the `Dictionary` type). */
export const en = {
  meta: {
    siteTitle: "Base Store: desktop apps for macOS and Windows",
    siteDescription:
      "Base Store is the home of desktop apps for macOS and Windows made by LJ Thao, including the DocBase word processor and the SheetBase spreadsheet.",
    appTitle: (name: string, kind: string) => `${name}: ${kind.toLowerCase()} for Mac and Windows`,
    versionsTitle: (name: string) => `${name} versions`,
    versionsDescription: (name: string) => `Download any version of ${name} and see what changed in each one.`,
    notFoundTitle: "Page not found",
  },

  header: {
    browseApps: "Browse apps",
    language: "Language",
  },

  footer: {
    blurb: (author: string) => `Desktop apps for Mac and Windows, made by ${author}. No account, no sign-in.`,
    apps: "Apps",
    allApps: "All apps",
    developer: "Developer",
    soon: "Soon",
    madeFor: "Made for macOS and Windows",
  },

  home: {
    newLabel: "New:",
    isHere: (name: string, version: string) => `${name} ${version} is here`,
    heroLine1: "Desktop apps,",
    heroLine2: "beautifully simple.",
    heroText: (author: string) =>
      `Base Store is the home of apps made by ${author} for Mac and Windows. Download them straight to your computer, with no account and no sign-in.`,
    getApp: (name: string) => `Get ${name}`,
    soon: "Soon",
    featured: "Featured",
    featuredTitle: "Built for real work",
    featuredText: "Full-featured apps that open the files you already have and work without an internet connection.",
    theStore: "The store",
    allApps: "All apps",
    explore: (name: string) => `Explore ${name}`,
    whatsNewIn: (version: string) => `What's new in ${version}`,
    promises: [
      { title: "Made for your computer", text: "Real desktop apps for macOS, on Apple Silicon and Intel, and for Windows." },
      {
        title: "No account needed",
        text: "Download and start working. No sign-up, no sign-in, and your files stay on your computer.",
      },
      {
        title: "Every version, kept",
        text: "Need an older version? Each app keeps every release, with notes on what changed.",
      },
    ],
  },

  appCard: {
    comingSoon: "Coming soon",
    inDevelopment: "In development",
    get: "Get",
    details: "Details",
  },

  /** Passed to the client-side download buttons as plain strings. */
  download: {
    labels: { "mac-arm64": "Mac (Apple Silicon)", "mac-x64": "Mac (Intel)", "win-x64": "Windows" },
    archHint: "Apple Silicon is for Macs with an M-series chip; older Macs use Intel",
    allVersions: "All versions",
    forThisComputer: "For this computer",
  },

  common: {
    version: (version: string) => `Version ${version}`,
    comingSoon: "Coming soon",
    macos: "macOS",
    windows: "Windows",
  },

  app: {
    categoryApps: (category: string) => `${category} apps`,
    by: "by",
    about: (name: string) => `About ${name}`,
    features: "Features",
    fileFormats: "File formats",
    opens: "Opens",
    saves: "Saves and exports",
    whatsNew: "What's new",
    versionHistory: "Version history",
    downloadsTitle: "Downloads",
    installer: (arch: string) => `${arch} installer`,
    whichMac:
      "Not sure which Mac you have? Open Apple menu › About This Mac. “Chip: Apple M…” means Apple Silicon; “Processor: Intel” means Intel.",
    olderVersions: "Older versions",
    information: "Information",
    info: {
      developer: "Developer",
      category: "Category",
      version: "Version",
      released: "Released",
      downloads: "Downloads",
      requires: "Requires",
      languages: "Languages",
      account: "Account",
      notNeeded: "Not needed",
    },
  },

  install: {
    title: (name: string) => `Installing ${name}`,
    intro: (name: string) =>
      `${name} is published by an independent developer and is not yet registered with Apple's notary service or Microsoft's SmartScreen, so the first time you open it your computer shows a standard warning for unknown apps. It is not a problem found in the file. The steps below take a minute and are only needed once.`,
    seeBelow: "See the steps with pictures below.",
    messageReads: "The message reads:",
    mac: {
      steps: (name: string) => [
        "Open the downloaded .dmg file.",
        `Drag ${name} into the Applications folder.`,
        `Open ${name} from Applications or Launchpad.`,
      ],
      blockedTitle: (name: string) => `If macOS says “${name}” Not Opened`,
      message: (name: string) =>
        `“Apple could not verify ${name} is free of malware that may harm your Mac or compromise your privacy.”`,
      step1: { before: "Click ", button: "Done", after: " to close the message. Don't click Move to Trash." },
      step2: (name: string) => ({
        before: "Open ",
        place: "System Settings › Privacy & Security",
        middle: ` and scroll down to Security. Next to “${name} was blocked to protect your Mac”, click `,
        button: "Open Anyway",
        after: ", then enter your password or use Touch ID.",
      }),
      step3: (name: string) => ({
        before: `When macOS asks “Open ${name}?”, click `,
        button: "Open Anyway",
        after: `. ${name} opens, and from now on it opens normally.`,
      }),
      terminal: (name: string) =>
        `Prefer Terminal? After dragging ${name} to Applications, run this once, then open it as usual:`,
      screenshotsNote: (name: string) => `The screenshots show DocBase; ${name} shows the same messages with its own name.`,
      alt: {
        notOpened: "The “DocBase” Not Opened message from macOS, with the Done button circled",
        settings:
          "System Settings, Privacy & Security, with “DocBase was blocked to protect your Mac” and its Open Anyway button circled",
        openAnyway: "The “Open DocBase?” confirmation from macOS, with the Open Anyway button circled",
      },
    },
    windows: {
      steps: (name: string) => [
        "Run the downloaded .exe installer.",
        "Follow the steps in the installer.",
        `Open ${name} from the Start menu.`,
      ],
      blockedTitle: "If Windows says “Windows protected your PC”",
      message: "“Microsoft Defender SmartScreen prevented an unrecognized app from starting.”",
      step1: { before: "Click ", button: "More info", after: " under the message. Don't click Don't run." },
      step2: (name: string) => ({
        before: "Check that the app is ",
        middle: ", then click ",
        button: "Run anyway",
        after: `. The installer starts normally, and ${name} opens without this message from then on.`,
      }),
      browserNote:
        "Your browser may also warn that the file “isn't commonly downloaded”. Choose Keep (in Edge, open the ⋯ menu on the download first), then run the installer.",
      illustration: "Illustration",
    },
  },

  versions: {
    title: "Version history",
    none: (name: string) => `No versions of ${name} released yet.`,
    every: (name: string) => `Every version of ${name}, newest first. Download any of them.`,
    latest: "Latest",
    downloads: "Downloads",
    noFiles: "No files are available for this version.",
  },

  notFound: {
    title: "Page not found",
    text: "The page you're looking for doesn't exist or has moved.",
    home: "Back to Base Store",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => Widen<R>
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
