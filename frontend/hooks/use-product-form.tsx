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
  name: boolean;
  price: boolean;
  stock: boolean;
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
    name: false,
    price: false,
    stock: false,
  });

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
        integerPart = new Intl.NumberFormat("tr-TR").format(Number(integerPart));
    }

    let finalValue = integerPart;
    
    if (parts.length > 1) {
        finalValue += "," + parts[1];
    } 
    else if (value.endsWith(",")) {
        finalValue += ",";
    }

    setForm((prev) => ({ ...prev, price: finalValue }));

    if (errors.price) setErrors((prev) => ({ ...prev, price: false }));
  };
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

  // Change Handler
  const handleChange = (field: keyof ProductFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field as keyof ProductFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = {
      name: form.name.trim() === "",
      price: form.price === "",
      stock: form.stock === "",
    };

    if (newErrors.name || newErrors.price || newErrors.stock) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      let priceString = form.price;
      
      priceString = priceString.replaceAll(".", "");
      
      priceString = priceString.replace(",", ".");

      const cleanData = {
        name: form.name,
        price: Number(priceString),
        stock: Number(form.stock),
      };

      await productService.createProduct(cleanData);

      router.push("/list-product");

      router.refresh();

    } 
    catch (error) {
      console.error("Save error:", error);

      alert("Hata oluştu.");
    } 
    finally {
      setLoading(false);
    }
  };

  return {
    form,
    errors,
    loading,
    handleChange,
    handlePriceChange,
    handlePriceBlur,
    handleFocus,
    handleSubmit,
  };
};