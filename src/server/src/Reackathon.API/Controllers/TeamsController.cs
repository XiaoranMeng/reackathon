using Microsoft.AspNetCore.Mvc;
using Reackathon.Application.Teams;
using Reackathon.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Reackathon.API.Controllers
{
    public class TeamsController : BaseController
    {
        [HttpGet]
        public async Task<ActionResult<List<Team>>> List() =>
            await Mediator.Send(new List.Query());

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> Details(Guid id) =>
            await Mediator.Send(new Details.Query { Id = id });

        [HttpPost]
        public async Task<IActionResult> Create(Team team) =>
            Ok(await Mediator.Send(new Create.Command { Team = team }));

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id) =>
            Ok(await Mediator.Send(new Delete.Command { Id = id }));

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Team team, Guid id)
        {
            team.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Team = team }));
        }
    }
}
