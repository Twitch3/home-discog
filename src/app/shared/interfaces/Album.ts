import { IRelease, IImage } from "musicbrainz-api";

export interface Album extends IRelease{
  images?: IImage[]
  image?: IImage
  selected?: boolean
}
