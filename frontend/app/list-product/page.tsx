"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import ProductTable from "./_components/product-table";

export default function ListProductPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL!)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Ürün Listesi</h1>
                
                <Link href="/add-product">
                    <Button>+ Yeni Ürün Ekle</Button>
                </Link>
            </div>

            <ProductTable products={products} />
        </div>
    );
}