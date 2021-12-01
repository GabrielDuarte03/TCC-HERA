const db = firebase.firestore();
var pg = 0;
var npg = 0;
var u =0;
var c = 0;
var a = 0;
var data = "";
var janeiro=0
var fevereiro=0
var marco=0
var abril=0
var maio=0
var junho=0
var julho=0
var agosto=0
var setembro=0
var outubro=0
var novembro=0
var dezembro=0
var idade = 0
var pro = 0
var prem = 0
var data
var ano
var anoAtual
var idadeFinal = 0
var media = 0
var nomeAdmin


async function valores(){

await db.collection("Usuarias")
  .get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          u++;
          console.log(u); 
          data = doc.data().datanascimento
          ano = data.charAt(6)+data.charAt(7)+data.charAt(8)+data.charAt(9)
          anoAtual = new Date().getFullYear();
          idade = anoAtual - ano;
          console.log(idade)
          idadeFinal += idade
          if(doc.data().plano=="Light"){
            pg++
          }else if(doc.data().plano=="Pro"){
            pro++
          }else if(doc.data().plano=="Premium"){
            prem++
          }else{
            npg++
          }

      }); 
      media = idadeFinal/u;
      console.log(media)
  })
  .catch((error) => {
      console.log("Error getting documents: ", error);
  });
    
 await db.collectionGroup('Anjo')
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              a++;
              console.log(a)
          });
      })
      
 await db.collectionGroup('Chamados')
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              //console.log(doc.id, " => ", doc.data());
             data = doc.data().data;
             data = data.valueOf();
             data = data.charAt(3) + data.charAt(4)
             c++;
             if(data == '01') {
               
               janeiro++;
             }else if(data == '02') {
               
               fevereiro++;
             }else if(data == '03') {
               
               marco++;
             }else if(data == '04') {
              
              abril++;
             }else if(data == '05') {
              
              maio++;
             }else if(data == '06') {
              
              junho++;
             }else if(data == '07') {
              
              julho++;
             }else if(data == '08') {
              
              agosto++;
             }else if(data == '09') {
              
              setembro++;
             }else if(data == '10') {
              
              outubro++;
             }else if(data == '11') {
              
              novembro++;
             }else if(data == '12') {
              
              dezembro++;
             }

             

            document.getElementById('h3_user').innerHTML = u
            document.getElementById('h3_media').innerHTML = media.toFixed(0)
            document.getElementById('h3_anjo').innerHTML = a
            document.getElementById('h3_oco').innerHTML = c
            
            
            });
            
            
            
  var ctx = document.getElementById('myChart').getContext('2d');        
  var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
      datasets: [{
          label: 'Ocorrências por mês',
          data: [janeiro, fevereiro, marco, abril, maio, junho,julho,agosto,setembro,outubro,novembro,dezembro],
          backgroundColor: [
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
              'rgba(224,25,92,1)',
          ],
          borderColor: [
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              'rgba(0, 0, 0,0.4)',
              
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
});




var ctx2 = document.getElementById('myChart2').getContext('2d');        
  var myChart2 = new Chart(ctx2, {
  type: 'pie',
  data: {
labels: [
  'Light',
  'Pro',
  'Premium',
  'Não assinantes',
],
datasets: [{
  label: 'Usuárias assinantes e não assinantes',
  data: [pg,pro,prem, npg],
  backgroundColor: [
    'rgb(224,25,92)',
    
    
    'rgb(255,105,180)',
    'rgb(255,192,203)',
    'rgb(173,216,230)',

  ],
  hoverOffset: 4
}]
},
});


var ctx3 = document.getElementById('myChart3').getContext('2d');        
  var myChart3 = new Chart(ctx3, {  

  type: 'line',
  data: {
    labels: ['fdsf',
'fdsfs',
'fsdfds',],
datasets: [{
  label: 'Seila',
  backgroundColor: 'rgb(255, 99, 132)',
  borderColor: 'rgb(255, 99, 132)',
  data: [0, 10, 5],
}]
},
});
     
      })//FIM DA FUNÇAO VALORES
    }