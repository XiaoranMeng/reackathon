using MediatR;
using Reackathon.Domain;
using Reackathon.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Reackathon.Application.Teams
{
    public class Create
    {
        public class Command : IRequest
        {
            public Team Team { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ReackathonDbContext _context;

            public Handler(ReackathonDbContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Teams.Add(request.Team);

                return await _context.SaveChangesAsync() > 0
                    ? Unit.Value
                    : throw new Exception("Failed to create team");
            }
        }
    }
}
