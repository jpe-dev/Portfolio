
var colorInc = 100 / 3;

$(function () {
    document.getElementById("my_audio").play();

    $("#percent-box").click(function () {
        $(this).select();
    });
    function load1percent() {
        document.getElementById("percent-box").value = Number($("#percent-box").val()) + 1;
        updateLoading();
    };

    function updateLoading() {
        var val = $("#percent-box").val();
        if (val != ""
            && !isNaN(val)
            && val <= 100) {
            console.log(val);

            var valOrig = val;
            val = 100 - val;

            if (valOrig == 0) {
                $("#percent-box").val(0);
                $(".progress .percent").text(0 + "%");
            }
            else $(".progress .percent").text(valOrig + "%");

            $(".progress").parent().removeClass();
            $(".progress .water").css("top", val + "%");

            if (valOrig < colorInc * 1)
                $(".progress").parent().addClass("red");
            else if (valOrig < colorInc * 2)
                $(".progress").parent().addClass("orange");
            else
                $(".progress").parent().addClass("green");
        }
        else if (val > 100) {
            $(".progress").parent().addClass("green");
            $(".progress .water").css("top", 0 + "%");
            $(".progress .percent").text("100%")
            hide();
        }
    }

    function hide() {
        $(".green").addClass("hidden");
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function load() {
        var val = $("#percent-box").val();
        if (val < 100) {
            setTimeout(function () {   //  call a 3s setTimeout when the loop is called
                load1percent();
                updateLoading();
                load();             //  ..  again which will trigger another 
            }, 50)
        }
        else {
            setTimeout(function() {
                hide();
            }, 1000);
        }
    }
    updateLoading();
    load();
});
