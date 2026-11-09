import { Album } from "./Album";

export interface LibraryDB {
  library: {
    vinyl: Map<string, Album> | undefined,
    cd: Map<string, Album> | undefined,
    dvd: Map<string, Album> | undefined,
    blu_ray: Map<string, Album> | undefined,
  },
  settings: any //TODO- expand on this as we construct
}

export interface ServerDB {
  library: {
    vinyl: string | undefined,
    cd: string | undefined,
    dvd: string | undefined,
    blu_ray: string | undefined,
  },
  settings: any //TODO- expand on this as we construct
}
