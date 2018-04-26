# SailPlay widget for BJ

## Install
Paste this code to the page in < head > section to load the script:

   <script type="text/javascript">

           window._CONFIG = {
               SAILPLAY: {
                   partner_id: ** PARTNER ID **,
                   auth_hash: '** AUTH_HASH **'
               }
           };

           var _links = {
               js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ca2ffd005d7bc3b354ed93284cc5c45e.js',
               css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/079e2fb92e2ddbe82dd755c09301e9d5.css'
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

    <sailplay-widgets></sailplay-widgets>

## Example

Link: [DEMO](http://test.dev4you.info/jeweler/ "Demo")
