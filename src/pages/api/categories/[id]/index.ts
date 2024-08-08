import { NextApiRequest, NextApiResponse } from 'next';

const categoryHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`);
        const category = await response.json();
        res.status(200).json(category);
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

export default categoryHandler;