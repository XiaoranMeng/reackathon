using System;

namespace Reackathon.Domain
{
    public class Team : Entity<Guid>
    {
        public string Name { get; set; }

        public string Tagline { get; set; }

        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }
    }
}