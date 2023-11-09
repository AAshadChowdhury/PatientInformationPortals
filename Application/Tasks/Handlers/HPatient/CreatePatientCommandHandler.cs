using Application.Tasks.Commands.CPatient;
using MediatR;
using Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Tasks.Handlers.HPatient
{

    public class CreatePatientCommandHandler : IRequestHandler<CreatePatientCommand, int>
    {
        private readonly IUnitOfWork _unitOfWork;
       

        public CreatePatientCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            
        }

        public async Task<int> Handle(CreatePatientCommand request, CancellationToken cancellationToken)
        {
         
            var result = await _unitOfWork.Patient.Add(request.patient);
            return result;
        }

    }
}
