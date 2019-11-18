using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using System.Collections.Generic; 

namespace DatingApp.API.Data
{
    public interface ILabRepository
    {
         Task<bool> AddTestGroup(GroupMaster GroupMaster);
        Task<IEnumerable<GroupMasterDto>> getAllTestGroups();
        Task <GroupMaster> GetGroupinfoById(int GroupId);
         Task<bool> UpdateTestGroupByID(GroupMaster GroupMaster);
        Task<string> DeleteGroupById(int id);
        Task<IEnumerable<TestMasterDto>> getTestMaster();
        Task<bool> SaveTestMaster(TestMaster TestMaster);
         Task<string> DeleteTestById(int id);
         Task <TestMaster> GetTestinfoById(int TestId);
        Task<bool> Patientregister(Patient Patient);
        Task<bool> SaveReports(ReportData ReportData);
          Task<bool> UpdateReportValues(ReportDetails[] Details);
          Task<bool> CompleteReport(int ReportID);
       Task<IEnumerable<AllReportsInfo>> GetReportsInfo(int CID);
         Task<IEnumerable<ReportInfo>> getReportDetailsInfo(int ReportID);
    }
}