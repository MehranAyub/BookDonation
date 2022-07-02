using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Mvc;

using OnlineApp.Core.Entities.Params.Default;
using OnlineApp.Core.Entities.Common;
using OnlineApp.Core.Entities.Params.Base;
using OnlineApp.Core.Entities.Default;
using OnlineApp.ServiceRep.BAL.Common;
namespace OnlineApp.WebAPI.Areas.Configurator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FieldController : Controller
    {
       // initialize Objects "Field" :
       private readonly IFieldBL fieldBL; 
       private readonly IAuthResponse authResponse;
       public FieldController(IAuthResponse authResponse, IFieldBL fieldBL)
       {
          try
          {
              this.fieldBL = fieldBL;
              this.authResponse = authResponse;
          }
          catch (Exception exc)
          {
              OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
          }
       }
       // Route Page "Field" :
       public IActionResult Index()
       {
          return View();
       }
       // Load object(s) "Field" List :
       [HttpGet]
       public object LoadField()
       {
            FieldP fieldP = new FieldP();
            fieldP._AuthenticatedUserP = new AuthenticatedUserP();
            try
          {
              authResponse.AuthResponseProcess(fieldP._AuthenticatedUserP);
              if(authResponse.ValidUser == true)
              {
                  fieldBL.ViewFieldList(fieldP);
                    return JsonConvert.SerializeObject(fieldP.dtResult);
                    //return (dynamic)fieldBL.fnJDataTable(fieldP, fieldP.dtResult);
              }
              return (dynamic)fieldBL.fnJFailed(fieldP);
          }
          catch (Exception exc)
          {
              OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
              return (dynamic)fieldBL.fnJException(fieldP);
          }
       }
       // Load object "Field" data :
       //[HttpPost]
       //public dynamic fnLoadFieldDetails(FieldP fieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(fieldP._AuthenticatedUserP);
       //       if(authResponse.ValidUser == true)
       //       {
       //           fieldBL.GetFieldByPrimaryKey(fieldP, fieldP._Field.FieldKey);
       //           return (dynamic)fieldBL.fnJDataTable(fieldP, fieldP.dtResult);
       //       }
       //       return (dynamic)fieldBL.fnJFailed(fieldP);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)fieldBL.fnJException(fieldP);
       //   }
       //}
       //// Save object "Field" :
       //[HttpPost]
       //public dynamic fnSaveField(FieldP fieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(fieldP._AuthenticatedUserP);
       //       if (authResponse.ValidUser == true)
       //           fieldP = fieldBL.SaveField(fieldP);
       //       else
       //           return authResponse.ProcessJsonObject<FieldP>(fieldP,- 1);
       //       return authResponse.ProcessJsonObject<FieldP>(fieldP,fieldP != null ? fieldP.result : -1);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)fieldBL.fnJException(fieldP);
       //   }
       //}
       //// Save object "Field"  With Transaction :
       //[HttpPost]
       //public dynamic fnSaveFieldTran(FieldP fieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(fieldP._AuthenticatedUserP);
       //       if (authResponse.ValidUser == true)
       //           fieldP = fieldBL.SaveFieldTran(fieldP);
       //       else
       //           return authResponse.ProcessJsonObject<FieldP>(fieldP,- 1);
       //       return authResponse.ProcessJsonObject<FieldP>(fieldP,fieldP != null ? fieldP.result : -1);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)fieldBL.fnJException(fieldP);
       //   }
       //}
       //// delete object "Field" :
       //[HttpPost]
       //public dynamic fnDeleteField(FieldP fieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(fieldP._AuthenticatedUserP);
       //       if(authResponse.ValidUser == true)
       //           fieldP = fieldBL.DeleteFieldByPrimaryKey(fieldP, fieldP._Field.FieldKey);
       //       return authResponse.ProcessJsonObject<FieldP>(fieldP, fieldP != null ? fieldP.result : -1);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)fieldBL.fnJException(fieldP);
       //   }
       //}
       //// Search List object "Field" :
       //[HttpPost]
       //public object fnSearchField(DataTableAjaxPostModel model, AuthenticatedUserP _AuthenticatedUserP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(_AuthenticatedUserP);
       //       if(authResponse.ValidUser == true)
       //           return fieldBL.fnSearchField<FieldP>(model);
       //       else
       //           return fieldBL.fnJModelFailed<FieldP>(model);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return fieldBL.fnJModelException<FieldP>(model);
       //   }
       //}
       }
    }
