using Microsoft.AspNetCore.Mvc;
using Application.Interfaces;
using PatientInformationPortalWebAPI.ViewModels;
using System.Text.Json.Serialization;
using System.Text.Json;
using Azure;
using MediatR;
using Application.Tasks.Commands.CPatient;
using Domain.Models;
using Application.Tasks.Queries.QPatient;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PatientInformationPortalWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMediator _mediator;
        public PatientController(IUnitOfWork unitOfWork, IMediator mediator)
        {
            
            _unitOfWork = unitOfWork;
            _mediator = mediator;
        }
        // GET: api/<PatientController>
      
        [HttpGet]
        public async Task<IEnumerable<Patient>> Get()
        {
            // Fetch patient data from your data source
            //var patients =  await _unitOfWork.Patient.GetAll();
            var patients =  await _mediator.Send(new GetAllPatientQuery());

            // Return the list of patients as the response
            return patients;
        }
        
        [HttpGet]
        [Route("DiseaseInformation")]
        public async Task<IEnumerable<DiseaseInformation>> GetAllDiseaseForDropDown()
        {
            // Fetch diseaseInformations data from your data source
            var diseaseInformations = await _unitOfWork.DiseaseInformationRepository.GetAll();

            // Return the list of diseaseInformations as the response
            return diseaseInformations;
        }


        // GET api/<PatientController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var options = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.Preserve,
                MaxDepth = 32
            };

            //var patient =  _unitOfWork.Patient.GetById(id);
            var patient = await _mediator.Send(new GetPatientByIdQuery() { Id = id });
            if (patient == null)
            {
                return NotFound();
            }

            var json = JsonSerializer.Serialize(patient, options);

            return Ok(json);
        }

     
       


        [HttpPost]
        [Route("AddPatient")]
        public async Task<PatientViewModel> Create(PatientViewModel model)
        {
            if (ModelState.IsValid)
            {
                var patient = new Patient
                {
                    Name = model.Name,
                    DiseaseInformationId = model.DiseaseInformationId,
                    Epilepsy = model.Epilepsy.ToString()
                };

                // Save patient to the database
                //await _unitOfWork.Patient.Add(patient);
                var patientID = await _mediator.Send(new CreatePatientCommand() { patient = patient });
                //_unitOfWork.SaveChanges();

                // Retrieve the assigned patient ID
                var patientId = patient.Id;

                // Save NCD and Allergies details
                foreach (var ncdId in model.SelectedNCDs)
                {
                    var ncdDetails = new NCD_Details
                    {
                        PatientID = patientId,
                        NCDID = ncdId
                    };
                    await _unitOfWork.NCD_DetailsRepository.Add(ncdDetails);
                }

                foreach (var allergyId in model.SelectedAllergies)
                {
                    var allergiesDetails = new Allergies_Details
                    {
                        PatientID = patientId,
                        AllergiesID = allergyId
                    };
                    await _unitOfWork.Allergies_DetailsRepository.Add(allergiesDetails);
                }

                _unitOfWork.SaveChanges();

            }

            return model;
        }


       
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PatientViewModel model)
        {
            if (id != model.patientId)
            {
                return BadRequest();
            }

        
            // Retrieve the patient from the database based on the ID, including related NCDs and Allergies
            //var patient = _unitOfWork.Patient.GetById(id).Result;
            var patient = await _mediator.Send(new GetPatientByIdQuery(){ Id = id});
            if (patient == null)
            {
                return NotFound();
            }

            // Update the patient properties based on the model
            patient.Name = model.Name;
            patient.DiseaseInformationId = model.DiseaseInformationId;
            patient.Epilepsy = model.Epilepsy.ToString();
            //await _unitOfWork.Patient.Update(patient);
            var patientID = await _mediator.Send(new UpdatePatientCommand() { patient = patient });
            //_unitOfWork.SaveChanges();

            // Update NCDs and Allergies based on the SelectedNCDs and SelectedAllergies in the model
            // Clear existing NCDs and Allergies for the patient
            patient.NCDs.Clear();
            patient.Allergies.Clear();

            // Add new NCDs for the patient
            foreach (var ncdId in model.SelectedNCDs)
            {
                var ncdDetails = new NCD_Details
                {
                    PatientID = id,
                    NCDID = ncdId
                };
                patient.NCDs.Add(ncdDetails);
            }

            // Add new Allergies for the patient
            foreach (var allergyId in model.SelectedAllergies)
            {
                var allergiesDetails = new Allergies_Details
                {
                    PatientID = id,
                    AllergiesID = allergyId
                };
                patient.Allergies.Add(allergiesDetails);
            }

            _unitOfWork.SaveChanges();

            // Return a success response
            return Ok(new { success = true, message = "Patient Updated successfully" });
        }



        // DELETE api/<PatientController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Perform the logic to delete the patient with the specified ID
            try
            {
                // Retrieve the patient from the database based on the ID, including related NCDs and Allergies
                //var patient = _unitOfWork.Patient.GetById(id).Result;

                var patient= await _mediator.Send(new GetPatientByIdQuery() { Id = id });

                if (patient == null)
                {
                    // Patient not found, return appropriate response
                    return NotFound();
                }
                // Delete the related NCDs and Allergies first
                foreach (var ncd in patient.NCDs.ToList())
                {
                    await _unitOfWork.NCD_DetailsRepository.Delete(ncd.Id);
                }

                foreach (var allergy in patient.Allergies.ToList())
                {
                    await _unitOfWork.Allergies_DetailsRepository.Delete(allergy.Id);
                }

                // Delete the patient from the database
                //await _unitOfWork.Patient.Delete(id);
                var patientID = await _mediator.Send(new DeletePatientCommand() { Id = id });
                //await _unitOfWork.SaveChanges();

                // Return a success response
                return Ok(new { success = true, message = "Patient deleted successfully" });
            }
            catch (Exception ex)
            {
                // Handle any exceptions that occurred during the deletion process
                return StatusCode(500, $"An error occurred while deleting the patient: {ex.Message}");
            }
        }

    }
}
