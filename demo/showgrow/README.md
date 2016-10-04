# SailPlay widget for Showgrow

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

        window.PARTNER_ID = ** PARTNER_ID **;

        var _links = {
            js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/81c85081fbeee470eaf428e5ac79f12d.js',
            css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/a91e95549722fff3637f4d225e3b9540.css'
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

Link: [DEMO](http://test.dev4you.info/sg/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project