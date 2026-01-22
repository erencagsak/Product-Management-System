using Microsoft.EntityFrameworkCore;
using ProductApi.Data;
using ProductApi.Models;
using ProductApi.Repositories.Interfaces;

namespace ProductApi.Repositories.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            // Retrieve all products from database
            return await _context.Products.ToListAsync();
        }

        public async Task AddAsync(Product product)
        {
            // Add new product to database
            await _context.Products.AddAsync(product);

            // Save changes to database
            await _context.SaveChangesAsync();
        }
    }
}