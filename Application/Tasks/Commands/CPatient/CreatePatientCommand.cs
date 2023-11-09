using System;
using MediatR;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Models;

namespace Application.Tasks.Commands.CPatient
{

    public class CreatePatientCommand : IRequest<int>
    {
        public Patient patient { get; set; }
    }
}
