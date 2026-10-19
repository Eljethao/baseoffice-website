import { keepLaoWordsDeep } from "../i18n";
import type { Dictionary } from "./en";

/**
 * Interface text in Lao. Button and menu names in the install steps (Done, Open Anyway, More info, Run anyway…)
 * stay in English on purpose: they must match what macOS and Windows show on screen and in the screenshots.
 */
const text: Dictionary = {
  meta: {
    siteTitle: "Base Store: ແອັບສຳລັບ macOS ແລະ Windows",
    siteDescription:
      "Base Store ເປັນບ່ອນລວມແອັບສຳລັບ macOS ແລະ Windows ທີ່ສ້າງໂດຍ LJ Thao, ລວມທັງໂປຣແກຣມພິມເອກະສານ DocBase ແລະ ໂປຣແກຣມຕາຕະລາງຄຳນວນ SheetBase.",
    appTitle: (name, kind) => `${name}: ${kind} ສຳລັບ Mac ແລະ Windows`,
    versionsTitle: (name) => `ເວີຊັນທັງໝົດຂອງ ${name}`,
    versionsDescription: (name) => `ດາວໂຫຼດ ${name} ທຸກເວີຊັນ ແລະ ເບິ່ງວ່າແຕ່ລະເວີຊັນມີຫຍັງປ່ຽນແປງ.`,
    notFoundTitle: "ບໍ່ພົບໜ້ານີ້",
  },

  header: {
    browseApps: "ແອັບທັງໝົດ",
    language: "ພາສາ",
  },

  footer: {
    blurb: (author) => `ແອັບສຳລັບ Mac ແລະ Windows ສ້າງໂດຍ ${author}. ບໍ່ຕ້ອງມີບັນຊີ, ບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ.`,
    apps: "ແອັບ",
    allApps: "ແອັບທັງໝົດ",
    developer: "ຜູ້ພັດທະນາ",
    soon: "ໄວໆນີ້",
    madeFor: "ສ້າງມາສຳລັບ macOS ແລະ Windows",
  },

  home: {
    newLabel: "ໃໝ່:",
    isHere: (name, version) => `${name} ${version} ອອກແລ້ວ`,
    heroLine1: "ແອັບສຳລັບຄອມພິວເຕີ,",
    heroLine2: "ງ່າຍ ແລະ ສວຍງາມ.",
    heroText: (author) =>
      `Base Store ເປັນບ່ອນລວມແອັບທີ່ ${author} ສ້າງສຳລັບ Mac ແລະ Windows. ດາວໂຫຼດລົງຄອມພິວເຕີຂອງທ່ານໄດ້ທັນທີ ໂດຍບໍ່ຕ້ອງມີບັນຊີ ແລະ ບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ.`,
    getApp: (name) => `ດາວໂຫຼດ ${name}`,
    soon: "ໄວໆນີ້",
    featured: "ແນະນຳ",
    featuredTitle: "ສ້າງມາເພື່ອວຽກງານແທ້",
    featuredText: "ແອັບທີ່ມີຄຸນສົມບັດຄົບຖ້ວນ, ເປີດໄຟລ໌ທີ່ທ່ານມີຢູ່ແລ້ວໄດ້ ແລະ ໃຊ້ງານໄດ້ໂດຍບໍ່ຕ້ອງເຊື່ອມຕໍ່ອິນເຕີເນັດ.",
    theStore: "ຮ້ານແອັບ",
    allApps: "ແອັບທັງໝົດ",
    explore: (name) => `ເບິ່ງ ${name} ເພີ່ມເຕີມ`,
    whatsNewIn: (version) => `ມີຫຍັງໃໝ່ໃນເວີຊັນ ${version}`,
    promises: [
      {
        title: "ສ້າງມາສຳລັບຄອມພິວເຕີຂອງທ່ານ",
        text: "ແອັບເດັສທັອບແທ້ສຳລັບ macOS ທັງຊິບ Apple Silicon ແລະ Intel, ແລະ ສຳລັບ Windows.",
      },
      {
        title: "ບໍ່ຕ້ອງມີບັນຊີ",
        text: "ດາວໂຫຼດແລ້ວເລີ່ມໃຊ້ງານໄດ້ເລີຍ. ບໍ່ຕ້ອງສະໝັກ, ບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ ແລະ ໄຟລ໌ຂອງທ່ານຢູ່ໃນຄອມພິວເຕີຂອງທ່ານເອງ.",
      },
      {
        title: "ເກັບທຸກເວີຊັນໄວ້",
        text: "ຕ້ອງການເວີຊັນເກົ່າບໍ? ທຸກແອັບເກັບທຸກເວີຊັນໄວ້ ພ້ອມບັນທຶກວ່າມີຫຍັງປ່ຽນແປງ.",
      },
    ],
  },

  appCard: {
    comingSoon: "ໄວໆນີ້",
    inDevelopment: "ກຳລັງພັດທະນາ",
    get: "ດາວໂຫຼດ",
    details: "ລາຍລະອຽດ",
  },

  download: {
    labels: { "mac-arm64": "Mac (Apple Silicon)", "mac-x64": "Mac (Intel)", "win-x64": "Windows" },
    archHint: "Apple Silicon ສຳລັບ Mac ທີ່ໃຊ້ຊິບ M; Mac ລຸ້ນເກົ່າໃຊ້ Intel",
    allVersions: "ທຸກເວີຊັນ",
    forThisComputer: "ສຳລັບຄອມພິວເຕີນີ້",
  },

  common: {
    version: (version) => `ເວີຊັນ ${version}`,
    comingSoon: "ໄວໆນີ້",
    macos: "macOS",
    windows: "Windows",
  },

  app: {
    categoryApps: (category) => `ແອັບ${category}`,
    by: "ໂດຍ",
    about: (name) => `ກ່ຽວກັບ ${name}`,
    features: "ຄຸນສົມບັດ",
    fileFormats: "ຮູບແບບໄຟລ໌",
    opens: "ເປີດໄດ້",
    saves: "ບັນທຶກ ແລະ ສົ່ງອອກ",
    whatsNew: "ມີຫຍັງໃໝ່",
    versionHistory: "ປະຫວັດເວີຊັນ",
    downloadsTitle: "ດາວໂຫຼດ",
    installer: (arch) => `ຕົວຕິດຕັ້ງ ${arch}`,
    whichMac:
      "ບໍ່ແນ່ໃຈວ່າ Mac ຂອງທ່ານເປັນແບບໃດ? ເປີດເມນູ Apple › About This Mac. ຖ້າຂຶ້ນ “Chip: Apple M…” ແມ່ນ Apple Silicon; ຖ້າຂຶ້ນ “Processor: Intel” ແມ່ນ Intel.",
    olderVersions: "ເວີຊັນເກົ່າ",
    information: "ຂໍ້ມູນ",
    info: {
      developer: "ຜູ້ພັດທະນາ",
      category: "ໝວດໝູ່",
      version: "ເວີຊັນ",
      released: "ວັນທີອອກ",
      downloads: "ຈຳນວນດາວໂຫຼດ",
      requires: "ລະບົບທີ່ຮອງຮັບ",
      languages: "ພາສາ",
      account: "ບັນຊີ",
      notNeeded: "ບໍ່ຈຳເປັນ",
    },
  },

  install: {
    title: (name) => `ການຕິດຕັ້ງ ${name}`,
    intro: (name) =>
      `${name} ເຜີຍແຜ່ໂດຍນັກພັດທະນາອິດສະລະ ແລະ ຍັງບໍ່ໄດ້ລົງທະບຽນກັບລະບົບກວດສອບ (notary) ຂອງ Apple ຫຼື SmartScreen ຂອງ Microsoft, ສະນັ້ນ ເມື່ອເປີດຄັ້ງທຳອິດ ຄອມພິວເຕີຂອງທ່ານຈະສະແດງຄຳເຕືອນມາດຕະຖານສຳລັບແອັບທີ່ບໍ່ຮູ້ຈັກ. ນີ້ບໍ່ແມ່ນບັນຫາທີ່ພົບໃນໄຟລ໌. ຂັ້ນຕອນລຸ່ມນີ້ໃຊ້ເວລາພຽງໜຶ່ງນາທີ ແລະ ເຮັດພຽງຄັ້ງດຽວ.`,
    seeBelow: "ເບິ່ງຂັ້ນຕອນພ້ອມຮູບພາບຢູ່ລຸ່ມນີ້.",
    messageReads: "ຂໍ້ຄວາມທີ່ຂຶ້ນ:",
    mac: {
      steps: (name) => [
        "ເປີດໄຟລ໌ .dmg ທີ່ດາວໂຫຼດມາ.",
        `ລາກ ${name} ໃສ່ໂຟນເດີ Applications.`,
        `ເປີດ ${name} ຈາກ Applications ຫຼື Launchpad.`,
      ],
      blockedTitle: (name) => `ຖ້າ macOS ຂຶ້ນວ່າ “${name}” Not Opened`,
      message: (name) =>
        `“Apple could not verify ${name} is free of malware that may harm your Mac or compromise your privacy.”`,
      step1: { before: "ກົດ ", button: "Done", after: " ເພື່ອປິດຂໍ້ຄວາມ. ຢ່າກົດ Move to Trash." },
      step2: (name) => ({
        before: "ເປີດ ",
        place: "System Settings › Privacy & Security",
        middle: ` ແລ້ວເລື່ອນລົງໄປຫາສ່ວນ Security. ຢູ່ແຖວ “${name} was blocked to protect your Mac”, ກົດ `,
        button: "Open Anyway",
        after: ", ຈາກນັ້ນໃສ່ລະຫັດຜ່ານ ຫຼື ໃຊ້ Touch ID.",
      }),
      step3: (name) => ({
        before: `ເມື່ອ macOS ຖາມວ່າ “Open ${name}?”, ກົດ `,
        button: "Open Anyway",
        after: `. ${name} ຈະເປີດຂຶ້ນ ແລະ ຕໍ່ໄປຈະເປີດໄດ້ຕາມປົກກະຕິ.`,
      }),
      terminal: (name) =>
        `ມັກໃຊ້ Terminal ບໍ? ຫຼັງຈາກລາກ ${name} ໃສ່ Applications ແລ້ວ, ແລ່ນຄຳສັ່ງນີ້ຄັ້ງດຽວ ແລ້ວເປີດແອັບຕາມປົກກະຕິ:`,
      screenshotsNote: (name) => `ຮູບໜ້າຈໍເປັນຂອງ DocBase; ${name} ຈະຂຶ້ນຂໍ້ຄວາມແບບດຽວກັນ ແຕ່ເປັນຊື່ຂອງ ${name}.`,
      alt: {
        notOpened: "ຂໍ້ຄວາມ “DocBase” Not Opened ຈາກ macOS ໂດຍວົງປຸ່ມ Done ໄວ້",
        settings:
          "System Settings ໜ້າ Privacy & Security ໂດຍວົງແຖວ “DocBase was blocked to protect your Mac” ແລະ ປຸ່ມ Open Anyway ໄວ້",
        openAnyway: "ໜ້າຕ່າງຢືນຢັນ “Open DocBase?” ຈາກ macOS ໂດຍວົງປຸ່ມ Open Anyway ໄວ້",
      },
    },
    windows: {
      steps: (name) => [
        "ແລ່ນໄຟລ໌ຕິດຕັ້ງ .exe ທີ່ດາວໂຫຼດມາ.",
        "ເຮັດຕາມຂັ້ນຕອນໃນໂປຣແກຣມຕິດຕັ້ງ.",
        `ເປີດ ${name} ຈາກເມນູ Start.`,
      ],
      blockedTitle: "ຖ້າ Windows ຂຶ້ນວ່າ “Windows protected your PC”",
      message: "“Microsoft Defender SmartScreen prevented an unrecognized app from starting.”",
      step1: { before: "ກົດ ", button: "More info", after: " ທີ່ຢູ່ກ້ອງຂໍ້ຄວາມ. ຢ່າກົດ Don't run." },
      step2: (name) => ({
        before: "ກວດເບິ່ງວ່າແອັບແມ່ນ ",
        middle: ", ຈາກນັ້ນກົດ ",
        button: "Run anyway",
        after: `. ໂປຣແກຣມຕິດຕັ້ງຈະເລີ່ມຕາມປົກກະຕິ ແລະ ຕໍ່ໄປ ${name} ຈະເປີດໂດຍບໍ່ມີຂໍ້ຄວາມນີ້ອີກ.`,
      }),
      browserNote:
        "ເບົາເຊີຂອງທ່ານອາດຈະເຕືອນວ່າໄຟລ໌ນີ້ “isn't commonly downloaded” ນຳ. ໃຫ້ເລືອກ Keep (ໃນ Edge ໃຫ້ເປີດເມນູ ⋯ ຂອງໄຟລ໌ທີ່ດາວໂຫຼດກ່ອນ), ແລ້ວແລ່ນໂປຣແກຣມຕິດຕັ້ງ.",
      illustration: "ຮູບຈຳລອງ",
    },
  },

  versions: {
    title: "ປະຫວັດເວີຊັນ",
    none: (name) => `${name} ຍັງບໍ່ມີເວີຊັນທີ່ອອກມາ.`,
    every: (name) => `ທຸກເວີຊັນຂອງ ${name}, ລຽງຈາກໃໝ່ຫາເກົ່າ. ດາວໂຫຼດເວີຊັນໃດກໍໄດ້.`,
    latest: "ລ່າສຸດ",
    downloads: "ດາວໂຫຼດ",
    noFiles: "ບໍ່ມີໄຟລ໌ສຳລັບເວີຊັນນີ້.",
  },

  notFound: {
    title: "ບໍ່ພົບໜ້ານີ້",
    text: "ໜ້າທີ່ທ່ານຊອກຫາບໍ່ມີ ຫຼື ຖືກຍ້າຍໄປແລ້ວ.",
    home: "ກັບໄປ Base Store",
  },
};

/** Page text gets word joiners; metadata (titles, descriptions) stays plain for browser tabs and search engines. */
export const lo: Dictionary = { ...keepLaoWordsDeep(text), meta: text.meta };
