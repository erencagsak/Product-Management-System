"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productService } from "@/services/product-service";

interface ProductFormState {
  name: string;
  price: string;
  stock: string;
}

interface ProductFormErrors {
  name: string | null;
  price: string | null;
  stock: string | null;
}

export const useProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [form, setForm] = useState<ProductFormState>({
    name: "",
    price: "00,00",
    stock: "",
  });

  const [errors, setErrors] = useState<ProductFormErrors>({
    name: null,
    price: null,
    stock: null,
  });

  const LIMITS = {
    NAME_MAX: 60,
    PRICE_MAX: 100000000,
    STOCK_MAX: 100000
  };

  // Price Handler
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9,]/g, "");

    const commaCount = (value.match(/,/g) || []).length;
    if (commaCount > 1) return;

    if (value === "") {
      setForm((prev) => ({ ...prev, price: "" }));

      return;
    }

    const parts = value.split(","); 
    let integerPart = parts[0];
    
    if (integerPart !== "") {
        const cleanInteger = integerPart.replace(/\./g, "");

        integerPart = new Intl.NumberFormat("tr-TR").format(Number(cleanInteger));
    }

    let finalValue = integerPart;

    if (parts.length > 1) finalValue += "," + parts[1];
    else if (value.endsWith(",")) finalValue += ",";

    setForm((prev) => ({ ...prev, price: finalValue }));
    
    if (errors.price) setErrors((prev) => ({ ...prev, price: null }));
  };

  // Blur Handler
  const handlePriceBlur = () => {
    if (form.price === "") return;
    let cleanValue = form.price.replaceAll(".", "").replace(",", ".");
    let numberValue = parseFloat(cleanValue);
    if (isNaN(numberValue)) return;

    const formatted = new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    }).format(numberValue);

    setForm((prev) => ({ ...prev, price: formatted }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleStockKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const invalidChars = ["e", "E", "+", "-", "."];
    if (invalidChars.includes(e.key)) e.preventDefault();
  };

  // Change Handler
  const handleChange = (field: keyof ProductFormState, value: string) => {
    if (field === "stock") value = value.replace(/\D/g, "");
    
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof ProductFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ProductFormErrors = {
      name: null,
      price: null,
      stock: null,
    };

    let hasError = false;

    if (form.name.trim() === "") {
        newErrors.name = "Ürün adı zorunludur.";

        hasError = true;
    } 
    else if (form.name.length > LIMITS.NAME_MAX) {
        newErrors.name = `Ürün adı en fazla ${LIMITS.NAME_MAX} karakter olabilir.`;

        hasError = true;
    }

    let priceString = form.price.replaceAll(".", "").replace(",", ".");
    let priceNumber = Number(priceString);

    if (form.price === "" || form.price === "00,00" || priceNumber === 0) {
        newErrors.price = "Geçerli bir fiyat giriniz.";

        hasError = true;
    } 
    else if (priceNumber > LIMITS.PRICE_MAX) {
        newErrors.price = `Fiyat çok yüksek! (Max: ${new Intl.NumberFormat("tr-TR").format(LIMITS.PRICE_MAX)} ₺)`;
        
        hasError = true;
    }

    let stockNumber = Number(form.stock);

    if (form.stock === "") {
        newErrors.stock = "Stok adedi zorunludur.";

        hasError = true;
    } 
    else if (stockNumber > LIMITS.STOCK_MAX) {
        newErrors.stock = `Stok çok fazla! (Max: ${LIMITS.STOCK_MAX})`;

        hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);

      return;
    }

    setLoading(true);

    try {
      const cleanData = {
        name: form.name,
        price: priceNumber,
        stock: stockNumber,
      };

      await productService.createProduct(cleanData);

      router.push("/list-product");
      router.refresh();

    } catch (error) {
      console.error("Save error:", error);

      alert("Sunucu hatası: İşlem gerçekleştirilemedi.");
    } 
    finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    LIMITS,
    handleChange,
    handlePriceChange,
    handlePriceBlur,
    handleFocus,
    handleStockKeyDown,
    handleSubmit,
  };
};