# vigilance card

Cette carte affiche la vigilance Météo-France en s'appuyant sur l'entité **sensor.<DEPARTEMENT>_weather_alert** de l'intégration **meteo-france**

![vigilance1](img/Meteo-France_Vigilance_Card_1.png)

## Installation

### Copie des fichiers

Installe `raininhourforecast card` en copiant le fichier  `meteofrance/meteofrance-raininhourforecast.js` du dépot dans `<config directory>/www/meteofrance/meteofrance-raininhourforecast.js` de l'instance Home Assistant.

**Example:**

```bash
cd <config directory>/www
mkdir meteofrance
cd meteofrance
wget https://github.com/custom-cards/rmv-card/archive/master.zip
```

### Configuration de la ressource

Faire le lien de la ressource js dans votre configuration `configuration.yaml`.

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /local/meteofrance/meteofrance-raininhourforecast.js
      type: module
```

### Ajout de la "custom-card"

Ajouter la nouvealle "card" dans la GUI home-assistant en ajoutant une carte manuelle sur une vue et la renseigant avec la **custom-card** et 
l'entité **meteo-france**:


**Example:**

```yaml
type: 'custom:meteofrance-raininhourforecast'
entity: sensor.nancy_next_rain
```

![vigilance1](img/Meteo-France_Vigilance_Card_1.png)

