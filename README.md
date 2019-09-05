# Ribon Game

## Depêndencias:

    Neste projeto foi utilizado docker e docker-compose.

## Executar o projeto:

Na pasta raiz do projeto, onde se localiza o arquivo `docker-compose.yml` execute os seguintes comandos:

1. `docker-compose build` (o build pode demorar um pouco, são muitas umagens construidas)
2. `docker-compose up [-d]`

## Observações:

1. O docker utiliza a porta 80 para executar o projeto, logo é importante que ela esteja disponível.
2. Caso queira verificar o loadbalancer funcionando acesse a url `localhost:4000`, será apresentado uma mensagem com o número do servidor que está sendo executado

## Seed banco de dados

Após executar a criação dos containers, vamos popular o banco de dados. Para isto execute os seguintes comandos dentro da pasta `./backend`:

1. `npm install mongoose`
2. `npm run seed`

Bom Jogo :)
