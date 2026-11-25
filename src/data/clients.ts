export interface Client {
  name: string;
  /** File in public/assets/logos, including its extension. */
  file: string;
}

export const CLIENTS: Client[] = [
  { name: "NEC", file: "nec.svg" },
  { name: "StatusNeo", file: "statusneo.svg" },
  { name: "Robosoft Technologies", file: "robosoft.svg" },
  { name: "AB InBev", file: "abinbev.svg" },
  { name: "Turing", file: "turing.svg" },
  { name: "Kotak Mutual Fund", file: "kotak.svg" },
  { name: "HHM Hotels", file: "hhm-hotels.webp" },
  { name: "Saviant", file: "saviant.svg" },
  { name: "Client", file: "logo-9.svg" },
  { name: "GrowIndigo", file: "growindigo.png" },
  { name: "Nimap Infotech", file: "nimap.svg" },
  { name: "Kitman Labs", file: "kitman-labs.svg" },
  { name: "TALN", file: "taln.png" },
  { name: "Dentsu", file: "dentsu.png" },
  { name: "Yodaplus", file: "yodaplus.svg" },
  { name: "LaunchLab", file: "launchlab.png" },
];
