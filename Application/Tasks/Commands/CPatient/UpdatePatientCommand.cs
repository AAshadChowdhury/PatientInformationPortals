using MediatR;
using Domain.Models;

namespace Application.Tasks.Commands.CPatient
{
    public class UpdatePatientCommand : IRequest<int>
    {
        public Patient patient { get; set; }
    }
}
