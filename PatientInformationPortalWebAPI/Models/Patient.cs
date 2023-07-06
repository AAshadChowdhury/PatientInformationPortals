using System.ComponentModel.DataAnnotations;

namespace PatientInformationPortalWebAPI.Models
{
   
    public class Patient
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage ="Patient name is required")]
        public string? Name { get; set; }


        public int DiseaseInformationId { get; set; }
        public Epilepsy Epilepsy { get; set; }
        public DiseaseInformation? DiseaseInformation { get; set; }
        public ICollection<NCD_Details>? NCDs { get; set; }
        public ICollection<Allergies_Details>? Allergies { get; set; }
    }

    public class DiseaseInformation
    {
        public int Id { get; set; }
        public string? DiseaseName { get; set; }
    }

    public enum Epilepsy
    {
        Yes,
        No

    }

    public class NCD
    {
        public int Id { get; set; }
        public string? NCDName { get; set; }
    }

    public class Allergies
    {
        public int Id { get; set; }
        public string? AllergyName { get; set; }
    }

    public class NCD_Details
    {
        public int Id { get; set; }
        public int PatientID { get; set; }
        public int NCDID { get; set; }

        public Patient? Patient { get; set; }
        public NCD? NCD { get; set; }
    }

    public class Allergies_Details
    {
        public int Id { get; set; }
        public int PatientID { get; set; }
        public int AllergiesID { get; set; }

        public Patient? Patient { get; set; }
        public Allergies? Allergies { get; set; }
    }
}
