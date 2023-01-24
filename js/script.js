var subTypeArr = ['back', 'cardio', 'chest', 'lower arms', 'lower legs', 'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];
var k = 0


function detectChange(selected) {    

  selectedValue = selected.value;
  console.log(selectedValue);
  getSubtypes(selectedValue);
//   console.log(subTypeArr);



  
}

function detectSubChange(subSelected) {    

    subSelectedValue = subSelected.value;
    console.log(subSelectedValue);
   
  }

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ad6412f29bmshc7bd425f393e766p190bb9jsnb87e1dfc18c0",
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

const getSubtypes = async (type) => {
  await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/${type + "List"}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      //   console.log(response);
      subTypeArr = [];
      response.map((item) => {
        subTypeArr.push(item);
      });

      console.log(subTypeArr)

      document.getElementById("sub-type").innerHTML = subTypeArr.map(
        (subtype) => `<option value="${subtype}">${subtype}</option>`
      )
    })
    

   

    .catch((err) => console.error(err));
};

const getExercise = async (type, subtype) => {
  await fetch(
    `https://exercisedb.p.rapidapi.com/exercises/${type}/${subtype}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    //   console.log(typeof response)
        let exercise = response[k]

        document.getElementById('ex-name').innerHTML = `<p><b>Exercise:</b> ${exercise.name}</p>` 
        document.getElementById('body-part').innerHTML = `<p><b>Body Part:</b> ${exercise.bodyPart}</p>` 
        document.getElementById('equipment').innerHTML = `<p><b>Equipment:</b> ${exercise.equipment}</p>` 
        document.getElementById('target').innerHTML = `<p><b>Target Muscle:</b> ${exercise.target}</p>` 
        document.getElementById('gif').src = exercise.gifUrl
    

    })
    .catch((err) => console.error(err));
};

var selectedValue = "bodyPart";
var subSelectedValue = "back";

getSubtypes("bodyPart");
getExercise(selectedValue, subSelectedValue);

document.getElementById("sub-type").innerHTML = subTypeArr.map(
    (subtype) => `<option value="${subtype}">${subtype}</option>`
);

document.getElementById("find-ex").addEventListener("click", () => {
  getExercise(selectedValue, subSelectedValue);
});


document.getElementById("next").addEventListener("click", () => {
    k = (k+1)%50
    getExercise(selectedValue, subSelectedValue)
  });
  

  document.getElementById("prev").addEventListener("click", () => {
    if(k > 0){
        k = (k-1)%50
    }
    
    getExercise(selectedValue, subSelectedValue);
  });
  