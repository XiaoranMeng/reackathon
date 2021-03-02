using MediatR;
using Reackathon.Domain;
using Reackathon.Persistence;
using System.Threading;
using System.Threading.Tasks;

namespace Reackathon.Application.Teams
{
    public class Details
    {
        public class Query : IRequest<Team>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Team>
        {
            private readonly ReackathonDbContext _context;

            public Handler(ReackathonDbContext context)
            {
                _context = context;
            }

            public async Task<Team> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Teams.FindAsync(request.Id);
            }
        }
    }

}
