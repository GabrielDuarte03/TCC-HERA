const db = firebase.firestore();
var u = 0;
var c = 0;
var a = 0;



db.collection("Usuarias")
    .get()
    .then((querySnapshot) => {
        console.log("OI LINDA");
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            u++;
            console.log(u);
            
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    alert("Usuarias: "+u)

    db.collectionGroup('Anjo')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                a++;
                console.log(a)
            });
        })
        
        


    db.collectionGroup('Chamados')
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                c++;
                console.log(c)
            });
        })
    
        
    
        