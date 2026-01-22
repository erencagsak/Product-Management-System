"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL!);
        if (!res.ok) throw new Error("Data couldn't be retrieved.");

        const data = await res.json();
        setProducts(data);
      } 
      catch (error) {
        console.error("Hata:", error);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Product List
      </h1>

      {/* New Product */}
      <div className="flex justify-end mb-4">
        <a
          href="/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          + Add New Product
        </a>
      </div>

      {/* Products */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-green-600 font-bold">
                  {product.price} ₺
                </td>
                <td className="px-6 py-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {products.length === 0 && (
          <p className="text-center p-4">There are no products to list.</p>
        )}
      </div>
    </main>
  );
}