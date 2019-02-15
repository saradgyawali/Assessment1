var tableData=[];
function onInit(){
	getRemoteData("meeting");
	document.getElementById("result").innerHTML  = "meeting";
}

function search(){
	var value = document.getElementById("search").value; 
	if( value.trim().length > 0){
		getRemoteData(document.getElementById("search").value);
		document.getElementById("result").innerHTML  = value;
	}
	else{
		alert("Invalid search string");
	}	
}

//reset default search;
function clearInput(){
	document.getElementById("search").value = "meeting";
	getRemoteData("meeting");
	document.getElementById("result").innerHTML  = "meeting";
}
//Get data from remote server
function getRemoteData(paramValue){
  showBusy();
  var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      	var response = JSON.parse(this.responseText);
		tableData = response.query.search;
		//sortOn(1);
		renderTableData(response.query.search);
    }
  };
   xhttp.onerror = function( error ) {
	  document.getElementById("error").innerHTML = " <center>ERROR: while Loading page  - Cross-Origin Read Blocking (CORB) blocked cross-origin response <br><b>  Please add CORS enable extension in your browser to run the application </b></center>" 
   }
  xhttp.open("GET", "https://www.mediawiki.org/w/api.php?action=query&list=search&srsearch="+paramValue+"&format=json", true);
  xhttp.setRequestHeader("content-type", "application/json");
  xhttp.send();
  
}

function showBusy(){
	var busyElement = "<div class='busy'><img src='./loading.gif'></img></div>";
		document.getElementById("dynamicTablevalue").innerHTML = busyElement;
}

//Generate dynamic table data
function renderTableData (data) {
	var tbody="";	
		for (x in data) {
			tbody+= "<tr><td>" + data[x].title + "</td>"+
						  "<td>"+ data[x].pageid +"</td>"+
						  "<td>"+ data[x].size +"</td>"+
						  "<td>"+ data[x].wordcount + "</td>"+
						  "<td>"+ data[x].snippet + "</td>"+
						  "<td>"+ data[x].timestamp + "</td></tr>";
		}
		
		var header = "<tr>"+
				 "<th onclick="+"sortTable(0)"+">Title</th>"+
				"<th class='pageidHeader'>Page Id</th>"+
				"<th>Size</th>"+
				"<th class='wordCount' >Word Count</th>"+
				"<th class='snippet' >Snippet</th>"+
				"<th>Timestamp</th>"
				"</tr>";
				
		var table = " <table id="+"myTable"+" class='table-all card-4'>" +header+tbody+ "<table>";		
	document.getElementById("dynamicTablevalue").innerHTML = table;
}

//var sortBy=1;
// to sort on button click
/*function sortOn(order){debugger;
	tableData.sort((a,b) =>  order );
	renderTableData(tableData);
	
	if(sortBy == 1)
		document.getElementById("sort").innerHTML = "&#8595";
	else 
		document.getElementById("sort").innerHTML = "&#8593";
	
	sortBy = ( sortBy == 1 ) ? -1 : 1;
}*/

// to sort on header click
function sortTable(n) {
  var table ,rows, i, x, y, jump,  count = 0;
  table = document.getElementById("myTable");// dynamic table reading
  var flag = true;  
  var dirType = "asc"; 
   
  while (flag) {
    
    flag = false;
    rows = table.rows;     
    for (i = 1; i < (rows.length - 1); i++) {
       
      jump = false;       
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
     
      if (dirType == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        
          jump= true;
          break;
        }
      } else if (dirType == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
         
          jump = true;
          break;
        }
      }
    }
    if (jump) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      flag = true;
      
       count ++;      
    } else {
      
      if ( count == 0 && dirType == "asc") {
        dirType = "desc";
        flag = true;
      }
    }
  }
}