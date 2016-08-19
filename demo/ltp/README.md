# SailPlay widget for Local Trade Pros

## Install
Add this script to the page:

    <script type="text/javascript">

        window._ltp_config = {
            partner_id: ' ** PARTNER_ID ** ',
            auth_hash: ' ** AUTH_HASH ** '
        };

        var _links = {
            js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/6d03322fb4041e8b124ce65f4d3d9c1b.js',
            css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/8a3b9f43c6edf7b5665b0e78dffdcda8.css'
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
Add this tag to the page:
   
    <sailplay-ltp></sailplay-ltp>

## Example

Link: [DEMO](http://test.dev4you.info/ltp/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project