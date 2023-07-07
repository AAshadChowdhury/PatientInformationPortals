using PatientInformationPortalWebAPI.DAL;
using PatientInformationPortalWebAPI.Interfaces;
using PatientInformationPortalWebAPI.Interfaces.IPatient;
using PatientInformationPortalWebAPI.Repository.PatientRepo;

namespace PatientInformationPortalWebAPI.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
        {
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            return services;

        }
        }
}
