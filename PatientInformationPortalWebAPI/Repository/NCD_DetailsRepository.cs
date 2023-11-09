using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PatientInformationPortalWebAPI.DAL;
using Application.Interfaces;
using Domain.Models;

namespace PatientInformationPortalWebAPI.Repository
{

    public class NCD_DetailsRepository : INCD_DetailsRepository
    {
        private readonly PatientDbContext _db;

        public NCD_DetailsRepository(PatientDbContext db)
        {
            _db = db;
        }

        public async Task<int> Add(NCD_Details entity)
        {
            await _db.NCD_Details.AddAsync(entity);
            return await _db.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var ncdDetails = await _db.NCD_Details.FindAsync(id);
            if (ncdDetails == null)
                return 0;

            _db.NCD_Details.Remove(ncdDetails);
            return await _db.SaveChangesAsync();
        }

        public async Task<IEnumerable<NCD_Details>> GetAll()
        {
            return await _db.NCD_Details.ToListAsync();
        }

        public async Task<NCD_Details> GetById(int id)
        {
            return await _db.NCD_Details.FindAsync(id);
        }

        public async Task<int> Update(NCD_Details entity)
        {
            _db.NCD_Details.Update(entity);
            return await _db.SaveChangesAsync();
        }
    }

}
