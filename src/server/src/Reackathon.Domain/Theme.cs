using System;

namespace Reackathon.Domain
{
    public class Theme : Entity<Guid>
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string Prize { get; set; }
    }
}
