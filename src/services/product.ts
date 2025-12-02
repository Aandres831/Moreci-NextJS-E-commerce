const API_URL = "/api/products";

export const productService = {

    // Obtener todos los productos (con paginación si la usas)
    async getProducts(page = 1, limit = 10) {
        const res = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
        return await res.json();
    },

    // Crear un producto
    async createProduct(data: any) {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return await res.json();
    },

    async updateProduct(id: string, data: any) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        return await res.json();
    },

    async getProductById(id: string) {
        const res = await fetch(`${API_URL}/${id}`);
        return await res.json();
    },

    async deleteProduct(id: string) {
        const res = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        return await res.json();
    }
};
