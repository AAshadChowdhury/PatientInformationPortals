using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PatientInformationPortalWebAPI.DAL;
using PatientInformationPortalWebAPI.Interfaces.IPatient;
using PatientInformationPortalWebAPI.Models;
using PatientInformationPortalWebAPI.ViewModels;

namespace PatientInformationPortalWebAPI.Repository.PatientRepo
{
    public class PatientRepository : IPatientRepository
    {

        private PatientDbContext _db;



        public PatientRepository(PatientDbContext db)
        {

            _db = db;

        }
        public async Task<int> Upsert(Patient entity)
        {
            using IDbContextTransaction transaction = _db.Database.BeginTransaction();
            try
            {

                if (entity.Id < 1)
                {
                    
                    await _db.Patients.AddAsync(entity);
                    foreach (var item in entity.NCDs)
                    {
                        await _db.NCD_Details.AddAsync(item);
                    }
                    foreach (var item in entity.Allergies)
                    {
                        await _db.Allergies_Details.AddAsync(item);
                    }
                }
                else
                {


                    _db.Patients.Update(entity);
                }

                await _db.SaveChangesAsync();

                transaction.Commit();
                return entity.Id;
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw;
            }
        }
    }
}
