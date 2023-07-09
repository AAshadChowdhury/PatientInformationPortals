using Microsoft.EntityFrameworkCore;
using PatientInformationPortalWebAPI.Interfaces;
using PatientInformationPortalWebAPI.Interfaces.IPatient;
using PatientInformationPortalWebAPI.Repository;

namespace PatientInformationPortalWebAPI.DAL
{

    public class UnitOfWork : IUnitOfWork
    {
        private readonly PatientDbContext _context;

        public IPatientRepository Patient { get; }
        public IDiseaseInformation_Repository DiseaseInformationRepository { get; }
        public IAllergies_DetailsRepository Allergies_DetailsRepository { get; }
        public INCD_DetailsRepository NCD_DetailsRepository { get; }

        public UnitOfWork(PatientDbContext context, IPatientRepository patientRepository, INCD_DetailsRepository ncdDetailsRepository, IAllergies_DetailsRepository allergiesDetailsRepository, IDiseaseInformation_Repository diseaseInformationRepository)
        {
            _context = context;
            Patient = patientRepository;
            NCD_DetailsRepository = ncdDetailsRepository;
            Allergies_DetailsRepository = allergiesDetailsRepository;
            DiseaseInformationRepository = diseaseInformationRepository;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }

}
