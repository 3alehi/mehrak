  interface OrderItem {
    line_item_type: string;
    media_files: { main_link: string }[];
    number: number;
    total_formatted: string;
  }