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
    public class FormPagePanelFieldController : Controller
    {
       // initialize Objects "FormPagePanelField" :
       private readonly IFormPagePanelFieldBL formPagePanelFieldBL;
        private readonly IFormPagePanelFieldBLC formPagePanelFieldBLC;
        private readonly IAuthResponse authResponse;
       public FormPagePanelFieldController(IAuthResponse authResponse, IFormPagePanelFieldBL formPagePanelFieldBL, IFormPagePanelFieldBLC formPagePanelFieldBLC)
       {
          try
          {
                 this.formPagePanelFieldBLC = formPagePanelFieldBLC;
                 this.formPagePanelFieldBL = formPagePanelFieldBL;
                 this.authResponse = authResponse;
          }
          catch (Exception exc)
          {
              OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
          }
       }
       // Route Page "FormPagePanelField" :
       public IActionResult Index()
       {
          return View();
       }
        // Load object(s) "FormPagePanelField" List :
        [HttpPost]
        [Route("LoadFormPagePanelField")]
        public object LoadFormPagePanelField([FromBody] FormPagePanelFieldP formPagePanelFieldP)
       {
           formPagePanelFieldP._AuthenticatedUserP = new AuthenticatedUserP();
          try
          {
              authResponse.AuthResponseProcess(formPagePanelFieldP._AuthenticatedUserP);
              if(authResponse.ValidUser == true)
              {
                  formPagePanelFieldBLC.ViewFormPagePanelListByFormKeyWithPanelField(formPagePanelFieldP);
                    return JsonConvert.SerializeObject(formPagePanelFieldP.dtResult);
                    //return (dynamic)formPagePanelFieldBL.fnJDataTable(formPagePanelFieldP, formPagePanelFieldP.dtResult);
              }
              return (dynamic)formPagePanelFieldBL.fnJFailed(formPagePanelFieldP);
          }
          catch (Exception exc)
          {
              OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
              return (dynamic)formPagePanelFieldBL.fnJException(formPagePanelFieldP);
          }
        }
       // Load object "FormPagePanelField" data :
       //[HttpPost]
       //public dynamic fnLoadFormPagePanelFieldDetails(FormPagePanelFieldP formPagePanelFieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(formPagePanelFieldP._AuthenticatedUserP);
       //       if(authResponse.ValidUser == true)
       //       {
       //           formPagePanelFieldBL.GetFormPagePanelFieldByPrimaryKey(formPagePanelFieldP, formPagePanelFieldP._FormPagePanelField.FormPagePanelFieldKey);
       //           return (dynamic)formPagePanelFieldBL.fnJDataTable(formPagePanelFieldP, formPagePanelFieldP.dtResult);
       //       }
       //       return (dynamic)formPagePanelFieldBL.fnJFailed(formPagePanelFieldP);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)formPagePanelFieldBL.fnJException(formPagePanelFieldP);
       //   }
       //}
       //// Save object "FormPagePanelField" :
       //[HttpPost]
       //public dynamic fnSaveFormPagePanelField(FormPagePanelFieldP formPagePanelFieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(formPagePanelFieldP._AuthenticatedUserP);
       //       if (authResponse.ValidUser == true)
       //           formPagePanelFieldP = formPagePanelFieldBL.SaveFormPagePanelField(formPagePanelFieldP);
       //       else
       //           return authResponse.ProcessJsonObject<FormPagePanelFieldP>(formPagePanelFieldP,- 1);
       //       return authResponse.ProcessJsonObject<FormPagePanelFieldP>(formPagePanelFieldP,formPagePanelFieldP != null ? formPagePanelFieldP.result : -1);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)formPagePanelFieldBL.fnJException(formPagePanelFieldP);
       //   }
       //}
       //// Save object "FormPagePanelField"  With Transaction :
       //[HttpPost]
       //public dynamic fnSaveFormPagePanelFieldTran(FormPagePanelFieldP formPagePanelFieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(formPagePanelFieldP._AuthenticatedUserP);
       //       if (authResponse.ValidUser == true)
       //           formPagePanelFieldP = formPagePanelFieldBL.SaveFormPagePanelFieldTran(formPagePanelFieldP);
       //       else
       //           return authResponse.ProcessJsonObject<FormPagePanelFieldP>(formPagePanelFieldP,- 1);
       //       return authResponse.ProcessJsonObject<FormPagePanelFieldP>(formPagePanelFieldP,formPagePanelFieldP != null ? formPagePanelFieldP.result : -1);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)formPagePanelFieldBL.fnJException(formPagePanelFieldP);
       //   }
       //}
       //// delete object "FormPagePanelField" :
       //[HttpPost]
       //public dynamic fnDeleteFormPagePanelField(FormPagePanelFieldP formPagePanelFieldP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(formPagePanelFieldP._AuthenticatedUserP);
       //       if(authResponse.ValidUser == true)
       //           formPagePanelFieldP = formPagePanelFieldBL.DeleteFormPagePanelFieldByPrimaryKey(formPagePanelFieldP, formPagePanelFieldP._FormPagePanelField.FormPagePanelFieldKey);
       //       return authResponse.ProcessJsonObject<FormPagePanelFieldP>(formPagePanelFieldP, formPagePanelFieldP != null ? formPagePanelFieldP.result : -1);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return (dynamic)formPagePanelFieldBL.fnJException(formPagePanelFieldP);
       //   }
       //}
       //// Search List object "FormPagePanelField" :
       //[HttpPost]
       //public object fnSearchFormPagePanelField(DataTableAjaxPostModel model, AuthenticatedUserP _AuthenticatedUserP)
       //{
       //   try
       //   {
       //       authResponse.AuthResponseProcess(_AuthenticatedUserP);
       //       if(authResponse.ValidUser == true)
       //           return formPagePanelFieldBL.fnSearchFormPagePanelField<FormPagePanelFieldP>(model);
       //       else
       //           return formPagePanelFieldBL.fnJModelFailed<FormPagePanelFieldP>(model);
       //   }
       //   catch (Exception exc)
       //   {
       //       OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
       //       return formPagePanelFieldBL.fnJModelException<FormPagePanelFieldP>(model);
       //   }
       //}
       }
    }
