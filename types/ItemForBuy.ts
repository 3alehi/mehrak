interface ItemForBuy {
    id: number;
    media_files: {
      main_link: string;
    }[];
    title: string;
    structure_title: string;
    old_main_price: number;
    price: number;
    quantity: number;
    in_stock_count : number ;
    price_formatted : string ;
  }