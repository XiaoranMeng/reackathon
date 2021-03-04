using System;

namespace Reackathon.Domain
{
    public class Project : Entity<Guid>
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string LogoUrl { get; set; }

        public virtual Theme Theme { get; set; }
    }
}
