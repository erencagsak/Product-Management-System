Product Management System (Task - 1)
Bu proje, .NET 10 (Backend) ve Next.js 16 (Frontend) teknolojileri kullanılarak geliştirilmiştir 
Kullanıcıların ürün ekleyebileceği ve mevcut ürünleri listeleyebileceği bir arayüz sunar.

🚀 Proje Hakkında & Özellikler
- Katmanlı Mimari: Controller - Service - Repository prensiplerine tam uyum.
- Akıllı Fiyat Formatlama: Kullanıcı giriş yaparken otomatik binlik ayracı (Örn: 1.250,00) ve ondalık yönetimi ("Excel Input" mantığı).
- Stok Uyarısı: Stoğu 5'in altına düşen ürünler tabloda kırmızı ile vurgulanır ve uyarı ikonu gösterilir.
- Responsive Tasarım: TailwindCSS ve Shadcn UI ile modern görünüm.

🛠️ Teknolojiler
Backend: .NET Core Version 10
ORM: Entity Framework Core
Veritabanı: MSSQL
Dokümantasyon: Swagger / OpenAPI
Prensipler: SOLID, Dependency Injection, Async/Await

Frontend: Next.js 16 App Router
Dil: TypeScript
Stil: TailwindCSS & Shadcn UI
İkonlar: Lucide React
Http Client: Fetch API

⚙️ Kurulum ve Çalıştırma Rehberi
Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz.

Ön Gereksinimler
.NET 10 SDK
Node.js
SQL Server veya LocalDB

1️⃣ Backend Kurulumu (API)
1- Terminalde Backend klasörüne gidin:

C:\Users\{UserName}\Downloads\Task_1-dev-v1.0.0\Task_1-dev-v1.0.0\Backend\ProductApi

! ProductApi dosyasının içine girin.

2- Paketleri geri yükleyin:
- dotnet restore

3- Projeyi derleyin:
- dotnet build

4- Veritabanını güncelleyin:
- dotnet ef database update

5- Projeyi ayağa kaldırın:
- dotnet run
API varsayılan olarak http://localhost:5253 (veya benzeri bir portta) çalışacaktır.

Swagger Testi: Tarayıcınızda http://localhost:5253/swagger adresine giderek API dokümantasyonunu görebilirsiniz.

2️⃣ Frontend Kurulumu (UI)
1- Yeni bir terminal açın ve terminalde frontend klasörüne gidin:

C:\Users\{UserName}\Downloads\Task_1-dev-v1.0.0\Task_1-dev-v1.0.0\frontend

2- Paketleri geri yükleyin:
- npm install

3- Çevre değişkenlerini ayarlayın:
- Frontend klasörü içinde .env.local adında bir dosya oluşturun.

İçine aşağıdaki satırı ekleyin (Port numarasının Backend ile aynı olduğundan emin olun):
- NEXT_PUBLIC_API_URL=http://localhost:5253/api/products

4- Uygulamayı başlatın:
- npm run dev

Tarayıcıda http://localhost:3000 adresine gidin.

📂 Proje Yapısı
📦 Root
 ┣ 📂 Backend
 ┃ ┗ 📂 ProductApi (Controller, Service, Repository, Entity, DTOs)
 ┣ 📂 Frontend
 ┃ ┣ 📂 app (Next.js Sayfaları)
 ┃ ┣ 📂 components (UI Bileşenleri)
 ┃ ┣ 📂 hooks (Custom Hooks - useProductForm)
 ┃ ┣ 📂 lib (shadcn)
 ┃ ┣ 📂 public (images)
 ┃ ┣ 📂 services (API İstekleri)
 ┃ ┣ 📂 types
 ┗ 📜 README.md