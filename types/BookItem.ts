export interface BookMediaFile {
  main_link: string;
  conversion_links?: {
    thumbnail_192_192?: string;
    large_thumbnail_260_260?: string;
  };
  collection_name?: string;
}
