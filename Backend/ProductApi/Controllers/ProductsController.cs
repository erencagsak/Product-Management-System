using Microsoft.AspNetCore.Mvc;
using ProductApi.DTOs;
using ProductApi.Services.Interfaces;

namespace ProductApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;

        public ProductsController(IProductService service)
        {
            _service = service;
        }

        // GET: API/Products
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _service.GetAllAsync();
            return Ok(products);
        }

        // POST: API/Products
        [HttpPost]
        public async Task<IActionResult> Create(CreateProductDto dto)
        {
            await _service.AddAsync(dto);

            return Ok(new { message = "Product added successfully." });
        }
    }
}