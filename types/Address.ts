interface Address {
  id: number;
  full_address: string;
  postal_code: string;
  mobile: string;
  first_name: string;
  last_name: string;
}

interface MediaFile {
  main_link: string;
}

interface CollectionItem {
  media_files: MediaFile[];
}

interface CollectionData {
  id: number;
  title: string;
  items: CollectionItem[];
}

interface BookMediaFile {
  main_link: string;
  conversion_links: {
    large_thumbnail_260_260: string;
  };
  collection_name: string;
}
interface BookItem {
  id: number;
  title: string;
  media_files: {
    main_link: string;
    conversion_links?: {
      thumbnail_192_192?: string;
      large_thumbnail_260_260?: string;
    };
    collection_name?: string;
  }[];
  price: number;
  main_price: number;
  price_formatted: string;
  main_price_formatted: string;
}


