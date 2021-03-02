namespace Reackathon.Domain
{
    public class Team : Entity
    {
        public string Name { get; set; }

        public string Tagline { get; set; }

        public string ImageUrl { get; set; }

        public virtual Project Project { get; set; }
    }
}