using Application.Interfaces;
using Application.Tasks.Queries.QPatient;
using Domain.Models;
using MediatR;


namespace Application.Tasks.Handlers.HPatient
{
    public class GetPatientByIdQueryHandler : IRequestHandler<GetPatientByIdQuery, Patient>
    {
        private readonly IUnitOfWork _unitOfWork;
    

        public GetPatientByIdQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

        public async Task<Patient> Handle(GetPatientByIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Patient.GetById(request.Id);
            return result;
        }
    }
}
