export interface CoverArtImage {
  types: string[],
  front: boolean,
  back: boolean,
  edit: number,
  image: string,
  comment: string,
  approved: boolean,
  id: string,
  thumbnails: {
    250: string,
    500: string,
    1200: string,
    small: string,
    large: string
  }
}

export interface ReleaseCoverArt {
  images: CoverArtImage[],
  release: string
}
