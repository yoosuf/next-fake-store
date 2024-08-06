import { NextApiRequest, NextApiResponse } from 'next';

const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`);
        const products = await response.json();
        res.status(200).json(products);
    } catch (error) {
        console.error(`Error fetching products for category ${id}:`, error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export default productsHandler;