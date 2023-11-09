using Application.Tasks.Commands.CPatient;
using MediatR;
using Application.Interfaces;

namespace Application.Tasks.Handlers.HPatient
{
    public class DeletePatientCommandHandler : IRequestHandler<DeletePatientCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeletePatientCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<int> Handle(DeletePatientCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Patient.Delete(request.Id);
            return result;
        }
    }
}
