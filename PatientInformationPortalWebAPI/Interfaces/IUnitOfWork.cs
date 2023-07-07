using PatientInformationPortalWebAPI.Interfaces.IPatient;

namespace PatientInformationPortalWebAPI.Interfaces
{
    public interface IUnitOfWork
    {

        #region Ashad

        public IPatientRepository Patient { get; }
       


        #endregion
    }
}
