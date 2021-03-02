using MediatR;
using Microsoft.EntityFrameworkCore;
using Reackathon.Domain;
using Reackathon.Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Reackathon.Application.Teams
{
    public class List
    {
        public class Query : IRequest<List<Team>> { }

        public class Handler : IRequestHandler<Query, List<Team>>
        {
            private readonly ReackathonDbContext _context;

            public Handler(ReackathonDbContext context)
            {
                _context = context;
            }

            public async Task<List<Team>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Teams.ToListAsync();
            }
        }
    }
}
