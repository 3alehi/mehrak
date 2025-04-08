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
  
  interface BookItem {
    id: number;
    title: string;
    items: CollectionItem[];
    media_files: MediaFile[];
  }