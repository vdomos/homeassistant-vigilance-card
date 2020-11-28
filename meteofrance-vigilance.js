/* Lovelace Custom Card : meteofrance-vigilance
 * 
 * https://developers.home-assistant.io/docs/frontend/custom-ui/lovelace-custom-card/
 * https://vigilance.meteofrance.fr/fr
 * 
 * Entitie meteo-france: sensor.54_weather_alert

entity: {
    "entity_id": "sensor.54_weather_alert",
    "state": "Vert",
    "attributes": {
        "Inondation": "Vert",
        "Grand-froid": "Vert",
        "Neige-verglas": "Vert",
        "Orages": "Vert",
        "Pluie-inondation": "Vert",
        "Vent violent": "Vert",
        "attribution": "Data provided by Météo-France",
        "friendly_name": "54 Weather alert",
        "icon": "mdi:weather-cloudy-alert"
    },
    "last_changed": "2020-11-24T13:17:24.017579+00:00",
    "last_updated": "2020-11-24T13:17:24.017579+00:00",
    "context": {
        "id": "a35a988c8e7f5bde25cc031047f8ac91",
        "parent_id": null,
        "user_id": null
    }
}
*/


class WeatherVigilance extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      this.card = document.createElement('ha-card');
      this.content = document.createElement('div');
      this.content.style.padding = '0 16px 16px';
      this.card.appendChild(this.content);
      this.appendChild(this.card);
    }

    const entity = hass.states[this.config.entity];
    //console.error("entity: " + JSON.stringify(entity,null, 4)); 
    
    var departement = entity.attributes["friendly_name"].replace(' Weather alert','') ;
    this.card.header = "Vigilance département " + departement ;
    const weatherAlertColor = entity.state;        // Couleur département => Vert ...
    
    const vigilanceColor = {
        "Vert": "green", 
        "Jaune": "yellow", 
        "Orange": "orange",
        "Rouge": "red",
    } ;
    const risksName = ["Vent violent", "Pluie-inondation", "Orages", "Inondation", "Neige-verglas", "Canicule", "Grand-froid", "Avalanches", "Vagues-submersion"] ;

    var vigilanceTxt = "<br>" ;
    var vigilanceRisksColor = [] ;
    var vigilanceTxtColor = 'gris';
    for (var i = 0; i < risksName.length; i++) { vigilanceRisksColor[i] = "gris"; } ;
    var forecastDt = "Prévisions indisponibles";
    var td = "";
    
    if (weatherAlertColor != "unavailable") {
        vigilanceTxtColor = vigilanceColor[weatherAlertColor] ;             // Vert => green    
    
        for (i = 0; i < risksName.length; i++) {
            if (typeof entity.attributes[risksName[i]] == 'undefined') {
                vigilanceRisksColor[i] = "vert" ;
            }
            else { 
                if ( (entity.attributes[risksName[i]] == weatherAlertColor) && (weatherAlertColor != 'Vert') ) {
                    vigilanceTxt = vigilanceTxt + risksName[i] + "<br>" ;
                }
                vigilanceRisksColor[i] = entity.attributes[risksName[i]].toLowerCase();
            }
        }
        if (weatherAlertColor == 'Vert') {
            vigilanceTxt = "<br>Pas de vigilance";
        }
        if (vigilanceTxt.length > 40) {
            vigilanceTxt = vigilanceTxt.substring(4, vigilanceTxt.length - 4);      // Delete fisrt and last '<br>'
        }
    
        var dt = new Date(entity.last_updated) ;        // 2020-11-20T12:51:25.495052+00:00         
        forecastDt = dt.toLocaleString() ;              // 20/11/2020 à 13:51:25
        dt = new Date();
        td = dt.getHours();                             // Pour rafraichissement image vigilance France
    }
    
    this.content.innerHTML = `
    <style>
        #vigicontainer {
            text-align: center;
            height: 130px;
            width: 100%;
            border: 1px solid green;
            margin-bottom: 0.5em;
            background: #D8D8D8 ;
        }
        #imgtxtcontainer {
            height: 100px;
            width: 100%;
        }
        #image {
            display: inline-block; 
            float: left;
            width: 80px;
            height: 80px;
        }
        #riskstext${departement} {
            display: inline-block; 
            margin-top: 5px;
            font-size: 1.5em;
            font-weight: bolder;
            color: ${vigilanceTxtColor};
        }
        #image2 {
            display: inline-block; 
            float: right;
            width: 80px;
            height: 80px;
        }
        #piccontainer {
            text-align: center;
            position: relative;
            background: #31B404 ;
            height: 25px;
            margin-top: -20px;
        }
        #pictoM {
            display: inline-block;
            width: 10%;
            height: auto;
        }
        #vigilancedate {
            width: 100%;
            font-size: 1em;
            text-align: center;
            position: relative;
            background: #D8D8D8 ;
            margin-top: 4px;
        }
    </style>
    
    <div id="vigicontainer">
      <div id="imgtxtcontainer">
            <img id="image" src="http://vigilance.meteofrance.com/data/QGFR08_LFPW_.gif?ts=${td}"/>
            <div id="riskstext${departement}"> 
                <span>${vigilanceTxt}</span>
            </div>
            <img id="image2" src="/local/meteofrance/img/vigilance/logoMeteoFrance.png" />
      </div>
      <div id="piccontainer">  
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_vent_${vigilanceRisksColor[0]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_pluie_${vigilanceRisksColor[1]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_orages_${vigilanceRisksColor[2]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_innondation_${vigilanceRisksColor[3]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_neige_${vigilanceRisksColor[4]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_cannicule_${vigilanceRisksColor[5]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_froid_${vigilanceRisksColor[6]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_avalanche_${vigilanceRisksColor[7]}.gif"></div>
          <div id="pictoM"><img src="/local/meteofrance/img/vigilance/pictoM_vague_${vigilanceRisksColor[8]}.gif"></div>
      </div>
      <div id=vigilancedate>${forecastDt}</div>
    </div>
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
  
}
/*
type: 'custom:meteofrance-vigilance'
entity: sensor.74_weather_alert
*/

customElements.define('meteofrance-vigilance', WeatherVigilance);


