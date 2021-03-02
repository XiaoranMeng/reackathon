using AutoMapper;
using MediatR;
using Reackathon.Domain;
using Reackathon.Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Reackathon.Application.Teams
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Team Team { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly ReackathonDbContext _context;
            private readonly IMapper _mapper;

            public Handler(ReackathonDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Team entity = await _context.Teams.FindAsync(request.Team.Id);

                _mapper.Map(request.Team, entity);

                return await _context.SaveChangesAsync() > 0
                    ? Unit.Value
                    : throw new Exception("Failed to edit team");
            }
        }
    }
}
