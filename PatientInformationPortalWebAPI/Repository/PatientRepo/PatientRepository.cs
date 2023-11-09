using Microsoft.EntityFrameworkCore;
using PatientInformationPortalWebAPI.DAL;
using Application.Interfaces.IPatient;
using Domain.Models;

namespace PatientInformationPortalWebAPI.Repository.PatientRepo
{
    public class PatientRepository : IPatientRepository
    {



        private readonly PatientDbContext _context;

        public PatientRepository(PatientDbContext context)
        {
            _context = context;
        }

        public async Task<int> Add(Patient entity)
        {
            await _context.Patients.AddAsync(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
                return 0;

             _context.Patients.Remove(patient);
            return await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Patient>> GetAll()
        {
            return await _context.Patients.ToListAsync();
        }


        public async Task<Patient> GetById(int id)
        {

            return await _context.Patients.Include(p => p.NCDs).Include(p => p.Allergies).FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<int> Update(Patient entity)
        {
            _context.Patients.Update(entity);
            return await _context.SaveChangesAsync();
        }
    }

}

