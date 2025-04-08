export function formatPhoneNumber(phoneNumber: string): string {
    if (phoneNumber.startsWith("+98")) {
        return "0" + phoneNumber.slice(3);
    }

    return phoneNumber;
}