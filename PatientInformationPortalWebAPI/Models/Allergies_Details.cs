namespace PatientInformationPortalWebAPI.Models
{
    public class Allergies_Details
    {
        public int Id { get; set; }
        public int PatientID { get; set; }
        public int AllergiesID { get; set; }

        public Patient? Patient { get; set; }
        public Allergies? Allergies { get; set; }
    }
}
