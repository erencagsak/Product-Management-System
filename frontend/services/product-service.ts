const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export interface CreateProductDTO {
    name: string;
    price: number;
    stock: number;
}

export const productService = {
    createProduct: async (data: CreateProductDTO) => {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            throw new Error("API Error");
        }
        
        return response.json();
    },

    getProducts: async () => {
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Data couldn't be retrieved.");
        
        return response.json();
    },
};