using Microsoft.AspNetCore.Mvc;
using System;

namespace MCN.WebAPI.Areas.Configurator.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class AdminOfficeController : Controller
    {
        // initialize Objects "AdminOffice" :
        //private readonly IAdminOfficeRepositoryBL _AdminOfficeRepositoryBL;
        //public AdminOfficeController(IAdminOfficeRepositoryBL AdminOfficeRepositoryBL)
        //{
        //    try
        //    {
        //        this._AdminOfficeRepositoryBL = AdminOfficeRepositoryBL;
        //    }
        //    catch (Exception exc)
        //    {
        //        MCN.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
        //    }
        //}
        // Route Page "AdminOffice" :
        //public IActionResult Index()
        //{
        //    return View();
        //}
        //[HttpPost]
        //[Route("LoadAdminOffice")]
        //public object LoadAdminOffice([FromBody]AdminOfficeP AdminOfficeP) //
        //{
        //    //var result = _AdminOfficeRepositoryBL.LoadAdminOfficeJsonData(AdminOfficeP);
        //    //return Ok(result);
        //}
        //[HttpPost]
        //[Route("LoadAdminOfficeModules")]
        //public object LoadAdminOfficeModules([FromBody]AdminOfficeP AdminOfficeP) //
        //{
        //    //var result = _AdminOfficeRepositoryBL.LoadAdminOfficeSecurityActionsByOfficeKey(AdminOfficeP);
        //    //return Ok(result);
        //}
        //[HttpPost]
        //[Route("EditAdminOffice")]
        //public object EditAdminOffice([FromBody]AdminOfficeP AdminOfficeP) //
        //{
        //    var result = _AdminOfficeRepositoryBL.LoadAdminOfficeByOfficeKey(AdminOfficeP);
        //    return Ok(result);
        //}
        //[HttpPost]
        //[Route("UpdateAdminOffice")]
        //public object UpdateAdminOffice([FromBody]AdminOfficeSPR AdminOfficeP) //
        //{
        //    var result = _AdminOfficeRepositoryBL.UpdateAdminOffice(AdminOfficeP);
        //    return Ok(result);
        //}
    }
}
