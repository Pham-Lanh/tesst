
function FormHotel(idFestival,nameFestival,amount,typeroom,startday,endday,idd) {
    this.IdFestival=idFestival;
    this.NameFestival=nameFestival;
    this.Amount=amount;
    this.Typeroom=typeroom;
    this.Startday=startday;
    this.Endday=endday;
    this.Idd=idd;


}
$(document).ready(function () {
    ShowManagerCart();
    
    $(document).on('click','.saveM',function () {
        var type=$(this).data('type');
        var idd=$(this).data('id');
        var u=JSON.parse(localStorage.listUser);

        if(type=='Ticket'){

            for(var i in loadCart[u.IdCart].Ticket){

                if(loadCart[u.IdCart].Ticket[i].Idd==idd ){
                    var a=$('#'+type+loadCart[u.IdCart].Ticket[i].Idd).val();
                    var rootRef = firebase.database().ref().child('cart/'+u.IdCart+'/Ticket/'+i+'/Amount');
                    rootRef.set(a);
                    var rootRef = firebase.database().ref().child('cart/'+u.IdCart+'/Total');
                    var c=parseInt(loadCart[u.IdCart].Total)+parseInt(a)-parseInt(loadCart[u.IdCart].Ticket[i].Amount);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }


        }else if(type=='Tour'){

            for(var i in loadCart[u.IdCart].Tour){

                if(loadCart[u.IdCart].Tour[i].Idd==idd ){
                    var a=$('#'+type+loadCart[u.IdCart].Tour[i].Idd).val();
                    var rootRef = firebase.database().ref().child('cart/'+u.IdCart+'/Tour/'+i+'/Amount');
                    rootRef.set(a);
                    var rootRef = firebase.database().ref().child('cart/'+u.IdCart+'/Total');
                    var c=parseInt(loadCart[u.IdCart].Total)+parseInt(a)-parseInt(loadCart[u.IdCart].Tour[i].Amount);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }



        } else {
            for(var i in loadCart[u.IdCart].Hotel){

                if(loadCart[u.IdCart].Hotel[i].Idd==idd ){
                    var toltalroom
                    var a=$('#'+type+loadCart[u.IdCart].Hotel[i].Idd).val();
                    var typeroom=$('#exampleFormControlSelected'+loadCart[u.IdCart].Hotel[i].Idd).children("option:selected").text();
                    var Startday=$('#exampleFormControlStartday'+loadCart[u.IdCart].Hotel[i].Idd).val();
                    var Endday=$('#exampleFormControlEndday'+loadCart[u.IdCart].Hotel[i].Idd).val();
                    var rootRef = firebase.database().ref().child('cart/'+u.IdCart+'/Hotel/'+i);
                    console.log(typeroom);
                    console.log(Startday);
                    console.log(Endday);
                    console.log(a);


                    var d=new FormHotel(loadCart[u.IdCart].Hotel[i].IdFestival,loadCart[u.IdCart].Hotel[i].NameFestival,a,typeroom,Startday,Endday,loadCart[u.IdCart].Hotel[i].Idd);
                    rootRef.set(d);
                    var rootRef = firebase.database().ref().child('cart/'+u.IdCart+'/Total');
                    var c=parseInt(loadCart[u.IdCart].Total)+parseInt(a)-parseInt(loadCart[u.IdCart].Hotel[i].Amount);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }



        }

    });


});

function ShowManagerCart() {
    var n=JSON.parse(localStorage.listUser);
    console.log(n.IdCart);
    var rootRef = firebase.database().ref().child('cart/'+n.IdCart+'/Ticket/');
    rootRef.on('child_added', function (data) {
        var j = data.val();
        document.getElementById('ShownextF').innerHTML +=ShowtagCart(j.NameFestival,'Money/A ticket:$ '+j.Money,j.Amount,'../images/service/ticket.jpg',j.Idd,j.IdFestival,'Ticket');
    });
    var rootRef1 = firebase.database().ref().child('cart/'+n.IdCart+'/Tour/');
    rootRef1.on('child_added', function (data) {
        var j = data.val();

        document.getElementById('ShownextF').innerHTML +=ShowtagCart(j.NameFestival,'Money/A tour:$ '+j.Money,j.Amount,'../images/service/tour.jpg',j.Idd,j.IdFestival,'Tour');

    });
    var rootRef1 = firebase.database().ref().child('cart/'+n.IdCart+'/Hotel/');
    rootRef1.on('child_added', function (data) {
        var j = data.val();

        document.getElementById('ShownextF').innerHTML +=ShowtagCart1(j.NameFestival,j.Typeroom,j.Amount,'../images/service/hotel.jpg',j.Idd,j.IdFestival,'Hotel',j.Startday,j.Endday);
        console.log(j.Typeroom);

    });

}


function ShowtagCart(name,money,number,img,idd,idF,type) {
    return  '<div class="row mb-2">'
        +'<div class="col-md-12">'
        +'<div class="card ">'
        +'<div class="card-body">'
        +'<div class="row">'
        +'<div class="col-md-4">'
        +'<img class="imgNF" src="'+img+'">'
        +'</div>'
        +'<div class="col-md-8">'
        +'<div class="news-title">'
        +'<a href="#"><h5>'+name+'</h5></a>'
        +'</div>'
        +'<div class="news-content">'
        +'<h5>Total Tickets: </h5>'
        +'<input id="'+type+idd+'" type="number" value="'+number+'">'
        +'</div>'
        +'<div class="news-content">'
        +'<h5>'+money+'</h5>'
        +'</div>'
        +'<div class="news-buttons">'
        +'<span><a data-idF="'+idF+'" data-type="'+type+'" data-id="'+idd+'" class="btn btn-primary CartDetail" href="DetailCart.html" role="button">Detail</a><button data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-danger ddd" >Delete</button> <button data-idF="'+idF+'" data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-success saveM" >save</button></span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>';


};
function ShowtagCart1(name,typeroom,number,img,idd,idF,type,startday,enđay) {
    return  '<div class="row mb-2">'
        +'<div class="col-md-12">'
        +'<div class="card ">'
        +'<div class="card-body">'
        +'<div class="row">'
        +'<div class="col-md-4">'
        +'<img class="imgNF" src="'+img+'">'
        +'</div>'
        +'<div class="col-md-8">'
        +'<div class="news-title">'
        +'<a href="#"><h5>'+name+'</h5></a>'
        +'</div>'
        +'<div class="news-content">'
        +'<h5>Total Room: </h5>'
        +'<input type="number" id="'+type+idd+'" value="'+number+'">'
        +'</div>'
        +'<div class="news-content">'
        +'<div class="form-group">'
        +'<h5><label for="exampleFormControlSelect1">Room types:</label></h5>'
    +'<select class="form-control" id="exampleFormControlSelected'+idd+'">'
        +'<option id="typeoption2">'+typeroom+'</option>'
        +'<option>Single room</option>'
    +'<option>Double room</option>'
    +'<option>Triple room</option>'
    +'<option>Queen room</option>'
    +'<option>Studio room</option>'
    +'</select>'
    +'</div>'
        +'</div>'
        +'<div class="news-content">'
        +'From : <input id="exampleFormControlStartday'+idd+'" type="date" value="'+startday+'">'
        +' To: <input id="exampleFormControlEndday'+idd+'" type="date" value="'+enđay+'">'
        +'</div>'
        +'<div class="news-buttons">'
        +'<span><a data-idF="'+idF+'" data-type="'+type+'" data-id="'+idd+'" class="btn btn-primary CartDetail" href="DetailCart.html" role="button">Detail</a><button data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-danger ddd" >Delete</button> <button data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-success saveM" >save</button></span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>';


};
// var loadC = [];
// var listUserCart;
// function loadcartdetail() {
//     console.log("Dsadasdasdsa")
//     var rootRef = firebase.database().ref().child('cart/');

//     rootRef.on('child_added', function (data, id) {
//         loadC.push(data.val())
//     });
// }
// $("#squarespaceModalXX").click(function(){
// })
// loadcartdetail()

function purcharse(iduser,name, email, address, numberphone, numberbank, bank) {
    this.Iduser = iduser;
    this.Name = name;
    this.Email = email;
    this.Address = address;
    this.Phone = numberphone;
    this.Bank = numberbank;
    this.Typebank = bank;
};

$(document).ready(function(){
    loadpurcharse();
    // $('#savedata').click(function(){
    //     console.log('dsadasdsadas')
    //     var name = $('#username').val();
    //     var mail = $('usermail').val();
    //     var address = $('subject').val();
    //     var numberphone = $('message').val();
    //     var numberbank = $('stknb').val();
    //     var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // if(!filter.test(email)){
    //     $('.wr2').html('Invalid email!');
    //     return;
    // }
    // var id;
    // if(lishpurcharse.length==0){
    //     id=0;
    // }else {
    //     id=lishpurcharse.length;
    // }
    // var b = new purcharse(name,email,address,numberphone,numberbank)
    // console.log(b);
    // var rootRef = firebase.database().ref().child('/Purcharse' +id);
    // rootRef.set(b);
    // alert('thank you !');
    // });
});
var lishpurcharse = [];
var iduser = JSON.parse(localStorage.listUser).Id
        console.log(iduser)
$('#savedata').click(function(){
console.log("dasdasda")
        console.log(lishpurcharse)
        var name = $('#username').val();
        console.log(name)
        var email= $('#usermail').val();
        console.log(email)
        var address = $('#subject').val();
        console.log(address)

        var numberphone = $('#message').val();
        console.log(numberphone)

        var numberbank = $('#stknb').val();
        console.log(numberbank)
        var bank = $('#selectbank').val()

        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(!filter.test(email)){
        $('#usermail').html('Invalid email!');
        return;
    }
    var id;
    if(lishpurcharse.length==0){
        id=0;
    }else {
        id=lishpurcharse.length;
    }
    console.log(id);
    var b = new purcharse(iduser,name,email,address,numberphone,numberbank,bank)
    console.log(b);
    var rootRef = firebase.database().ref().child('Purcharse/'+id);
    rootRef.set(b);
    alert('thank you !');
})
function loadpurcharse(){
    var rootRef = firebase.database().ref().child('Purcharse/');
    rootRef.on('child_added', function (data) {
        var a = data.val();
        
        lishpurcharse.push(new purcharse(a.Iduser,a.Name, a.Email, a.Address, a.Phone, a.Bank, a.Typebank))
    });

}

// function loadfeedback() {
//     var rootRef = firebase.database().ref().child('feedback/');
//     rootRef.on('child_added', function (data) {
//         var j = data.val();
//         listfeedback.push(new feedback(j.Username,j.Email,j.Conten,j.Feedback));
//     });
// }