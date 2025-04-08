interface BookItem {
    id: number;
    title: string;
    main_price_formatted: string;
    price_formatted: string;
    price: number;
    main_price: number;
    media_files: { main_link: string }[];
  }
  