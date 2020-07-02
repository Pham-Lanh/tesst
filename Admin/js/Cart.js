
firebase.initializeApp(config);
var loadCart = [];
function Cart(ticket, tour, hotel, total) {
    this.Ticket = ticket;
    this.Tour = tour;
    this.Hotel = hotel;
    this.Total = total;

}
function FormTicket(idFestival, nameFestival, amount, money, idd) {
    this.IdFestival = idFestival;
    this.NameFestival = nameFestival;
    this.Amount = amount;
    this.Money = money;
    this.Idd = idd;

}
function FormHotel(idFestival, nameFestival, amount, typeroom, startday, endday, idd) {
    this.IdFestival = idFestival;
    this.NameFestival = nameFestival;
    this.Amount = amount;
    this.Typeroom = typeroom;
    this.Startday = startday;
    this.Endday = endday;
    this.Idd = idd;


}
window.onload = function () {


};
$(document).ready(function () {
    loaddataCart();
    ShowManagerCart();
    setTimeout(() => {
        SHowcart();
    }, 2000)
    $(document).on('click', '.saveM', function () {
        var type = $(this).data('type');
        var idd = $(this).data('id');
        var IdCart = $(this).data('idcart')

        if (type == 'Ticket') {

            for (var i in loadCart[IdCart].Ticket) {

                if (loadCart[IdCart].Ticket[i].Idd == idd) {
                    var a = $('#' + type + loadCart[IdCart].Ticket[i].Idd).val();
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Ticket/' + i + '/Amount');
                    rootRef.set(a);
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Total');
                    var c = parseInt(loadCart[IdCart].Total) + parseInt(a) - parseInt(loadCart[IdCart].Ticket[i].Amount);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }


        } else if (type == 'Tour') {

            for (var i in loadCart[IdCart].Tour) {

                if (loadCart[IdCart].Tour[i].Idd == idd) {
                    var a = $('#' + type + loadCart[IdCart].Tour[i].Idd).val();
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Tour/' + i + '/Amount');
                    rootRef.set(a);
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Total');
                    var c = parseInt(loadCart[IdCart].Total) + parseInt(a) - parseInt(loadCart[IdCart].Tour[i].Amount);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }



        } else {
            for (var i in loadCart[IdCart].Hotel) {

                if (loadCart[IdCart].Hotel[i].Idd == idd) {
                    var toltalroom
                    var a = $('#' + type + loadCart[IdCart].Hotel[i].Idd).val();
                    var typeroom = $('#exampleFormControlSelected' + loadCart[IdCart].Hotel[i].Idd).children("option:selected").text();
                    var Startday = $('#exampleFormControlStartday' + loadCart[IdCart].Hotel[i].Idd).val();
                    var Endday = $('#exampleFormControlEndday' + loadCart[IdCart].Hotel[i].Idd).val();
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Hotel/' + i);
                    console.log(typeroom);
                    console.log(Startday);
                    console.log(Endday);
                    console.log(a);


                    var d = new FormHotel(loadCart[IdCart].Hotel[i].IdFestival, loadCart[IdCart].Hotel[i].NameFestival, a, typeroom, Startday, Endday, loadCart[IdCart].Hotel[i].Idd);
                    rootRef.set(d);
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Total');
                    var c = parseInt(loadCart[IdCart].Total) + parseInt(a) - parseInt(loadCart[IdCart].Hotel[i].Amount);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }
            }



        }

    });

    //////
    $(document).on('click', '.ddd', function () {
        loaddataCart();
        var type = $(this).data('type');
        console.log(type)
        var id = $(this).data('id');
        var total = $(this).data('total');
        var IdCart = $(this).data('idcart')
        if (type == 'Ticket') {
            for (var i in loadCart[IdCart].Ticket) {
                if (id == loadCart[IdCart].Ticket[i].Idd) {
                    var rootRef1 = firebase.database().ref().child('cart/' + IdCart + '/' + 'Ticket' + '/' + i);
                    rootRef1.set('');
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Total');
                    var c = parseInt(loadCart[IdCart].Total) - parseInt(total);
                    rootRef.set(c);



                    window.location.reload(true);
                    return;
                }

            }

        } else if (type == 'Tour') {
            for (var i in loadCart[IdCart].Tour) {
                if (id == loadCart[IdCart].Tour[i].Idd) {
                    var rootRef1 = firebase.database().ref().child('cart/' + IdCart + '/' + 'Tour' + '/' + i);
                    rootRef1.set('');
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Total');
                    var c = parseInt(loadCart[IdCart].Total) - parseInt(total);
                    rootRef.set(c);



                    window.location.reload(true);
                    return;
                }

            }


        } else {
            for (var i in loadCart[IdCart].Hotel) {
                if (id == loadCart[IdCart].Hotel[i].Idd) {
                    var rootRef1 = firebase.database().ref().child('cart/' + IdCart + '/' + 'Hotel' + '/' + i);
                    rootRef1.set('');
                    var rootRef = firebase.database().ref().child('cart/' + IdCart + '/Total');
                    var c = parseInt(loadCart[IdCart].Total) - parseInt(total);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }

            }

        }





    });



});
function loaddataCart() {
    var rootRef = firebase.database().ref().child('cart/');

    rootRef.on('child_added', function (data, id) {
        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }
        loadCart.push(new Cart(j.Ticket, j.Tour, j.Hotel, j.Total));
    });

}
var loadnamesearch = [];
function ShowManagerCart() {
    var rootRefall = firebase.database().ref().child('cart/');
    rootRefall.on('child_added', function (data, id) {
        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }
        var rootRef1 = firebase.database().ref().child(`login/${id}`);
        rootRef1.on("child_added", function (dataUser) {
            if (dataUser.key === "Username") {
                console.log(id)
                document.getElementById('accordionEx1').innerHTML += Pustcart(id, dataUser.val());
                loadnamesearch.push(Object.assign(j, { Username: dataUser.val() }))
                console.log(loadnamesearch)
            }

        })


    });
}


