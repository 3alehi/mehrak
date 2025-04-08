
export default function AddProduct(newProduct) {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    
    if (!Array.isArray(products)) {
        products = [];
    }
    
    if (!products.some(product => product.id === newProduct.id)) {
        products.push(newProduct);
    }
    
    while (products.length > 20) {
        products.shift();
    }
    
    localStorage.setItem('products', JSON.stringify(products)); 
}

export function getProducts() {
    let products = JSON.parse(localStorage.getItem('products') || '[]');
    return Array.isArray(products) ? products : [];
}

export function clearProducts() {
    localStorage.removeItem('products');
}

export function removeProductById(productId) {
    let products= JSON.parse(localStorage.getItem('products') || '[]');
    
    if (!Array.isArray(products)) {
        products = [];
    }
    
    products = products.filter(product => product.id !== productId);
    
    localStorage.setItem('products', JSON.stringify(products));
}
