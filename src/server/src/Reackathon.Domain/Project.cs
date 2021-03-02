using System;

namespace Reackathon.Domain
{
    public class Project : Entity
    {
        public Guid ThemeId { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string ImageUrl { get; set; }


        public Theme Theme { get; set; }
    }
}
