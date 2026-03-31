import AddForm from "./_components/add-form";

export default function AddProductPage() {
    return (
        <div className="container mx-auto p-6 my-10">
            <h1 className="text-3xl font-bold mb-6 text-center tracking-tight">Yeni Ürün Ekle</h1>

            <AddForm />
        </div>
    );
}