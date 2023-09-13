export interface Characters {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data;
  etag: string;
}

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ICharacters[];
}

export interface ICharacters {
  id: number;
  name: string;
  description: string;
  modified: string;
  resourceURI: string;
  urls: URL[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Comics;
  series: Comics;
}

export interface Comics {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicsItem[];
}

export interface ComicsItem {
  resourceURI: string;
  name: string;
}

export interface Stories {
  available: string;
  returned: string;
  collectionURI: string;
  items: StoriesItem[];
}

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: string;
}

export interface Thumbnail {
  path: string;
  extension: string;
}

export interface URL {
  type: string;
  url: string;
}
