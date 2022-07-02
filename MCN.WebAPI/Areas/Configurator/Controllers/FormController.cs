using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Mvc;

using OnlineApp.Core.Entities.Params.Default;
using OnlineApp.Core.Entities.Common;
using OnlineApp.Core.Entities.Params.Base;
using OnlineApp.Core.Entities.Default;
using OnlineApp.ServiceRep.BAL.Common;
using System.Linq;
using OnlineApp.WebAPI;
using System.Collections.Generic;
using System.Data;

using OnlineApp.ServiceRep.BAL.UserRepositoryBL;
using OnlineApp.Core.Entities.Custom;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using OnlineApp.Core.Entities.Params.Custom;

namespace OnlineApp.WebAPI.Areas.Configurator.Controllers
{
    [ApiController]
    [Route("[controller]")]    
    public class FormController : Controller
    {
        // initialize Objects "Form" :
        private readonly IFormRepositoryBL _FormRepositoryBL;
        private readonly IAuthResponse authResponse;
       public FormController(IAuthResponse authResponse, IFormRepositoryBL FormRepositoryBL)
       {
          try
          {
                this._FormRepositoryBL = FormRepositoryBL;
                this.authResponse = authResponse;
          }
          catch (Exception exc)
          {
              OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
          }
       }
       // Route Page "Form"
       public IActionResult Index()
       {
          return View();
       } 
        [HttpPost]
        [Route("LoadFormData")]
        public object LoadFormData([FromBody]FormP FormP) 
        {
            FormP._AuthenticatedUserP = new AuthenticatedUserP();
            try
            {
                authResponse.AuthResponseProcess(FormP._AuthenticatedUserP);
                if (authResponse.ValidUser == true)
                {
                   _FormRepositoryBL.LoadFormDataJson(FormP);
                    FormPR fpr = new FormPR();
                    fpr.formDataList = FormP.formDataList;
                   return fpr;
                }
                return null;
            }
            catch (Exception exc)
            {
                OnlineApp.Infrastructure.Logging.LockLoggingService.LockErrorLog(exc);
                return null;
            }
        }
    }
 }
