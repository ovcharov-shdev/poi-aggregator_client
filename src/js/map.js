var markers = [
    {
        lat: 59.913052,
        lng: 10.743846,
        type: "",
        isActive: true,
        imgUrl: "../images/activities/001.jpg",
        cardTtl: "AdventureRooms Oslo — Escape room",
        cardTime: "11:00—15:00"
    },
    {
        lat: 59.903052,
        lng: 10.763846,
        type: "",
        isActive: false,
        imgUrl: "../images/activities/004.jpg",
        cardTtl: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas repellendus fuga, aliquam qui temporibus accusantium dolor, nostrum, nemo, minima quibusdam voluptate ea. Dolor laborum dolores natus veritatis necessitatibus expedita, cumque",
        cardTime: "11:00—15:00",
        label: 15,
        arrangements: [
            {
                type: "full",
                ttl: "Bogstad Gård - storhet i vakre omgivelser",
                imgUrl: "../images/activities/005.jpg",
                theDate: "16 Nov",
                theTime: "11:00—15:00"
            }, {
                type: "quick",
                ttl: "Dukketeater basert på Alf Prøysens tekster, har spilt hver basert på Alf Prøysens tekster, har spilt hver",
                theDate: "15 Nov",
                theTime: "14:00—15:00"
            }, {
                type: "full",
                ttl: "Bogstad Gård - storhet i vakre omgivelser",
                imgUrl: "../images/activities/005.jpg",
                theDate: "16 Nov",
                theTime: "11:00—15:00"
            }, {
                type: "full",
                ttl: "Jul med Prøysen og snekker Andersen",
                imgUrl: "../images/activities/006.jpg",
                theDate: "15 Nov",
                theTime: "14:00—15:00"
            }, {
                type: "full",
                ttl: "Bogstad Gård - storhet i vakre omgivelser",
                imgUrl: "../images/activities/005.jpg",
                theDate: "16 Nov",
                theTime: "11:00—15:00"
            }, {
                type: "full",
                ttl: "Jul med Prøysen og snekker Andersen",
                imgUrl: "../images/activities/006.jpg",
                theDate: "15 Nov",
                theTime: "14:00—15:00"
            }, {
                type: "full",
                ttl: "Bogstad Gård - storhet i vakre omgivelser",
                imgUrl: "../images/activities/005.jpg",
                theDate: "16 Nov",
                theTime: "11:00—15:00"
            }, {
                type: "full",
                ttl: "Jul med Prøysen og snekker Andersen",
                imgUrl: "../images/activities/006.jpg",
                theDate: "15 Nov",
                theTime: "14:00—15:00"
            }
        ]
    },
    {
        lat: 59.914632,
        lng: 10.705104,
        type: "appointment",
        isActive: false,
        imgUrl: "../images/activities/002.jpg",
        cardTtl: "Tertitten — Urskog-Hølandsbanen",
        cardTime: "11:00—15:00"
    },
    {
        lat: 59.923052, 
        lng: 10.758846,
        type: "closed",
        isActive: false,
        imgUrl: "../images/activities/003.jpg",
        cardTtl: "Alna Ridesenter",
        cardDate: "16 Nov",
        cardTime: "11:00—15:00"
    },
    {
        lat: 59.900052, 
        lng: 10.720846,
        type: "point",
        isActive: false,
        cardTtl: "5"
    }
]


var overlay = [];
HTMLMarker.prototype = new google.maps.OverlayView();

function initMap() {
    var myLatLng = new google.maps.LatLng(59.913052, 10.743846);
    var mapOptions = {
        zoom: 14,
        center: myLatLng,
        gestureHandling: 'cooperative',
        mapTypeId: google.maps.MapTypeId.READMAP
    };
    
    var gmap = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    
    for (i=0;i<markers.length;i++) {
        overlay.push(new HTMLMarker(markers[i].lat, markers[i].lng, gmap, markers[i]));
    }
}

window.onload = initMap();


function HTMLMarker(lat,lng, map, item){
    this.lat_ = lat;
    this.lng_ = lng;
    this.pos_ = new google.maps.LatLng(lat,lng);
    this.map_ = map;
    this.div_ = null;
    this.item_ = item;
    this.setMap(map);
}

