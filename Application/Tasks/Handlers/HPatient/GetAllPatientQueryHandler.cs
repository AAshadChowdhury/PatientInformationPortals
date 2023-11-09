using Application.Interfaces;
using Application.Tasks.Queries.QPatient;
using Domain.Models;
using MediatR;


namespace Application.Tasks.Handlers.HPatient
{
    public class GetAllPatientQueryHandler : IRequestHandler<GetAllPatientQuery, List<Patient>>
    {
        private readonly IUnitOfWork _unitOfWork;
      

        public GetAllPatientQueryHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

        public async Task<List<Patient>> Handle(GetAllPatientQuery request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Patient.GetAll();
            return result.ToList();
        }
    }
}
