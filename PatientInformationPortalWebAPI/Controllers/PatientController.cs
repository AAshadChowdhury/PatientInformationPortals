using Microsoft.AspNetCore.Mvc;
using PatientInformationPortalWebAPI.DAL;
using PatientInformationPortalWebAPI.Interfaces.IPatient;
using PatientInformationPortalWebAPI.Models;
using PatientInformationPortalWebAPI.Repository.PatientRepo;
using PatientInformationPortalWebAPI.ViewModels;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PatientInformationPortalWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {

        private readonly PatientDbContext _patinetDbContext;
        private readonly IPatientRepository _PatientRepository;
        public PatientController(PatientDbContext db, IPatientRepository PatientRepository)
        {
            _patinetDbContext = db;
            _PatientRepository = PatientRepository;
        }
        // GET: api/<PatientController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PatientController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PatientController>
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}
        [HttpPost]
        [Route("AddPatient")]
        public async Task<Patient> AddPatient(PatientVM objPatientVM)
        {
            Patient objPatient = new();
            if (objPatientVM != null)
            {
                objPatient.Name = objPatientVM.Name;
                objPatient.Epilepsy = objPatientVM.Epilepsy;
                objPatient.DiseaseInformationId = objPatientVM.DiseaseInformationId;
                List<NCD_Details> NCD_Details = new List<NCD_Details>();
                if (objPatientVM.NCDs != null)
                {
                    foreach (string items in objPatientVM.NCDs)
                    {
                        NCD_Details.Add(new NCD_Details
                        {
                            PatientID = objPatientVM.Id,
                            NCDID = Convert.ToInt32(items)
                        });
                    }
                }
                List<Allergies_Details> Allergies_Details = new List<Allergies_Details>();
                if (objPatientVM.Allergies != null)
                {
                    foreach (string items in objPatientVM.Allergies)
                    {
                        Allergies_Details.Add(new Allergies_Details
                        {
                            PatientID = objPatientVM.Id,
                            AllergiesID = Convert.ToInt32(items)
                        });
                    }
                }
                objPatient.Allergies = Allergies_Details;
                objPatient.NCDs = NCD_Details;


                await _PatientRepository.Upsert(objPatient);
                return objPatient;
            }
            return objPatient;

        }

        // PUT api/<PatientController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PatientController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
