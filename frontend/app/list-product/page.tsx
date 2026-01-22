"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import ProductTable from "./_components/product-table"; 
import { Product } from "@/types";
import { Plus } from "lucide-react";
import ErrorBoundary from "@/components/utils/error-boundary"; 

export default function ListProductPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL!);
                const data = await response.json();

                setProducts(data);
            } 
            catch (error) {
                console.error("Data retrieval error:", error);
            } 
            finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-6 my-10 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">
                    Ürün Listesi
                </h1>
                
                <Link href="/add-product">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> 
                        
                        Yeni Ürün Ekle
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-500">Yükleniyor...</div>
            ) : (
                <ErrorBoundary>
                    <ProductTable products={products} />
                </ErrorBoundary>
            )}
        </div>
    );
}