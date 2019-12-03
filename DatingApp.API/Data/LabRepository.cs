using System;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic; 

namespace DatingApp.API.Data
{
    public class LabRepository:ILabRepository
    {
        private readonly DataContext _context;
       
      
        public LabRepository(DataContext context)
        {
          
           
            this._context = context;

        }
          public async Task<bool> Patientregister(Patient Patient)
        {
            var user = await _context.Patients.AddAsync(Patient);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> AddTestGroup(GroupMaster GroupMaster)
        {
            var user = await _context.GroupMasters.AddAsync(GroupMaster);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<GroupMasterDto>> getAllTestGroups()
        {
         
           var GroupMasterDto=await (_context.GroupMasters.Select(xx=>new GroupMasterDto{GroupId=xx.GroupId,GroupName=xx.GroupName}).OrderBy(xx=>xx.GroupName)).ToListAsync();
            return GroupMasterDto;

        }
     public async Task<GroupMaster> GetGroupinfoById(int GroupId)
        {
            var GroupMaster= await _context.GroupMasters.FindAsync(GroupId);
            
             return GroupMaster;

        }

        public async Task<bool> UpdateTestGroupByID(GroupMaster GroupMaster)
        {
            if(GroupMaster.GroupId==null)
                 return false;
             else
             {
                _context.Entry(GroupMaster).State = EntityState.Modified;
                await _context.SaveChangesAsync();
              }
          
            return true;
        }

   
     public async Task<IEnumerable<TestMasterDto>> getTestMaster()
        {
          var TestMasterDto=await (_context.GroupMasters.Join(_context.TestMasters,
            Group=>Group.GroupId,
            Test=>Test.GroupId,
            (Group,Test)=>new TestMasterDto{TestId=Test.TestId,
                                            TestName=Test.TestName,
                                            Unit=Test.Unit,
                                           GroupName=Group.GroupName,
                                           GroupId=Group.GroupId,
                                            NormalRange=Test.NormalRange,
                                            Price=Test.Price
                                            
            })).ToListAsync();
         return TestMasterDto;

        }

   public async Task<string> DeleteGroupById(int id)
        {
           string msg="";
            try
            {
                if (await validateGroupBeforeDelete(id))
                     msg="Failed:Group can't delete as it is assigned one or multiple Test(s) ";
                else
                {
                     _context.GroupMasters.Remove(_context.GroupMasters.Find(id)); 
                     await _context.SaveChangesAsync(); 
                     msg="Sucess";
                }

            }
            catch
            {

            }
         
          
            return msg;
        }
        
         public async Task<bool> validateGroupBeforeDelete(int GroupId)
        {
            if(await _context.TestMasters.AnyAsync(xx=>xx.GroupId==GroupId))
            return true;

            return false;
        }

        public async Task<bool> SaveTestMaster(TestMaster TestMaster)
        {
            if(TestMaster.TestId>0)
            {
                if(await _context.TestMasters.AnyAsync(xx=>xx.TestId==TestMaster.TestId))
                {
                _context.Entry(TestMaster).State = EntityState.Modified;
                await _context.SaveChangesAsync();
                }
            }
            else
            {
            var user = await _context.TestMasters.AddAsync(TestMaster);
            await _context.SaveChangesAsync();  
            }
           
            return true;
        }

        public async Task<string> DeleteTestById(int id)
        {
           string msg="";
            try
            { _context.TestMasters.Remove(_context.TestMasters.Find(id)); 
             await _context.SaveChangesAsync(); 
             msg="Sucess";
            }
            catch
            {
            msg="Failed";
            }
          return msg;
        }
     public async Task<TestMaster> GetTestinfoById(int TestId)
        {
        var TestmasterMaster= await _context.TestMasters.FindAsync(TestId);
         return TestmasterMaster;

        }
          public async Task<bool> SaveReports(ReportData ReportData)
        {
         using (var transaction = _context.Database.BeginTransaction())
         {
             try
            {
            int ReportID=0;
            var ReportInfo = await _context.Reports.AddAsync(ReportData.Report);
            await _context.SaveChangesAsync();
            ReportID=ReportData.Report.ReportID;
            if(ReportID>0)
            {
                foreach (var item in ReportData.ReportDetails)
                {
                    item.ReportID=ReportID;
                    await _context.ReportDetails.AddAsync(item);
                 }
                 await _context.SaveChangesAsync();
            }
            transaction.Commit();
            return true;
            }
             catch (Exception)
            {
            transaction.Rollback();
            return false;
            }

         }}
          public async Task<bool> UpdateReportValues(ReportDetails[] Details)
         {
              foreach (var item in Details)
                {
                     var ReportDetails = new ReportDetails{RptDetailsID =item.RptDetailsID,TestValue=item.TestValue,isHighlight=item.isHighlight};
                    _context.Entry(ReportDetails).Property(x => x.TestValue).IsModified = true;
                    _context.Entry(ReportDetails).Property(x => x.isHighlight).IsModified = true;
                }
             await _context.SaveChangesAsync();
             return true;

        }
         
         public async Task<bool> CompleteReport(int ReportID)
        {
            try{
            var Report = new Report{ReportID =ReportID};
            Report.Status="Completed";
           _context.Entry(Report).Property(x => x.Status).IsModified = true;
             await _context.SaveChangesAsync();
             return true;
            }
            catch
            {
                return false;

            }
 }
        public async Task<IEnumerable<AllReportsInfo>> GetReportsInfo(int CID)
        {
            // var frmdatate = DateTime.Now.AddDays(-LastDays);
            //  var AllReports=await (_context.Reports.Where(xx=>xx.CID==CID
            // && LastDays>0||xx.CreatedDate>=frmdatate).Join(_context.Patients,
            // Rpt=>Rpt.PatientID,
            // Pat=>Pat.Id,

            var AllReports=await (_context.Reports.Where(xx=>xx.CID==CID
           ).Join(_context.Patients,
            Rpt=>Rpt.PatientID,
            Pat=>Pat.Id,
            (Rpt,Pat)=>new AllReportsInfo{ ReportID=Rpt.ReportID,
                                            PatientName=Pat.name,
                                            email=Pat.email,
                                            PatientDOB=Pat.dateofbirth,
                                            PatientGender=Pat.gender,
                                            DoctorID=Rpt.DoctorID,
                                            Status=Rpt.Status,
                                           CreatedDate=Rpt.CreatedDate,
                                           Specimen=Rpt.Specimen
                                          
                                          
                                            
            })
            .OrderByDescending(xx=>xx.CreatedDate)
            ).ToListAsync();
            
            var Result=await (_context.Doctors.Join(AllReports,
            Doc=>Doc.DoctorID,
            AllRept=>AllRept.DoctorID,
            (Doc,AllRept)=>new AllReportsInfo{ ReportID=AllRept.ReportID,
                                            PatientName=AllRept.PatientName,
                                            email=AllRept.email,
                                            PatientDOB=AllRept.PatientDOB,
                                            PatientGender=AllRept.PatientGender,
                                            DoctorID=AllRept.DoctorID,
                                            DoctorName=Doc.Doctorname,
                                            Status=AllRept.Status,
                                           CreatedDate=AllRept.CreatedDate,
                                           Specimen=AllRept.Specimen
                                          
                                          
                                            
            })
            .OrderByDescending(xx=>xx.CreatedDate)
            ).ToListAsync();
            return Result;

        }
         public async Task<IEnumerable<ReportInfo>> getReportDetailsInfo(int ReportID)
        { 
            var AllReportInfo=await (_context.ReportDetails.Where(xx=>xx.ReportID==ReportID).Join(_context.GroupMasters,
            Rpt=>Rpt.GroupId,
            Group=>Group.GroupId,
            (Rpt,Group)=>new ReportInfo{ RptDetailsID=Rpt.RptDetailsID,
                                            groupName=Group.GroupName,
                                            HideNormalvalue=Group.HideNormalvalue,
                                            TestId=Rpt.TestId,
                                            result=Rpt.TestValue,
                                           isHighlight=Rpt.isHighlight
                                          
                                            
            })
      
            ).ToListAsync();

          var Result=await (_context.TestMasters.Join(AllReportInfo,
            Test=>Test.TestId,
            AllRpts=>AllRpts.TestId,

            (Test,AllRpts)=>new ReportInfo{ RptDetailsID=AllRpts.RptDetailsID,
                                            groupName=AllRpts.groupName,
                                            HideNormalvalue=AllRpts.HideNormalvalue,
                                            TestId=Test.TestId,
                                            testName=Test.TestName,
                                            subId=Test.subId,
                                            Unit=Test.Unit,
                                            result=AllRpts.result,
                                           normalRange=Test.NormalRange,
                                           isHighlight=AllRpts.isHighlight
                                          
                                            
            })
            
            ).ToListAsync();
            
            return Result;

        }
    }
}