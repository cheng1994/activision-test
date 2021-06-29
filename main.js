$(function() {
    // Setup youtube api if null
    if(!window.YT) {
        const tag = document.createElement('script');

        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = $('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
    let player;
    window.YT.ready(function() {
        player = new YT.Player('player', {
            events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
            }
        });
    })

    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

      // The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
    let done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }

    // MODAL CODE
    const modal = $("#modal");

    const btn = $("#btn");

    const closeBtn = $(".modal__close");

    btn.click(function() {
        modal.css("display", "block");
    })

    closeBtn.click(function(){
        modal.css("display", "none");
        player.stopVideo();
    }) 

    window.onclick = function(event) {
        if (event.target == modal[0]) {
            modal.css("display", "none");
            player.stopVideo();
        }
    }
});