"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardDescription } from "@/components/ui/card";
import { Save, ArrowLeft, Tag, Layers } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProductForm } from "@/hooks/use-product-form";

export default function AddForm() {
  const router = useRouter();

  const { form, errors, loading, handleChange, handlePriceChange, handlePriceBlur, handleFocus, handleSubmit } = useProductForm();

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-white ring-1 ring-gray-100 rounded-xl mt-10">
      <CardHeader className="text-center pb-8 border-b border-gray-50 ">
        <CardDescription className="text-gray-500">
          Listeye yeni bir ürün eklemek için bilgileri giriniz.
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit} noValidate>
        <CardContent className="space-y-6 pt-8 px-8">
          <div className="space-y-2">
            <Label htmlFor="name" className={`text-sm font-medium ${errors.name ? "text-red-600" : "text-gray-700"}`}>Ürün Adı</Label>

            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

              <Input 
                id="name" 
                placeholder="Örn: Peştemal" 
                value={form.name} 
                onChange={(e) => handleChange("name", e.target.value)}
                className={`h-11 pl-10 transition-all ${errors.name ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : "focus-visible:ring-blue-500"}`}
              />
            </div>
            
            {errors.name && <p className="text-xs text-red-500 font-medium">Lütfen ürün adını giriniz.</p>}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className={`text-sm font-medium ${errors.price ? "text-red-600" : "text-gray-700"}`}>Fiyat</Label>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₺</div>

                <Input 
                  id="price" 
                  type="text" 
                  inputMode="decimal"
                  placeholder="0,00" 
                  value={form.price} 
                  onChange={handlePriceChange}
                  onBlur={handlePriceBlur}
                  onFocus={handleFocus}
                  className={`h-11 pl-8 font-mono font-medium transition-all ${errors.price ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : "focus-visible:ring-blue-500"}`}
                />
              </div>

              {errors.price && <p className="text-xs text-red-500 font-medium">Fiyat giriniz.</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className={`text-sm font-medium ${errors.stock ? "text-red-600" : "text-gray-700"}`}>Stok</Label>

              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input 
                  id="stock" 
                  type="number" 
                  placeholder="0" 
                  value={form.stock} 
                  onChange={(e) => handleChange("stock", e.target.value)}
                  className={`h-11 pl-10 transition-all ${errors.stock ? "border-red-500 bg-red-50 focus-visible:ring-red-500" : "focus-visible:ring-blue-500"}`}
                />
              </div>

              {errors.stock && <p className="text-xs text-red-500 font-medium">Stok giriniz.</p>}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-6 pb-8 px-8 border-t border-gray-50 bg-gray-50/30 rounded-b-xl">
          <Button variant="ghost" type="button" onClick={() => router.back()} className="h-10 px-6 text-gray-600 hover:text-gray-900 hover:bg-gray-200">
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            
            İptal
          </Button>

          <Button type="submit" disabled={loading} className="h-10 px-8 bg-blue-600 hover:bg-blue-700 shadow-md transition-all">
            <Save className="mr-2 h-4 w-4" /> 
            
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}