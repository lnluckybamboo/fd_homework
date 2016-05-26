 String.prototype.format = function(args) {
     var result = this;
     if (arguments.length > 0) {
         if (arguments.length == 1 && typeof(args) == "object") {
             for (var key in args) {
                 if (args[key] != undefined) {
                     var reg = new RegExp("({" + key + "})", "g");
                     result = result.replace(reg, args[key]);
                 }
             }
         } else {
             for (var i = 0; i < arguments.length; i++) {
                 if (arguments[i] != undefined) {
                     var reg = new RegExp("({)" + i + "(})", "g");
                     result = result.replace(reg, arguments[i]);
                 }
             }
         }
     }
     return result;
 }

 $(function() {
     $('#btnSub').on('click', function() {
         var
             $txtUserName = $('#txtUserName'),
             txtUserNameVal = $.trim($txtUserName.val()),
             $txtUserPwd = $('#txtUserPwd'),
             txtUserPwdVal = $.trim($txtUserPwd.val()),
             errorTip = '<div id="errorTip" class="alert alert-warning">{0}</div> ';

         $("#errorTip,#alt_warning").remove();

         if (txtUserNameVal.length == 0) {
             $("#container").prepend(errorTip.format('用户名不能为空'));
             $txtUserName.focus();
             return false;
         }

         if (txtUserPwdVal.length == 0) {
             $("#container").prepend(errorTip.format('密码不能为空'));
             $txtUserPwd.focus();
             return false;
         }

         return true;
     })
 });
