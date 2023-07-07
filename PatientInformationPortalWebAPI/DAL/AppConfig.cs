using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using PatientInformationPortalWebAPI.Interfaces;
using PatientInformationPortalWebAPI.Interfaces.IPatient;
using System.Data;
using System.Data.Common;
using System.Reflection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PatientInformationPortalWebAPI.DAL
{
    public class AppConfig
    {
      
       
        public static string DefaultConnection = "Data Source = (localdb)\\MSSQLLocalDB; database = Patientdb;Integrated Security=false;Trusted_Connection=true;MultipleActiveResultSets=true;";
    }
    public interface IApplicationReadDbConnection
    {
        Task<IReadOnlyList<T>> QueryAsync<T>(string sql, object param = null, CancellationToken cancellationToken = default);
        Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, CancellationToken cancellationToken = default);
        Task<T> QuerySingleAsync<T>(string sql, object param = null, CancellationToken cancellationToken = default);
    }

    public interface IApplicationWriteDbConnection : IApplicationReadDbConnection
    {
        Task<int> ExecuteAsync(string sql, object param = null, CancellationToken cancellationToken = default);
    }



   


}
