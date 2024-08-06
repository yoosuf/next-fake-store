export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
}

export interface Category {
    id: number;
    name: string;
    image?: string;
    products?: Product[];
}

export interface CartItem extends Product {
    quantity: number;
}