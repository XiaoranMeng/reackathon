using System;

namespace Reackathon.Domain
{
    public class Team : Entity
    {
        public Guid ProjectId { get; set; }

        public int TableNumber { get; set; }

        public string Name { get; set; }

        public string Tagline { get; set; }

        public string ImageUrl { get; set; }


        public Project Project { get; set; }
    }
}