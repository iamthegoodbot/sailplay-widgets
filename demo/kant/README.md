# SailPlay widget for 21shop

## Install
Paste this code to the page in < head > section to load the script:

    <script type="text/javascript">

            window.sailplay_config = {
                auth_hash: 'ab3c82c1eadf07549f9298a93bf877150c6d9650',
                partner_id: 1593,
                lang: 'ru',
                data: {
                    statuses: [
                        {
                            discount: 0,
                            from: 0,
                            to: 5000
                        },
                        {
                            discount: 5,
                            from: 5000,
                            to: 30000
                        },
                        {
                            discount: 7,
                            from: 30000,
                            to: 100000
                        },
                        {
                            discount: 10,
                            from: 100000,
                            to: 300000
                        },
                        {
                            discount: 15,
                            from: 300000
                        }
                    ]
                }
            };

            var _links = {
                js: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/ddabe503dfb3190fe27096f91d6b7643.js',
                css: 'https://d3sailplay.cdnvideo.ru/media/assets/assetfile/8d1c636be9f1f1329daff657daf87024.css'
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

    <sailplay-shop21></sailplay-shop21>

## Example

Link: [DEMO](http://78.46.209.148/test/kant/ "Demo")

## Development

"npm install" - for install node_modules

"gulp" - for dev
"gulp build" - for build project