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
         
           var GroupMasterDto=await (_context.GroupMasters.Select(xx=>new GroupMasterDto{GroupId=xx.GroupId,GroupName=xx.GroupName})).ToListAsync();
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

         }

           
        }

        public async Task<IEnumerable<AllReportsInfo>> GetReportsInfo(int CID)
        {
            var AllReports=await (_context.Reports.Join(_context.Patients,
            Rpt=>Rpt.PatientID,
            Pat=>Pat.Id,
            (Rpt,Pat)=>new AllReportsInfo{ ReportID=Rpt.ReportID,
                                            PatientName=Pat.name,
                                            DoctorID=Rpt.DoctorID,
                                            Status=Rpt.Status,
                                           CreatedDate=Rpt.CreatedDate
                                          
                                            
            })
            .Where(Rpt=>_context.Reports.Any(xx => xx.CID == CID)
            )
            ).ToListAsync();
            
            var Result=await (_context.Doctors.Join(AllReports,
            Doc=>Doc.DoctorID,
            AllRept=>AllRept.DoctorID,
            (Doc,AllRept)=>new AllReportsInfo{ ReportID=AllRept.ReportID,
                                            PatientName=AllRept.PatientName,
                                            DoctorID=AllRept.DoctorID,
                                            DoctorName=Doc.Doctorname,
                                            Status=AllRept.Status,
                                           CreatedDate=AllRept.CreatedDate
                                          
                                            
            })
            
            ).ToListAsync();
            return Result;

        }
    }
}