
const fetch=require('node-fetch');
async function getdata(){
//    const response= await fetch('https://opentdb.com/api.php?amount=20&category=9&type=multiple');
//    return response.json();
    // .then((res)=>res.json())
    // .then((data)=>console.log(data))
    // .catch(err=>console.log("error occured",err));
    fetch('http://example.com/movies.json')
  .then((response) => response.json())
  .then((data) => console.log(data));

}

// getdata().then(data=>console.log(data)).catch(err=>console.log("error occure",err));
getdata();

