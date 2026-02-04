deployed with fly.io 
https://phonebook-backend-polished-dream-3083.fly.dev/info
https://phonebook-backend-polished-dream-3083.fly.dev/api/persons

const url = `mongodb+srv://hannshaustein_db_user:${password}@cluster0.gcbgurx.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

#See all persons
node mongo.js <password>

#add person, attention with space, use quotation marks like "Mike Pence"
node mongo.js <password> name number

fly launch --no-deploy
fly deploy
fly scale show
fly scale count 1
fly apps open

https://cloud.mongodb.com/v2/698315ab2461390cf171314b#/overview

https://cloud.mongodb.com/v2/698315ab2461390cf171314b#/explorer/698315d5dd88158a52896185/phonebookApp/people/find