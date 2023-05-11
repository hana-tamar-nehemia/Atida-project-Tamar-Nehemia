# Atida-project-Tamar-Nehemia


<img width="689" alt="image" src="https://github.com/hana-tamar-nehemia/Atida-project-Tamar-Nehemia/assets/73160604/8aef6bbb-cee2-4525-97e5-b1a19f0bcae1">


Scroll down to see running instructions



# add user

3. to add user to system press on addUser

<img width="475" alt="image" src="https://user-images.githubusercontent.com/73160604/236961490-ac95c9d8-9309-4acb-92ae-fd88c2435f66.png">

4.add user detail and submit

<img width="509" alt="image" src="https://user-images.githubusercontent.com/73160604/236961838-585cf6c2-2702-4ae4-b92d-feb2331ce386.png">

5. the user will add to the list in the home page

<img width="476" alt="image" src="https://user-images.githubusercontent.com/73160604/236961978-fd9bfbb6-bdb6-4655-9aa2-7d0b1301bd3a.png">


to add user with Postman send a POST request on:  localhost:3000/addUser

<img width="406" alt="image" src="https://user-images.githubusercontent.com/73160604/236967593-d7e206c6-edb7-4730-9ea7-5e2ad6538f85.png">



# pull user

6. to search for a user enter the id  and press "search"

<img width="274" alt="image" src="https://user-images.githubusercontent.com/73160604/236965799-59212ef4-3f1d-45bf-bb87-ea149ab84786.png">

<img width="727" alt="image" src="https://github.com/hana-tamar-nehemia/Atida-project-Tamar-Nehemia/assets/73160604/44f068b5-33ec-46c8-9368-b9f2dc6ea564">



to pull user with Postman send a GET request on:  localhost:3000/pullUser/:id/

<img width="440" alt="image" src="https://github.com/hana-tamar-nehemia/Atida-project-Tamar-Nehemia/assets/73160604/88a9dfd7-5aa4-457b-8426-b7744dd0c4f7">


And it will console his detail

<img width="311" alt="image" src="https://user-images.githubusercontent.com/73160604/236968428-7ad53c37-070f-49ae-b4fb-ff5df624e6cc.png">




# Bonus part:

in the graph we see the number of people who tested positive for Corona per day for the current month till today

<img width="426" alt="image" src="https://user-images.githubusercontent.com/73160604/236964346-d05b2a2f-5f09-4cd6-ae34-0ecf16b7c049.png">

in the table we see the all users

<img width="697" alt="image" src="https://user-images.githubusercontent.com/73160604/236965542-d40fb8bf-0d18-4dec-8ae6-996bbb5b45cb.png">

in the top left we can see the number of people who dont vaccinated

<img width="346" alt="image" src="https://user-images.githubusercontent.com/73160604/236964493-076d6402-6cc9-49c7-a958-5694235f6301.png">

you can add a profile picture by press on "add profile photo" , select photo 

<img width="738" alt="image" src="https://user-images.githubusercontent.com/73160604/236964767-4498b594-a1bb-4867-82e8-6bb8d1572385.png">

And it will appear

<img width="430" alt="image" src="https://user-images.githubusercontent.com/73160604/236964990-83ff17b2-2bb3-4302-90de-2f489c4f3787.png">


# running instructions

run mongo first:

1. open Hyper and run "mongod"

<img width="300" alt="image" src="https://user-images.githubusercontent.com/73160604/236960850-fc66a4b3-8816-4187-985f-85101afc8bd6.png">

2. open new tab in Hyper and run mongosh -> show dbs -> use atidaDB -> db.user.find()

run the project:

1. open Hyper on the project folder and run "nodemon" or "node app.js"

<img width="300" alt="image" src="https://user-images.githubusercontent.com/73160604/236960059-01c25c7c-bf99-4b16-85ca-808d20be5c27.png">

2. open localhostlocal:3000 on the browser


