# Vending Machine 

## How to run 
1. clone reposatory into your local machine
2. install docker , docker-compose
3. execute the following command : docker-compose up --build -d 


## Assumptions
1. The machine have infinte number of coins for each type.
2. If user have deposit in range [1 - 4] the server don't return it, instead accumulate it until it become a valid coin type.


## Facts 
1. Api requests folder have some api tests to get familiar with api (it can be used by Rest client in vsCode)