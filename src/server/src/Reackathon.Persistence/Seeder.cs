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
            if (!context.Themes.Any())
            {
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

            if (!context.Teams.Any())
            {
                List<Team> teams = new List<Team>
                {
                    new Team
                    {
                        Name = "Team 1",
                        Tagline = "Team 1 Tagline",
                        ImageUrl = "Team 1 Image",
                        Project = new Project
                        {
                            Title = "Team 1 Project",
                            Description = "Team 1 project is cool",
                            LogoUrl = "Team 1 project logo",
                            ThemeId = 1
                        }
                    },
                    new Team
                    {
                        Name = "Team 2",
                        Tagline = "Team 2 Tagline",
                        ImageUrl = "Team 2 Image",
                        Project = new Project
                        {
                            Title = "Team 2 Project",
                            Description = "Team 2 project is cool",
                            LogoUrl = "Team 2 project logo",
                            ThemeId = 2
                        }
                    },
                };

                await context.Teams.AddRangeAsync(teams);
                await context.SaveChangesAsync();
            }
        }
    }
}
