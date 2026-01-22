"use client";
import { Product } from "@/types";

export default function ProductTable({ products }: { products: Product[] }) {
    return (
        <div className="overflow-x-auto shadow rounded-lg border">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-100 uppercase text-xs">
                    <tr>
                        <th className="px-6 py-3">Ürün Adı</th>
                        <th className="px-6 py-3">Fiyat</th>
                        <th className="px-6 py-3">Stok</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b bg-white hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                            <td className="px-6 py-4 text-green-600 font-bold">{p.price} ₺</td>
                            <td className="px-6 py-4">{p.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}