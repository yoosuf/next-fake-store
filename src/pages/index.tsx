import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { Category, Product } from '@/types';
import BaseLayout from '@/components/Layout/BaseLayout';
import ProductCard from '@/components/Product/ProductCard';

interface HomeProps {
  products: Product[];
  categories: Category[];
}

const Home: React.FC<HomeProps> = ({ products, categories }) => {
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product?.category?.id === parseInt(selectedCategory));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  return (
    <BaseLayout>
      <h1 className="text-2xl font-bold text-gray-800">Products</h1>
      <div className="flex justify-between items-center mb-4">
        <div>
          <label htmlFor="category" className="mr-2">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="bg-white border border-gray-300 rounded px-3 py-2 mr-4"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id.toString()}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2">Sort by Price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={handleSortChange}
            className="bg-white border border-gray-300 rounded px-3 py-2"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedProducts.map((item) => (
          <ProductCard product={item} key={item.id} layout="horizontal" />
        ))}
      </div>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const productsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const products: Product[] = await productsResponse.json();

    const categoriesResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`);
    const categories: Category[] = await categoriesResponse.json();

    return { props: { products, categories } };
  } catch (error) {
    console.error('Error fetching products or categories', error);
    return { props: { products: [], categories: [] } };
  }
};

export default Home;