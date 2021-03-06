import fs from 'fs-extra';
import path from 'path';
import vdf from 'vdf-extra';

interface LibraryFolders {
  TimeNextStatsReport: string;
  ContentStatsID: string;
  [id: string]: string;
}

export async function loadSteamLibraries(steam: string) {
  const mainSteamApps = path.join(steam, 'steamapps');
  const libraryFoldersPath = path.join(mainSteamApps, 'libraryfolders.vdf');
  const libraryFoldersContent = await fs.readFile(libraryFoldersPath, 'utf8');
  const libraryFoldersData = vdf.parse<LibraryFolders>(libraryFoldersContent);

  const libraries = Object.entries(libraryFoldersData)
    .filter(([id]) => !isNaN(Number(id)))
    .map(([, libPath]) => path.join(libPath, 'steamapps'));

  return [mainSteamApps, ...libraries];
}
