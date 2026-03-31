"use client";

import { Product } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { AlertCircle, PackageOpen } from "lucide-react";

const formatPrice = (price: number) => {
    const formattedNumber = new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(price);

    return `${formattedNumber} ₺`; 
};

export default function ProductTable({ products }: { products: Product[] }) {
    return (
        <Card className="overflow-hidden shadow-md p-0 border border-gray-200 rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-100 hover:bg-gray-100">
                        <TableHead className="w-24 py-3 h-auto font-bold text-gray-900 border-b border-r border-gray-300 text-center last:border-r-0">
                            ID
                        </TableHead>

                        <TableHead className="py-3 h-auto font-bold text-gray-900 border-b border-r border-gray-300 text-center last:border-r-0">
                            Ürün Adı
                        </TableHead>

                        <TableHead className="py-3 h-auto font-bold text-gray-900 border-b border-r border-gray-300 text-center last:border-r-0">
                            Fiyat
                        </TableHead>

                        <TableHead className="py-3 h-auto font-bold text-gray-900 border-b border-r border-gray-300 text-center last:border-r-0">
                            Stok
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {products.map((product) => {
                        const isLowStock = product.stock <= 5;

                        return (
                            <TableRow 
                                key={product.id} 
                                className={`transition-colors border-b last:border-0 ${
                                    isLowStock 
                                        ? "bg-red-50 hover:bg-red-100"
                                        : "hover:bg-blue-50/30"
                                }`}
                            >
                                <TableCell className="py-3 font-medium text-gray-900 border-r border-gray-200 text-center last:border-r-0">
                                    {product.id}
                                </TableCell>

                                <TableCell className="py-3 text-gray-700 border-r border-gray-200 text-center last:border-r-0">
                                    <div className="flex items-center justify-center gap-2">
                                        {product.name}

                                        {isLowStock && (
                                            <span title="Kritik Stok!" className="text-red-500">
                                                <AlertCircle className="w-4 h-4" />
                                            </span>
                                        )}
                                    </div>
                                </TableCell>

                                <TableCell className="text-green-600 font-bold py-3 border-r border-gray-200 text-center last:border-r-0">
                                    {formatPrice(product.price)}
                                </TableCell>

                                <TableCell className={`py-3 border-r border-gray-200 text-center last:border-r-0 ${
                                    isLowStock ? "text-red-600 font-bold" : "text-gray-700"
                                }`}>
                                    {product.stock} {isLowStock && " adet!"}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                    
                    {products.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="h-48 text-center border-none">
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <PackageOpen className="h-12 w-12 mb-2 opacity-50" />
                                    <p>Henüz ürün eklenmemiş.</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Card>
    );
}