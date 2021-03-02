using MediatR;
using Reackathon.Domain;
using Reackathon.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Reackathon.Application.Teams
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                Team entity = await _context.Teams.FindAsync(request.Id);

                if (entity is null)
                    throw new Exception("Not found");

                _context.Teams.Remove(entity);

                return await _context.SaveChangesAsync() > 0
                    ? Unit.Value
                    : throw new Exception("Failed to delete team");
            }
        }
    }
}
