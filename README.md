Settings:
- Create .env and add your password 

#How to add Model:
Table: Game, Platoforms, Developer sample
##Model
```bash
sequelize model:generate --name OverPage --attributes name:string,image:string,slug:string,owner:integer,theme:string
sequelize model:generate --name NotificationType --attributes code:string,name:string
sequelize model:generate --name Locale --attributes code:string

sequelize model:generate --name pageView --attributes code:string





```

##Migration
```bash
sequelize migration:generate --name notificationType
sequelize migration:generate --name Locale
sequelize migration:generate --name pageView


```

##Seed
```bash
sequelize seed:generate --name notificationType
sequelize seed:generate --name userReports
sequelize seed:generate --name dlc
sequelize seed:generate --name locale

```

##Controller
```js
const { Game } = require('../models')
const GameController = () => {
    const getGames = () => {

    }

    return {
        getGames
    }
}
module.exports = GameController
```

#How to Modify DB:

```bash
sequelize migration:generate --name add-category-type-to-category
```
