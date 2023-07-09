using Microsoft.EntityFrameworkCore;
using PatientInformationPortalWebAPI.DAL;
using PatientInformationPortalWebAPI.Interfaces;
using PatientInformationPortalWebAPI.Models;

namespace PatientInformationPortalWebAPI.Repository
{
    public class Allergies_DetailsRepository : IAllergies_DetailsRepository
    {
        private readonly PatientDbContext _db;

        public Allergies_DetailsRepository(PatientDbContext db)
        {
            _db = db;
        }

        public async Task<int> Add(Allergies_Details entity)
        {
            await _db.Allergies_Details.AddAsync(entity);
            return await _db.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var allergiesDetails = await _db.Allergies_Details.FindAsync(id);
            if (allergiesDetails == null)
                return 0;

            _db.Allergies_Details.Remove(allergiesDetails);
            return await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<Allergies_Details>> GetAll()
        {
            return await _db.Allergies_Details.ToListAsync();
        }

        public async Task<Allergies_Details> GetById(int id)
        {
            return await _db.Allergies_Details.FindAsync(id);
        }

        public async Task<int> Update(Allergies_Details entity)
        {
            _db.Allergies_Details.Update(entity);
            return await _db.SaveChangesAsync();
        }
    }

    public class DiseaseInformationRepository : IDiseaseInformation_Repository
    {
        private readonly PatientDbContext _db;

        public DiseaseInformationRepository(PatientDbContext db)
        {
            _db = db;
        }

        public Task<int> Add(DiseaseInformation entity)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<DiseaseInformation>> GetAll()
        {
            return await _db.DiseaseInformations.ToListAsync();
        }

        public Task<DiseaseInformation> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(DiseaseInformation entity)
        {
            throw new NotImplementedException();
        }
    }

    }
