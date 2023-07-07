using PatientInformationPortalWebAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace PatientInformationPortalWebAPI.ViewModels
{

    public class PatientViewModel
    {
        public int patientId { get; set; }
        public string Name { get; set; }
        public int DiseaseInformationId { get; set; }
        public Epilepsy Epilepsy { get; set; }
        public List<int> SelectedNCDs { get; set; }
        public List<int> SelectedAllergies { get; set; }
    }
}
