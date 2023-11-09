using Application.Interfaces;
using Application.Tasks.Commands.CPatient;
using MediatR;

namespace Application.Tasks.Handlers.HPatient
{
    public class UpdatePatientCommandHandler : IRequestHandler<UpdatePatientCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;
      

        public UpdatePatientCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
           
        }

        public async Task<int> Handle(UpdatePatientCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Patient.Update(request.patient);
            return result;
        }
    }
}
