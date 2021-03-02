using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reackathon.Domain;
using Reackathon.Persistence;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Reackathon.API.Controllers
{
    public class ThemesController : BaseController
    {
        private readonly ReackathonDbContext _context;

        public ThemesController(ReackathonDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Theme>>> List()
        {
            return await _context.Themes.ToListAsync();
        }
    }
}
