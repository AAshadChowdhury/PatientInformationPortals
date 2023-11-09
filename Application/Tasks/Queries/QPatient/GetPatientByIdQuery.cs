using Domain.Models;
using MediatR;


namespace Application.Tasks.Queries.QPatient
{
    public class GetPatientByIdQuery : IRequest<Patient>
    {
        public int Id { get; set; }
    }
}
