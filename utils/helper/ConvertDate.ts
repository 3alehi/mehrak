export function convertDateToPersianFormat(dateString:string) {
    const months = [
        "فروردین", "اردیبهشت", "خرداد", 
        "تیر", "مرداد", "شهریور", 
        "مهر", "آبان", "آذر", 
        "دی", "بهمن", "اسفند"
    ];

    const [year, month, day] = dateString.split("-").map(Number);

    const persianMonth = months[month - 1];

    return ` ${day} ${persianMonth} ${year}`;
}