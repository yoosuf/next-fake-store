import { NextApiRequest, NextApiResponse } from 'next';

const categoriesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/categories');
        const categories = await response.json();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export default categoriesHandler;