HTMLMarker.prototype.onAdd= function() {
    var label = (this.item_.label && this.item_.label>0)?`
        <mark class="map-marker__label">${this.item_.label}</mark>
    `:'';

    var arrangements = '';
    if (this.item_.arrangements) {
        for (let i = 0; i < this.item_.arrangements.length; i++) {
            if (this.item_.arrangements[i].type == "full") {
                arrangements += `
                    <section class="map-card map-card_active map-card_arrangement">
                        <div class="map-card__img" style="background-image: url(${this.item_.arrangements[i].imgUrl})"></div>
                        
                        <div class="map-card__data">
                            <strong class="map-card__ttl">${this.item_.arrangements[i].ttl}</strong>
                            <p class="map-card__extra">
                                <span class="map-card__date">${this.item_.arrangements[i].theDate}</span>
                                <span class="map-card__time icon icon_clock">${this.item_.arrangements[i].theTime}</span>
                                <a href="#" class="map-card__link">More</a>
                            </p>
                        </div>
                    </section>`;
            }
            else {
                arrangements += `
                    <section class="map-card map-card_active map-card_arrangement">
                        <div class="map-card__data">
                            <strong class="map-card__ttl map-card__ttl_desc">${this.item_.arrangements[i].ttl}</strong>
                            <p class="map-card__extra">
                                <span class="map-card__date">${this.item_.arrangements[i].theDate}</span>
                                <span class="map-card__time icon icon_clock">${this.item_.arrangements[i].theTime}</span>
                                <a href="#" class="map-card__link">More</a>
                            </p>
                        </div>
                    </section>`;
            }
        }
    }

    var self = this;
    var div = document.createElement('div');

    if (this.item_.type != "point") {
        div.className = "map-marker" + (this.item_.isActive?' map-marker_active':'');
        div.innerHTML = `
        <svg class="map-marker__pin${this.item_.type == 'appointment'?' map-marker__pin_appointment':(this.item_.type == 'closed'?' map-marker__pin_closed':'')}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 36 44">
            <path class="map-marker__back" d="M18,1C8.6,1,1,8.7,1,18.1C1,29.4,12.1,34.7,13.4,36c1.4,1.3,2.6,4.2,3.1,5.8
                c0.2,0.8,0.9,1.2,1.5,1.2s1.3-0.4,1.5-1.2c0.5-1.6,1.6-4.5,3.1-5.8C24,34.7,35,29.4,35,18.1C35,8.7,27.4,1,18,1z M18,22.8
                c-2.6,0-4.6-2.1-4.6-4.7s2.1-4.7,4.6-4.7c2.6,0,4.6,2.1,4.6,4.7S20.6,22.8,18,22.8z"/>
            <path class="map-marker__border" d="M18,1C8.6,1,1,8.7,1,18.1C1,29.4,12.1,34.7,13.4,36c1.4,1.3,2.6,4.2,3.1,5.8
                c0.2,0.8,0.9,1.2,1.5,1.2s1.3-0.4,1.5-1.2c0.5-1.6,1.6-4.5,3.1-5.8C24,34.7,35,29.4,35,18.1C35,8.7,27.4,1,18,1z M18,22.8
                c-2.6,0-4.6-2.1-4.6-4.7s2.1-4.7,4.6-4.7c2.6,0,4.6,2.1,4.6,4.7S20.6,22.8,18,22.8z"/>
        </svg>
        <aside class="map-marker__card">
            <section class="map-card${this.item_.isActive?' map-card_active':''}">
                <div class="map-card__img" style="background-image: url(${this.item_.imgUrl})"></div>
                
                <div class="map-card__data">
                    <strong class="map-card__ttl">${this.item_.cardTtl}</strong>
                    <p class="map-card__extra">
                        <span class="map-card__time icon icon_clock">${this.item_.cardTime}</span>
                        <a href="#" class="map-card__link">More</a>
                    </p>
                </div>
                
                <a href="javascript:void(0)" class="map-card__closer icon icon_cross"></a>
            </section>
            ${(arrangements)?`<section class="map-marker__arrangement-box">${arrangements}</section>`:''}
        </aside>
        ${label}`;
    } else {
        div.className = "map-marker map-marker_point";
        div.innerHTML = `<span class="map-marker__point-label">${this.item_.cardTtl}</span>`;
    }

    this.div_ = div;
    
    var panes = this.getPanes();
    panes.overlayImage.appendChild(div);

    google.maps.event.addDomListener(div, "click", function(event) {
        // TODO we should to set map-card_active here. Toggle used here for demo and simplification
        div.children[1].children[0].classList.toggle('map-card_active');
        div.children[1].parentElement.classList.toggle('map-marker_active');
        google.maps.event.trigger(self, "click");
    });
}

HTMLMarker.prototype.draw = function() {
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.pos_);
    // var panes = this.getPanes();
    var div = this.div_;
    
    div.style.left = position.x -20 + 'px';
    div.style.top = position.y -60 + 'px';
}

HTMLMarker.prototype.onRemove= function() {
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
}