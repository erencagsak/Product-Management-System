using ProductApi.Models;

namespace ProductApi.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();

        Task AddAsync(Product product);
    }
}