const MongoClient=require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
MongoClient.connect(url,  async function(err,db){
    if(err)
    throw err
    let dbo=db.db("mydb")
    console.log("database connect successfully")

async function insertProduct(){
    var myobj =[
        {
        product: "fruits", 
        total: 50.0, 
        customer: "pinky"
    },
    {
        product: "apples", 
        total: 40.0, 
        customer: "chotu"
    }
]
     let obj = await dbo.collection("shop").insertMany(myobj);
     return obj;
   // console.log(obj);
}

async function getCountOfProduct() {
   
    var count2 =  await dbo.collection("shop").count({product : "apples"})
    console.log(count2);
    return count2;
    
} 
    

async function getDistinctProduct()
{
    var data = await dbo.collection("shop").distinct("product")
    console.log(data);
    return data;
  
}

async function getEachCustAmount()
{
    var data1 = await dbo.collection("shop").aggregate(
        [
             {$match: {} },
             {$group: {_id: "$customer", total: { $sum: "$total"} } }
        ]
   ).toArray();
   console.log(data1);
   return data1;
}
async function getEachProdInSort(){
    var data3 = await dbo.collection("shop").aggregate(
        [
 
        {$match: {product: {$in: ["apples", "fruits"]} } },
             {$group: {_id: "$product", total: { $sum: "$total"} } },
        ]
   ).toArray();
   console.log(data3);
   return data3;
}
async function getCostOfTwoProd()
{
    var prodSum = await dbo.collection("shop").aggregate(
        [
             {$match: {product: {$in: ["apples", "fruits"]} } },
             {$group: {_id: "$product", total: { $sum: "$total"} } },
        ]
   ).toArray();
   console.log(prodSum);
   return prodSum;
   
}
//getEachProdInSort();
// getCountOfProduct();
//insertProduct();
// getDistinctProduct();
 //getEachCustAmount();
 getCostOfTwoProd();

});

