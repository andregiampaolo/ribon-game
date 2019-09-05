# Ribon Game

## Depêndencias:

    Neste projeto foi utilizado docker e docker-compose.

## Executar o projeto:

1. Na pasta `./backend` execute o comando `npm install`;
2. Na pasta `./frontend` execute o comando `npm install`;
3. Na pasta raiz do projeto, execute o comando `docker-compose up`;

## Observações:

1. O docker utiliza a porta 80 para executar o projeto, logo é importante que ela esteja disponível.
2. Caso queira verificar o loadbalancer funcionando acesse a url `localhost:4000`, será apresentado uma mensagem com o número do servidor que está sendo executado

## Seed banco de dados

Após executar a criação dos containers, vamos popular o banco de dados. Para isto execute os seguintes comandos dentro da pasta `./backend`:

1. `npm run seed`

Boa diversão (:
