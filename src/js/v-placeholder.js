

/* placeholder 兼容ie8  ie9
 *
 * 
 * 在css里面添加.ie8-pwd 的class
.ie8-pwd {
    position: absolute;
    z-index: 1;
    display: inline-block;
    color: $text-placeholer;
    text-indent: 10px;
}

*/


$(function () {

    var list = $("input[type='text'],textarea,input[type='password']");

    list.each(function () {
        var place = $(this).attr("placeholder");

        var h = $(this).outerHeight();
        var bf = document.createElement("div");
        bf.setAttribute("class", "ie8-pwd");
		if( ($(this).get(0).tagName||"").toLocaleLowerCase()==="textarea"){
			bf.setAttribute("style", "line-height:34px");
		}else{
			bf.setAttribute("style", "line-height:" + h + "px");
		}
	
      
        bf.innerText = place;
        $(this).before(bf);
        var val = $.trim($(this).val());
        if (val === "") {
            $(this).prev().show();
        } else {
            $(this).prev().hide();
        }

        $(this).focus(function () {

            $(this).attr("placeholder");
            $(this).prev().hide();

        });

        $(this).blur(function () {

            var val = $.trim($(this).val());
            if (val === "") {
                $(this).prev().show();
            } else {
                $(this).prev().hide();
            }

        });

    });


    $(document).on("click", ".ie8-pwd", function () {
        $(this).hide();
        $(this).next().focus();

    });


});




