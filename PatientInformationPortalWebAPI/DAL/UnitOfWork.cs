using PatientInformationPortalWebAPI.Interfaces;
using PatientInformationPortalWebAPI.Interfaces.IPatient;

namespace PatientInformationPortalWebAPI.DAL
{
    public class UnitOfWork:IUnitOfWork
    {
        public UnitOfWork(IPatientRepository patient)
        {
            Patient=patient;
        }
        public IPatientRepository Patient { get; }
    }
}
