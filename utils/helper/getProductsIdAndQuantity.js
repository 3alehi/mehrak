export function getProductsIdAndQuantity() {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];

    return existingData.map(item => ({
        id: item.id,
        quantity: item.quantity
    }));
}
