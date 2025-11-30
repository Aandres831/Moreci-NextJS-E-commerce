const BASE_URL = "/api";

export const productService = {
    getProducts: async (page = 1, limit = 9) => {
        const res = await fetch(`${BASE_URL}/products?page=${page}&limit=${limit}`, { 
            method: "GET" 
        });
        if (!res.ok) throw new Error("Error fetching products");
        return res.json();
    },
    
    createProduct: async (data: any) => {
        const res = await fetch(`${BASE_URL}/registerProduct`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });
        if (!res.ok) throw new Error("Error creating product");
        return res.json();
    }
};