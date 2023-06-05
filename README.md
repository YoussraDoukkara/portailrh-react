# Configuration

1. Copiez le projet React dans n'importe quel répertoire de votre choix.

2. Mettez à jour l'URL de l'API dans portailrh/api.js:

```javascript
const API = axios.create({
    baseURL: "http://votre_url_d_application/portailrh/public/api",
        headers: {
            "Content-Type": "application/json",
        },
    });
```

2. Installez les dépendances requises:

```bash
npm install
```