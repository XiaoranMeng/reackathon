using Reackathon.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Reackathon.Persistence
{
    public class Seeder
    {
        public static async Task SeedAsync(ReackathonDbContext context)
        {
            if (context.Themes.Any()) return;

            List<Theme> themes = new List<Theme>
            {
                new Theme
                {
                    Name = "Test Theme 1",
                    Description = "Test Theme Description 1",
                    Prize = "Test Price 1"
                },
                new Theme
                {
                    Name = "Test Theme 2",
                    Description = "Test Theme Description 2",
                    Prize = "Test Price 2"
                },
                new Theme
                {
                    Name = "Test Theme 3",
                    Description = "Test Theme Description 3",
                    Prize = "Test Price 3"
                }
            };

            await context.Themes.AddRangeAsync(themes);
            await context.SaveChangesAsync();
        }
    }
}
