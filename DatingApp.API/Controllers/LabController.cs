using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Data;
using DatingApp.API.DTO;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class LabController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILabRepository _labrep;
        private readonly IAuthRepository _repo;
     public LabController(DataContext context,IAuthRepository repo,ILabRepository labrep)
        {_labrep = labrep;
         _repo = repo;
          _context = context;
         }
       
     
     [HttpGet("Doctors")]
    public async Task<IActionResult> GetDoctors()
        { var doc= await _context.Doctors.ToListAsync();
          return Ok(doc);
          }
      
        [HttpPost("Patientregister")]
        public async Task<IActionResult> Patientregister( [FromBody] Patient Patient )
        {
            try{
            var createuser =await _labrep.Patientregister(Patient);
            return StatusCode(201);
            }
            catch(Exception ex)
            {
                return StatusCode(500);
            }
          
        }
 [HttpGet("patientinfo")]
 public async Task<IActionResult> patientinfo()
{
 var patient= await _context.Patients.ToListAsync();
return Ok(patient);

 }

 [HttpGet("SearchPatientbyName/{name}")]
 public async Task<IActionResult> SearchPatientbyName(string name)
{
 //var patient= await _context.Patients.ToListAsync();
 var patient= await _context.Patients.Where(xx => xx.name.Contains(name)).OrderBy(xx=>xx.name).ToListAsync();
return Ok(patient);
}
        
 [HttpGet]
 [Route("GetpatientinfobyID/{Id:int}")]
 public async Task<ActionResult<PatientDto>> getPatientinfoById(int Id)
{ var patient= await _context.Patients.FindAsync(Id);
 if(patient==null)
 {
     return NotFound();
 }
 return Ok(patient);

}
 [HttpPut("UpdatePatientinfoById")]
    public async Task<IActionResult> UpdatePatientinfoById([FromBody] Patient Patient)
    {
    if (Patient.Id==null)
    {
        return BadRequest();
    }
    _context.Entry(Patient).State = EntityState.Modified;
    _context.Entry(Patient).Property(x => x.dateofbirth).IsModified = true;
    _context.Entry(Patient).Property(x => x.DRrefby).IsModified = false;
    _context.Entry(Patient).Property(x => x.email).IsModified = true;
    _context.Entry(Patient).Property(x => x.address).IsModified = true;
    _context.Entry(Patient).Property(x => x.city).IsModified = false;
    _context.Entry(Patient).Property(x => x.contactNo).IsModified = true;
    try
    {
        await _context.SaveChangesAsync();
    }
    catch (DbUpdateConcurrencyException)
    {
         return NotFound();
     
    }
    return NoContent();
}

 [HttpPost("AddTestGroup")]
 public async Task<IActionResult> AddTestGroup( [FromBody] GroupMaster GroupMaster )
{
 var createGroup =await _labrep.AddTestGroup(GroupMaster);
return StatusCode(201);
}


[HttpGet("getAllTestGroups")]
 public async Task<IActionResult> getAllTestGroups()
{
var Groups =await _labrep.getAllTestGroups();
 return Ok(Groups);
 }

[HttpGet]
 [Route("GetGroupinfoById/{GroupId:int}")]
 public async Task<ActionResult<GroupMaster>> GetGroupinfoById(int GroupId)
{
 var GroupMaster =await _labrep.GetGroupinfoById(GroupId);
return Ok(GroupMaster);
            
}

  [HttpDelete]
  [Route("DeleteGroupById/{id:int}")]
  public async Task<IActionResult> DeleteGroupById(int id)
  {
      var msg =await _labrep.DeleteGroupById(id);
      if(msg=="Sucess")
      return StatusCode(201);
      else
        return Unauthorized(msg);
  }

[HttpPut("UpdateTestGroupByID")]
public async Task<IActionResult> UpdateTestGroupByID([FromBody] GroupMaster GroupMaster)
    {
     try
    {
        await _labrep.UpdateTestGroupByID(GroupMaster);
    }
    catch (DbUpdateConcurrencyException)
    {
         return NotFound();
     
    }
    return NoContent();
}


[HttpGet("getTestMaster")]
 public async Task<IActionResult> getTestMaster()
{
var Tests =await _labrep.getTestMaster();
 return Ok(Tests);
 }

 [HttpPost("SaveTestMaster")]
 public async Task<IActionResult> SaveTestMaster( [FromBody] TestMaster TestMaster )
{
 var createTest =await _labrep.SaveTestMaster(TestMaster);
return StatusCode(201);
}


  [HttpDelete]
  [Route("DeleteTestById/{id:int}")]
  public async Task<IActionResult> DeleteTestById(int id)
  {
       var msg =await _labrep.DeleteTestById(id);
      if(msg=="Sucess")
      return StatusCode(201);
      else
        return Unauthorized(msg);
  }

[HttpGet]
 [Route("GetTestinfoById/{TestId:int}")]
 public async Task<ActionResult<TestMaster>> GetTestinfoById(int TestId)
{
 var TestMaster =await _labrep.GetTestinfoById(TestId);
return Ok(TestMaster);
            
}
}}
