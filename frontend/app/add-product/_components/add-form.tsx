"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function AddForm() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", price: "", stock: "" });

    // Add Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await fetch(process.env.NEXT_PUBLIC_API_URL!, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.name,
                price: Number(form.price),
                stock: Number(form.stock),
            }),
        });
        
        router.push("/list-product");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow max-w-md mx-auto">
            <Input 
                label="Ürün Adı" 
                value={form.name} 
                onChange={(e) => setForm({...form, name: e.target.value})} 
            />
            <Input 
                label="Fiyat" 
                type="number" 
                value={form.price} 
                onChange={(e) => setForm({...form, price: e.target.value})} 
            />
            <Input 
                label="Stok" 
                type="number" 
                value={form.stock} 
                onChange={(e) => setForm({...form, stock: e.target.value})} 
            />
            
            <div className="flex gap-2">
                <Button type="button" variant="secondary" onClick={() => router.back()}>Vazgeç</Button>
                
                <Button type="submit" className="w-full">Kaydet</Button>
            </div>
        </form>
    );
}