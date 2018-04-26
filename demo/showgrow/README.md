# SailPlay widget for Showgrow

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

        window.PARTNER_ID = ** PARTNER_ID **;

        var _links = {
            js: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/4d961ef65424bc6b0029d7e8be47bb4f.js',
            css: 'https://sailplays3.cdnvideo.ru/media/assets/assetfile/e3b10e731739c208847eef5de30e4e04.css'
        };

        document.addEventListener('DOMContentLoaded', function () {

            var _s = document.createElement("link");
            _s.type = "text/css";
            _s.rel = "stylesheet";
            _s.href = _links.css;
            document.getElementsByTagName("head")[0].appendChild(_s);

            var _j = document.createElement("script");
            _j.type = "text/javascript";
            _j.src = _links.js;
            document.getElementsByTagName("head")[0].appendChild(_j);

        });

    </script>


## Placement
Paste this code to < body > to render the content loaded via above mentioned script:
   
    <sailplay-sg></sailplay-sg>

## Example

Link: [DEMO](http://78.46.209.148/test/sg "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project