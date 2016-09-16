# SailPlay widget for Showgrow

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

        window._showgrow_config = {
            partner_id: ' ** PARTNER_ID ** ',
            auth_hash: ' ** AUTH_HASH ** '
        };

        var _links = {
            js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/213e959f3b80257b1d7d75ac895e899f.js',
            css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/5cf3839c610bacf0094ffa5f8cfde7e2.css'
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
   
    <sailplay-showgrow></sailplay-ltp>

## Example

Link: [DEMO](http://test.dev4you.info/sg/ "Demo")

## Download

Link: [here](http://test.dev4you.info/sg/showgrow.zip "here")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project