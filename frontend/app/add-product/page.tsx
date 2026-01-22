import AddForm from "./_components/add-form";

export default function AddProductPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">Yeni Ürün Ekle</h1>
            
            <AddForm />
        </div>
    );
}