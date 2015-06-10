/*globals FMT_WRAPPER*/
(function() {
    "use strict";
    var player, player_container;

    onReady(() => {
        // onInit does not works on channel/user page videos
        player = createNode("video");
        changePlayer();
        window.addEventListener("spfrequest", function() {
            if (player) {
                //                player.pause();
                //                player.src = undefined;
                player.onended = undefined;
                player.currentTime = player.duration;
            }
        });
        window.addEventListener("spfdone", function() {
            changePlayer();
        });
    });

    // Change to chromecast player layout 
    function changePlayer() {
        getConfig()
            .then(getVideoInfo)
            .then((conf) => {
               // logify(conf); 
            });
    }

    function getPlayerContainer(conf) {
        if (conf.isWatch)
            return document.getElementById("player-mole-container");
        if (conf.isEmbed)
            return document.body;
        if (conf.isChannel)
            return document.getElementsByClassName("c4-player-container")[0];
    }

    function getConfig() {
        return new Promise((resolve, reject) => {
            var isEmbed = location.href.search("youtube.com/embed/") > -1;
            var isWatch = location.href.search("youtube.com/watch?") > -1;
            var isChannel = location.href.search("youtube.com/channel/") > -1 || location.href.search("youtube.com/user/") > -1;
            if (!isEmbed && !isWatch && !isChannel)
                reject();
            var player_id, player_class;
            if (isEmbed) {
                player_id = location.pathname.match(/^\/embed\/([^?#/]*)/)[1];
                player_class = "full-frame";
            } else if (isChannel) {
                var upsell = document.getElementById("upsell-video");
                if (!upsell)
                    reject();
                player_id = upsell.dataset["videoId"];
                player_class = "c4-player-container"; //+ " html5-main-video"
            } else {
                player_id = location.search.slice(1).match(/v=([^/?#]*)/)[1];
                player_class = "player-width player-height";
            }
            if (!player_id)
                reject({
                    error: "PLAYER_ID_NOT_FOUND"
                });
            resolve({
                isEmbed: isEmbed,
                isWatch: isWatch,
                isChannel: isChannel,
                id: player_id,
                className: player_class
            });
        });
    }

    function getVideoInfo(conf) {
        console.log(conf.id);
        self.port.emit("yt-castvid", conf.id);
    }
}());
// 192.168.0.134
