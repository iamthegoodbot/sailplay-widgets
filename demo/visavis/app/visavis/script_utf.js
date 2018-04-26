function PickpointHandler(result)
{
	pp_id = document.getElementById("pp_id");
	pp_id.value = result["id"];
	pp_address = document.getElementById("pp_address");
	pp_address.value = result["address"];
	pp_name = document.getElementById("pp_name");
	pp_name.value = result["name"];
    pp_zone = document.getElementById("pp_zone");
	pp_zone.value = result["zone"];
    pp_coeff = document.getElementById("pp_coeff");
	pp_coeff.value = result["coeff"];
	Span = document.getElementById("sPPDelivery");
	Span.innerHTML = result['address']+"<br/>"+result['name'];
    submitForm();
}
function listen(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
         var r = elem.attachEvent("on"+evnt, func);
	return r;
    }
    else return false;
}

function ShowData()
{
	A = Table = document.getElementById('tPP');
	B = document.getElementById("ID_DELIVERY_pickpoint_postamat");
	if(B)
	{
		if(B.checked)
		{
			Table.style.display = 'block';
			return true;
		}
		else Table.style.display = 'none';
	}
	return false;
}
function CheckData()
{
	ShowData();
//	alert(1);
	var Form = Table = document.getElementById('tPP');
	if(Form)
	{

		while(Form = Form.parentNode) {if(Form.tagName=="FORM") break; }
		if(Form && Form.tagName=="FORM")
		{
//			alert(1);
			arInputs = Form.getElementsByTagName("input");
			for(i=0; i < arInputs.length; i++)
			{
				switch(arInputs[i].type)
				{
					case "button":
						if(arInputs[i].getAttribute("onclick"))
						{
							str = arInputs[i].getAttribute("onclick").toString();
							arMatch = (str.match(/submitForm\('(\S+)'\);/));

							if(arMatch&& arMatch[1]=="Y")
							{
								sLoad = arMatch[0];
								arInputs[i].onclick = function(){return PPFormSubmit(sLoad)};
							}
						}
					break;
					case "submit":
						if(arInputs[i].name=="contButton")
						{
							arInputs[i].onclick = function(){return PPFormSubmit()};
						}
					break;
				}
			}

            arHref = Form.getElementsByTagName("a");
            for(i=0; i < arHref.length; i++)
            {
                if(arHref[i].getAttribute("onclick"))
                {
                    str = arHref[i].getAttribute("onclick").toString();
                    arMatch = (str.match(/submitForm\('(\S+)'\);/));

                    if(arMatch&& arMatch[1]=="Y")
                    {
                        sLoad = arMatch[0];
                        arHref[i].onclick = function(){return PPFormSubmit(sLoad)};
                    }
                }
            }

		}
	}
	window.setTimeout(function() {return CheckData();},500);
}
function PPFormSubmit(sLoad)
{
	if(document.getElementById('tPP') && ShowData())
	{
		bSuccess = true;
		sMessage = "";
		iErrNum = 1;
		pp_id = document.getElementById("pp_id");
		if(!pp_id.value)
		{
			bSuccess = false;
			sMessage+=iErrNum+") Не выбрана точка доставки\n";
			iErrNum++;
		}
		pp_sms_phone = document.getElementById("pp_sms_phone");
		if(!pp_sms_phone.value.match(/\+7[0-9]{10}$/))
		{
			bSuccess = false;
			sMessage+=iErrNum+") Номер телефона должен быть заполнен в виде +79160000000";
		}
		if(bSuccess)
		{
			if(sLoad) eval(sLoad);
		}
		else alert(sMessage);
		return bSuccess;
	}

	if(sLoad) eval(sLoad)
	return true;
}
window.onload = function(){
CheckData();
};