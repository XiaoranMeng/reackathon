using Microsoft.EntityFrameworkCore;
using Reackathon.Domain;

namespace Reackathon.Persistence
{
    public class ReackathonDbContext : DbContext
    {
        public ReackathonDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Theme> Themes { get; set; }
    }
}
