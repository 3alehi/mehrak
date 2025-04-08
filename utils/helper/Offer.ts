export default function calculatePriceDrop(mainPrice: number, price: number): string {
    if (mainPrice <= 0) {
      throw new Error("قیمت قبل باید بزرگتر از صفر باشد.");
    }
  
    const dropPercentage = ((mainPrice - price) / mainPrice) * 100;
    return ` %${dropPercentage.toFixed(0)}`;
  }
  