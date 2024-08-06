import { NextApiRequest, NextApiResponse } from 'next';

const productsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        const products = await response.json();

        const parsedProducts = products.map((product: any) => {
            let images = product.images[0];
            if (images.startsWith('[')) {
                images += !images.endsWith(']') ? ']' : '';
                images = JSON.parse(images);
            } else {
                images = [images];
            }

            // Ensure all images are absolute URLs
            images = images.map((url: string) => {
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    return `https://${url}`;
                }
                return url;
            });

            return { ...product, images };
        });

        res.status(200).json(parsedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export default productsHandler;