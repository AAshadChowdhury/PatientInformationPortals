using PatientInformationPortalWebAPI.DAL;
using PatientInformationPortalWebAPI.Interfaces;
using PatientInformationPortalWebAPI.Interfaces.IPatient;
using PatientInformationPortalWebAPI.Repository;
using PatientInformationPortalWebAPI.Repository.PatientRepo;

namespace PatientInformationPortalWebAPI.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
        {
            // Register repositories
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IAllergies_DetailsRepository, Allergies_DetailsRepository>();
            services.AddScoped<INCD_DetailsRepository, NCD_DetailsRepository>();

            // Register UnitOfWork
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            return services;

        }
        }
}