function SHowcart() {
    var rootRefall = firebase.database().ref().child('cart/');
    rootRefall.on('child_added', function (data, id) {
        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }
        var rootRef = firebase.database().ref().child('cart/' + id + '/Ticket/');
        rootRef.on('child_added', function (data) {
            var j = data.val();
            document.getElementById('ShownextF' + id).innerHTML += ShowtagCart(id, j.NameFestival, 'Money/A ticket:$ ' + j.Money, j.Amount, '../images/service/ticket.jpg', j.Idd, j.IdFestival, 'Ticket');
        });
        var rootRef1 = firebase.database().ref().child('cart/' + id + '/Tour/');
        rootRef1.on('child_added', function (data) {
            var j = data.val();

            document.getElementById('ShownextF' + id).innerHTML += ShowtagCart(id, j.NameFestival, 'Money/A tour:$ ' + j.Money, j.Amount, '../images/service/tour.jpg', j.Idd, j.IdFestival, 'Tour');

        });
        var rootRef1 = firebase.database().ref().child('cart/' + id + '/Hotel/');
        rootRef1.on('child_added', function (data) {
            var j = data.val();
            console.log(id)
            document.getElementById('ShownextF' + id).innerHTML += ShowtagCart1(id, j.NameFestival, j.Typeroom, j.Amount, '../images/service/hotel.jpg', j.Idd, j.IdFestival, 'Hotel', j.Startday, j.Endday);

        });

    });

}



// search
$('#seatch').keyup(function () {
    const query = this.value;
    if (query !== '') {
        var resutl = loadnamesearch.filter(function (item) {
            return item.Username.includes(query)

        })
        document.getElementById('accordionEx1').innerHTML = '';

        resutl.forEach(function (item, index) {
            document.getElementById('accordionEx1').innerHTML += Pustcart(index, item.Username);

        })
        console.log(resutl)
        if (resutl.length !== 0) {
            resutl.forEach(function (item, index) {
                item.Hotel.forEach(function (hotel) {
                    document.getElementById('ShownextF' + index).innerHTML += ShowtagCart1(index, hotel.NameFestival, hotel.Typeroom, hotel.Amount, '../images/service/hotel.jpg', hotel.Idd, hotel.IdFestival, 'Hotel', hotel.Startday, hotel.Endday);
                })
                item.Ticket.forEach(function (ticket) {
                    document.getElementById('ShownextF' + index).innerHTML += ShowtagCart(index, ticket.NameFestival, 'Money/A ticket:$ ' + ticket.Money, ticket.Amount, '../images/service/ticket.jpg', ticket.Idd, ticket.IdFestival, 'Ticket');

                })
                item.Tour.forEach(function (tour) {
                    document.getElementById('ShownextF' + index).innerHTML += ShowtagCart(index, tour.NameFestival, 'Money/A tour:$ ' + tour.Money, tour.Amount, '../images/service/tour.jpg', tour.Idd, tour.IdFestival, 'Tour');

                })
            })
        }
    }
    else{
        document.getElementById('accordionEx1').innerHTML = '';
        loadnamesearch = [];
        loaddataCart();
        ShowManagerCart();
        setTimeout(() => {
            SHowcart();
        }, 2000)
    }




});
// function ShowtagCart(idcart, name, money, number, img, idd, idF, type) {
//     return '<div class="row mb-2">'
//         + '<div class="col-md-12">'
//         + '<div class="card ">'
//         + '<div class="card-body">'
//         + '<div class="row">'
//         + '<div class="col-md-4">'
//         + '<img class="imgNF" src="' + img + '">'
//         + '</div>'
//         + '<div class="col-md-8">'
//         + '<div class="news-title">'
//         + '<a href="#"><h5>' + name + '</h5></a>'
//         + '</div>'
//         + '<div class="news-content">'
//         + '<h5>Total Tickets: </h5>'
//         + '<input id="' + type + idd + '" type="number" value="' + number + '">'
//         + '</div>'
//         + '<div class="news-content">'
//         + '<h5>' + money + '</h5>'
//         + '</div>'
//         + '<div class="news-buttons">'
//         + '<span><button data-idcart="' + idcart + '" data-type="' + type + '" data-id="' + idd + '" type="button" class="btn btn-danger ddd" >Delete</button> <button data-idcart="' + idcart + '" data-idF="' + idF + '" data-type="' + type + '" data-id="' + idd + '" type="button" class="btn btn-success saveM" >save</button></span>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>';


