namespace PatientInformationPortalWebAPI.Models
{
    public class NCD_Details
    {
        public int Id { get; set; }
        public int PatientID { get; set; }
        public int NCDID { get; set; }

        public Patient? Patient { get; set; }
        public NCD? NCD { get; set; }
    }
}
