using Application.Interfaces;
using Application.Interfaces.IPatient;
using Microsoft.Extensions.DependencyInjection;
using MediatR;
//using Microsoft.Extensions.DependencyInjection;
using PatientInformationPortalWebAPI.DAL;
//using Application.Interfaces;
//using Application.Interfaces.IPatient;
using PatientInformationPortalWebAPI.Repository;
using PatientInformationPortalWebAPI.Repository.PatientRepo;
using System.Reflection;
using Application.Tasks.Commands.CPatient;
using Application.Tasks.Handlers.HPatient;

namespace PatientInformationPortalWebAPI.Extensions
{
    public static class ApplicationServiceExtension
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
         IConfiguration config)
        {
            
            // Register repositories
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IDiseaseInformation_Repository, DiseaseInformationRepository>();
            services.AddScoped<IAllergies_DetailsRepository, Allergies_DetailsRepository>();
            services.AddScoped<INCD_DetailsRepository, NCD_DetailsRepository>();

            // Register UnitOfWork
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddMediatR(Assembly.GetExecutingAssembly());
            services.AddMediatR(typeof(CreatePatientCommandHandler).Assembly);
            services.AddMediatR(typeof(DeletePatientCommandHandler).Assembly);
            services.AddMediatR(typeof(GetAllPatientQueryHandler).Assembly);
            services.AddMediatR(typeof(GetPatientByIdQueryHandler).Assembly);
            services.AddMediatR(typeof(UpdatePatientCommandHandler).Assembly);
            //services.AddMediatR(typeof(CreateUserInfoCommand).Assembly);
            return services;

        }
        }
}