// };
// function ShowtagCart1(idcart, name, typeroom, number, img, idd, idF, type, startday, enđay) {
//     return '<div class="row mb-2">'
//         + '<div class="col-md-12">'
//         + '<div class="card ">'
//         + '<div class="card-body">'
//         + '<div class="row">'
//         + '<div class="col-md-4">'
//         + '<img class="imgNF" src="' + img + '">'
//         + '</div>'
//         + '<div class="col-md-8">'
//         + '<div class="news-title">'
//         + '<a href="#"><h5>' + name + '</h5></a>'
//         + '</div>'
//         + '<div class="news-content">'
//         + '<h5>Total Room: </h5>'
//         + '<input type="number" id="' + type + idd + '" value="' + number + '">'
//         + '</div>'
//         + '<div class="news-content">'
//         + '<div class="form-group">'
//         + '<h5><label for="exampleFormControlSelect1">Room types:</label></h5>'
//         + '<select class="form-control" id="exampleFormControlSelected' + idd + '">'
//         + '<option id="typeoption2">' + typeroom + '</option>'
//         + '<option>Single room</option>'
//         + '<option>Double room</option>'
//         + '<option>Triple room</option>'
//         + '<option>Queen room</option>'
//         + '<option>Studio room</option>'
//         + '</select>'
//         + '</div>'
//         + '</div>'
//         + '<div class="news-content">'
//         + 'From : <input id="exampleFormControlStartday' + idd + '" type="date" value="' + startday + '">'
//         + ' To: <input id="exampleFormControlEndday' + idd + '" type="date" value="' + enđay + '">'
//         + '</div>'
//         + '<div class="news-buttons">'
//         + '<span><button data-idcart="' + idcart + '" data-type="' + type + '" data-id="' + idd + '" type="button" class="btn btn-danger ddd" >Delete</button> <button data-idcart="' + idcart + '" data-type="' + type + '" data-id="' + idd + '" type="button" class="btn btn-success saveM" >save</button></span>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>'
//         + '</div>';


// };
function ShowtagCart(idcart,name,money,number,img,idd,idF,type) {
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
        +'<span><button data-idcart="'+idcart+'" data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-danger ddd" >Delete</button> <button data-idcart="'+idcart+'" data-idF="'+idF+'" data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-success saveM" >save</button></span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>';


};
function ShowtagCart1(idcart,name,typeroom,number,img,idd,idF,type,startday,enđay) {
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
        +'<span><button data-idcart="'+idcart+'" data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-danger ddd" >Delete</button> <button data-idcart="'+idcart+'" data-type="'+type+'" data-id="'+idd+'" type="button" class="btn btn-success saveM" >save</button></span>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>'
        +'</div>';


};
function Pustcart(id, name = "dasdsa") {
    return '<div class="card">'
        + '<div class="card-header" role="tab" id="headingTwo' + id + '">'
        + '<a class="collapsed" data-toggle="collapse" data-parent="#accordionEx1" href="#collapseTwo' + id + '"'
        + 'aria-expanded="false" aria-controls="collapseTwo' + id + '">'
        + '<h5 class="mb-0">' + name + '</h5>'
        + '</a>'
        + '</div>'
        + '<div id="collapseTwo' + id + '" class="collapse" role="tabpanel" aria-labelledby="headingTwo' + id + '" data-parent="#accordionEx1">'
        + '<div class="card-body">'
        + '<div class="row">'
        + '<div class="col-md-12" id="ShownextF' + id + '">'
        + '</div></div></div></div></div>';



}
