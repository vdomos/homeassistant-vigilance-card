# vigilance card

Cette carte affiche la vigilance Météo-France en s'appuyant sur l'entité **sensor.<DEPARTEMENT>_weather_alert** de l'intégration **meteo-france**

![vigilance1](Meteo-France_Vigilance_Card_1.png)

## Installation

### Copie des fichiers

Installe `vigilance card` en copiant le fichier  `meteofrance/meteofrance-vigilance.js` du dépot dans `<config directory>/www/meteofrance/meteofrance-raininhourforecast.js` de l'instance Home Assistant.

**Example:**

Copier le fichier *meteofrance-vigilance.js* et le répertoire *img* dans le répertoire *meteofrance* créé ci-dessous:

```bash
wget https://github.com/vdomos/homeassistant-vigilance-card/archive/master.zip
cd <config directory>/www
mkdir meteofrance
cd meteofrance
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

![vigilance1](Meteo-France_Vigilance_Card_2.png)

