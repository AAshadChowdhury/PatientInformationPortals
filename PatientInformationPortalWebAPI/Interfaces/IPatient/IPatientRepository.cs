using PatientInformationPortalWebAPI.Models;
using PatientInformationPortalWebAPI.ViewModels;

namespace PatientInformationPortalWebAPI.Interfaces.IPatient
{
    public interface IPatientRepository
    {
        Task<int> Upsert(Patient entity);
    }
}
