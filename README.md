# Ribon Game


## Depêndencias:
    Neste projeto foi utilizado docker e docker-compose.

## Executar o projeto:
Na pasta raiz do projeto, onde se localiza o arquivo `docker-compose.yml`, basta executar o comando `docker-compose up [-d]`
(E aguardar...a primeira vez que o projeto é executa o build das imagens demora muito)

## Seed banco de dados
Após executar a criação dos containers, popule o banco de dados executando o comando `npm run seed` na pasta `./backend` do projeto.

## Observações:
1. O docker utiliza a porta 80 para executar o projeto, logo é importante que ela esteja disponível.
2. Caso queira verificar o loadbalancer funcionando acesse a url `localhost:4000`, será apresentado uma mensagem com o número do servidor que está sendo executado

