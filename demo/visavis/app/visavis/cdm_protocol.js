var CDMPickpointProtocol = {
    
    PICKPOINT_PROTOCOL_MARK :"@PPP_RU_WGT20@",
            
    /**
     * 
     * @param {string} rawdata
     * @returns {object}
     */        
    parse : function (rawdata){
        /*
         * Message Format:
         * <PICKPOINT_PROTOCOL_MARK><ActionName>
         * or
         * <PICKPOINT_PROTOCOL_MARK><ActionName>;<JSONData>
         */
        var part = rawdata.substr(CDMPickpointProtocol.PICKPOINT_PROTOCOL_MARK.length);
        var data_offset = part.indexOf(";");
        var data = null;
        
        if ( data_offset< 0) {
            action = part;
        } else {
            action = part.substr(0,data_offset);
            data = JSON.parse( part.substr(data_offset+1) );
        }
        
        return {
            action:action,
            data:data
        }
    },
    
    /**
     * 
     * @param {string} action
     * @param {object} data
     * @returns {string}
     */
    build : function (action,data){
        var text = CDMPickpointProtocol.PICKPOINT_PROTOCOL_MARK;
        text += action.toString();
        if (data) {
            text += ";"+JSON.stringify(data);
        }        
        return text;
    },
    
    isMessage : function( possible_msg ){
        return possible_msg.toString().indexOf(CDMPickpointProtocol.PICKPOINT_PROTOCOL_MARK) == 0;
    }
}