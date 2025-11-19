const BASE_URL = "/api/registerProduct";

export const productService = {
    getProducts: async () => {
        const res = await fetch(BASE_URL, { method: "GET" });
        if (!res.ok) throw new Error("Error fetching products");
        return res.json();
    },
    createProduct: async ({data}:any) => {
        const res = await fetch(BASE_URL, {
            method: "POST",
            body: data, 
        });
        if (!res.ok) throw new Error("Error creating product");
        return res.json();
    }
};
