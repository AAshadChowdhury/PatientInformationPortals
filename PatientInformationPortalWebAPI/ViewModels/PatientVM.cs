using System.ComponentModel.DataAnnotations;

namespace PatientInformationPortalWebAPI.ViewModels
{
   
    public class PatientVM
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Patient name is required")]
        public string? Name { get; set; }


        public int DiseaseInformationId { get; set; }
        public string Epilepsy { get; set; }
        
        public string[] NCDs { get; set; }
        public string[] Allergies { get; set; }
      
    }
}
