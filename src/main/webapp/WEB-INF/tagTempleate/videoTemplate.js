						<script type='text/javascript'>
                                (function () {
                                var ga = null; // optional field, example 'UA-XXXX-X'
                                var tag_id = '%s';//(new Date()).valueOf().toString();
                                var page_url = location.href;  //replace with relevant macro if needed
                                var service_url = '%s';
                                var content = 'http://s3-us-west-2.amazonaws.com/mediaflyer-cdn/media/other.mp4';
                                var with_preroll = 'yes';
                                var width = ;// number, for example: 350
                                var height = ;// number, for example: 250
                                if (ga != null)//analytics
                                {
                                                var gaUrl = 'http://www.google-analytics.com/collect?v=1' + '&tid=' + ga + '&cid=' + client_id + "&t=event&ec=Checkpoint&el=" + escape(page_url) + '&ev=0&ea=embed_code_exec';
                                                document.write("<img style='display: none' src='" + gaUrl + "' />");
                                }
                              
                                var iframe = "<iframe allowfullscreen='true' webkitallowfullscreen='true' mozallowfullscreen='true' frameborder='0' scrolling='no' width='" + width + "' height='" + height + "' src='" + service_url +"with_preroll="+with_preroll+ "&tag_id="+tag_id+"&content="+escape(content)+ "'></iframe>";
                                document.write(iframe);
                                })();
                           </script>