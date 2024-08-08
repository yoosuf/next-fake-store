import { NextApiRequest, NextApiResponse } from 'next';

const productHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const product = await response.json();
        res.status(200).json(product);
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

export default productHandler;