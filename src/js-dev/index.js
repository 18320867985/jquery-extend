
const index = {

    init: function () {

        $(function () {

            $(".side dl dd a").click(function (e) {
                e.preventDefault();
                $(".side dl dd a").removeClass("active");
                $(this).addClass("active");
                var href = $(this).prop("href");

                if ($("#iframe").hasClass("active")) {
                    $("#iframe").removeClass("active");
                    $("#iframe2").addClass("active");
                }
                else if ($("#iframe2").hasClass("active")) {
                    $("#iframe2").removeClass("active");
                    $("#iframe").addClass("active");
                }

                $(".iframe.active").prop("src", href);
            });


        });
        
    }
};

export {
    index
};

