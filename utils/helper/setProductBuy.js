export function saveObject(value) {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];

    const existingProduct = existingData.find(item => item.id === value.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        value.quantity = 1;
        existingData.push(value);
    }

    localStorage.setItem('buyProduct', JSON.stringify(existingData));
}

export function getquantityById(id) {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];

    const existingProduct = existingData.find(item => item.id == id);

    if (existingProduct) {
        return existingProduct.quantity;
    } else {
        return null; 
    }
}
export function increasequantityById(id) {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];

    const existingProduct = existingData.find(item => item.id == id);

    if (existingProduct) {
        existingProduct.quantity += 1; // افزایش مقدار quantity
        localStorage.setItem('buyProduct', JSON.stringify(existingData)); // ذخیره دوباره در localStorage
    } 
}
export function MinesquantityById(id) {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];

    const existingProduct = existingData.find(item => item.id == id);

    if (existingProduct) {
        existingProduct.quantity -= 1; // افزایش مقدار quantity
        localStorage.setItem('buyProduct', JSON.stringify(existingData)); // ذخیره دوباره در localStorage
    } 
}
export function getTotalquantity() {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];
    
    return existingData.reduce((total, item) => total + item.quantity, 0);
}
export function getAllProducts() {
    if (typeof window !== "undefined") { // Ensure this runs only on the client side
      let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];
      return existingData;
    }
    return []; // Return empty array if not on the client side
  }
export function deleteProductById(id) {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];
    
    existingData = existingData.filter(item => item.id !== id);

    localStorage.setItem('buyProduct', JSON.stringify(existingData));
}
export function getTotalPrice() {
    if (typeof window !== "undefined") { // Ensure this runs only on the client side
      let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];
      return existingData.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    return 0; // Return 0 if not on the client side
  }

export function prevTotalPrice() {
    let existingData = JSON.parse(localStorage.getItem('buyProduct')) || [];

    return existingData.reduce((total, item) => total + (item.price * item.main_price), 0);
}
