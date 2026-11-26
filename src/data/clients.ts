export interface Client {
  name: string;
  /** File in public/assets/logos, including its extension. */
  file: string;
  /** Artwork width / height, used on phones and tablets to give every logo the same visual weight. */
  ratio: number;
}

export const CLIENTS: Client[] = [
  { name: "NEC", file: "nec.svg", ratio: 3.750 },
  { name: "StatusNeo", file: "statusneo.svg", ratio: 4.283 },
  { name: "Robosoft Technologies", file: "robosoft.svg", ratio: 7.626 },
  { name: "AB InBev", file: "abinbev.svg", ratio: 5.308 },
  { name: "Turing", file: "turing.svg", ratio: 6.368 },
  { name: "Kotak Mutual Fund", file: "kotak.svg", ratio: 2.173 },
  { name: "HHM Hotels", file: "hhm-hotels.webp", ratio: 0.673 },
  { name: "Saviant", file: "saviant.svg", ratio: 1.646 },
  { name: "Client", file: "logo-9.svg", ratio: 1.142 },
  { name: "GrowIndigo", file: "growindigo.png", ratio: 2.239 },
  { name: "Nimap Infotech", file: "nimap.svg", ratio: 3.189 },
  { name: "Kitman Labs", file: "kitman-labs.svg", ratio: 8.581 },
  { name: "TALN", file: "taln.png", ratio: 3.366 },
  { name: "Dentsu", file: "dentsu.png", ratio: 4.750 },
  { name: "Yodaplus", file: "yodaplus.svg", ratio: 4.250 },
  { name: "LaunchLab", file: "launchlab.png", ratio: 3.926 },
];
