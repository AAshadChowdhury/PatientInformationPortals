using MediatR;

namespace Application.Tasks.Commands.CPatient
{
    public class DeletePatientCommand : IRequest<int>
    {
        public int Id { get; set; }
    }
}
