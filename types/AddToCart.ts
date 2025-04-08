type AddToCartData = {
    data: {
      title: string;
      media_files: {
        main_link: string;
      }[];
      price_formatted: string;
      main_price_formatted: string;
      main_price: number;
      price: number;
      in_stock_count: number;
    };
  };