
  var gpData = null;  //GP: data from database will be stored here    
  var currentRow = null;  //GP: Current Row of Data element
  var currentCol = null;  //GP: Current Column of Data element
  var currentId  = null;  //GP: Current id of Data element, note: it is 'id' only not the value of data element itself
  var cardFace   = null;  //GP: Which side the card is facing 'front' or 'back' - this will determine the color
  
  //GP: "function doData()" --> get the data feed from json
  function doData(json) {      
      gpData = json.feed.entry;     
  }
  
  
  //GP: "function FlipData()" --> Get the right value to display when card is flipped
  function flipData() {              
      var data = gpData;
            
      if (currentId == null) { //GP: if the id is null, point to 1st element
         currentId  = 0;    
         currentRow = 1;
         currentCol = 1;    
      }                                                                               
      else if (currentId != null && currentCol == 1){  //GP: switch to next data element if on 1st column i.e. Flip
       currentId = currentId + 1;
       currentCol = 2;
      } 
      else if (currentCol == 2){  //GP: switch to previous data element if on 2nd column i.e. Flip
       currentId = currentId - 1;
       currentCol = 1;
      }
                                 
      var cell = data[currentId].gs$cell;
      var val = cell.$t;         
       
      document.getElementById("id01").innerHTML = val;    //GP: Assign value to Front display of Card
      document.getElementById("id02").innerHTML = val;    //GP: Assign value to Back display of Card
     
      if (currentCol == 1) {
     cardFace = '#339933';  //GP: if card is facing up - then green
   }
   else if (currentCol == 2) {
     cardFace = '#66ccff';  //GP: if card is facing down - then blue
      }

      currentId = currentId;     //GP: Set the variables to current screen values
      currentRow = cell.row;                    
      currentCol = cell.col;                                      
     
     
  }

  
  //GP: "function prevData()" --> get the previous value
  function prevData() {

    var data = gpData;
    
    if (currentId == null){  //GP: if the id is null, point to 1st element
        currentId = 0;    
        currentRow = 1;
        currentCol = 1;    
     }
    
    if (currentCol == 1){     //GP: switch to 1st data element of previous row i.e. -2 if on 1st column currently
     if (currentId <= 1){   //GP: if already on 1st row/column/value - stay there, dont throw error.
       currentId  = 0;
       currentRow = 1;
         currentCol = 1;    
         }
     else if (currentId > 1){
      currentId = currentId - 2; 
      currentRow = currentRow - 1;
      currentCol = 1;
    }
    }
    else if (currentCol == 2){   //GP: switch to 1st data element of previous row i.e. -3 if on 2nd column currently 
     if (currentId <= 2){   //GP: if already on 1st row/column/value - stay there, dont throw error.
       currentId  = 0;
       currentRow = 1;
         currentCol = 1;    
         }
     else if (currentId > 2){
     currentId = currentId - 3;
     currentRow = currentRow - 1; 
     currentCol = 1;
    }
    }
            
    var cell = data[currentId].gs$cell;
    var val = cell.$t;         

       
    document.getElementById("id01").innerHTML = val;  //GP: Assign value to Front display of Card
    document.getElementById("id02").innerHTML = val;  //GP: Assign value to Back display of Card
    
    currentId = currentId; //GP: Set the variables to current screen values
    currentRow = cell.row;                    
    currentCol = cell.col;                                              
  }

  
  //GP: "function nextData()" --> get the next value
  function nextData() {

    var data = gpData;
    var screenValue = document.getElementById("id01").innerHTML;        
    
    if (currentId == null){  //GP: if the id is null, point to 1st element
        currentId = 0;    
        currentRow = 1;
        currentCol = 1;    
     }
    
    if (currentCol == 1){  //GP: switch to 1st data element of next row i.e. +2 if on 1st column currently
     if (screenValue !== 'The End') {     
      currentId = currentId + 2; 
      currentRow = currentRow + 1;
      currentCol = 1;
    }
    }
    else if (currentCol == 2){  //GP: switch to 1st data element of next row i.e. +1 if on 2nd column currently
     if (screenValue !== 'Het Einde'){     
     currentId = currentId + 1;
     currentRow = currentRow + 1; 
     currentCol = 1;
    }
    }        
        
    var cell = data[currentId].gs$cell;
    var val = cell.$t;         
       
    document.getElementById("id01").innerHTML = val;  //GP: Assign value to Front display of Card
    document.getElementById("id02").innerHTML = val;  //GP: Assign value to Back display of Card
    
    currentId = currentId; //GP: Set the variables to current screen values
    currentRow = cell.row;                    
    currentCol = cell.col;                                              
  }

  
  //GP: jquery function to flip the card when clicked on its area
$(window).load(function(){
$(document).ready(function() {  
  $('.flashcard').on('click', function() {
    flipData(); 
    $('.flashcard').toggleClass('flipped'); 
 $("#card").css("background-color",cardFace); 
  });  
 });
});


$(window).load(function(){
$(document).ready(function() {  
  $('.next').on('click', function() {
   nextData();
    $("#card").css("background-color","#339933");   
  });  
});

});


$(window).load(function(){
$(document).ready(function() {  
  $('.prev').on('click', function() {
  prevData();
    $("#card").css("background-color","#339933");   
  });  
});

});


$(document).on("keydown", function(e) {
   if (e.keyCode == 39) {
    nextData();
    $("#card").css("background-color","#339933");   
   }
   else if (e.keyCode == 37) {
    prevData();
    $("#card").css("background-color","#339933");   
   } 
   else if (e.keyCode == 38 || e.keyCode == 40) {
     flipData();  
     $('.flashcard').toggleClass('flipped');      
  $("#card").css("background-color",cardFace); 
   };
   
}); 

