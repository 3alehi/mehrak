interface ItemForBuy {
  id: number;
  title: string;
  structure_title: string;
  media_files: {
    main_link: string;
    conversion_links: {
      large_thumbnail_260_260: string;
    };
  }[];
  price: number;
  main_price: number; 
  price_formatted:number;
  quantity: number;
  in_stock_count: number;
}
