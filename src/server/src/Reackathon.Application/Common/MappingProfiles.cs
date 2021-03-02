using AutoMapper;
using Reackathon.Domain;

namespace Reackathon.Application.Common
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Team, Team>();
        }
    }
}
