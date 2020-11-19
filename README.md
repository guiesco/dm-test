# dm-test

### Configurar variáveis de ambiente

Para conseguir rodar o projeto sem problemas, é necessário criar um arquivo .env na raiz do projeto, nele, crie uma variável com nome `giphyKey`, e atribua uma chave de api a essa variável.

Para não ser necessário criar um app, e consequentemente uma chave de api no giphy, pode usar essa chave: `pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98`.

Ps: Lembre de atribuí-la como uma string.

Ps2: O arquivo .env deverá ter o seguinte conteudo: `giphyKey = 'pPiMNFkdnBt4wGmBiJ9YCryAw3lHJk98'`

### Instalar docker e docker compose

Baixe a ultima versão do docker e do docker compose

### Iniciar o servidor

Rodar comando de criação de container e iniciação do servidor no docker:

`$ docker-compose up`

Pronto! Agora é só acessar o localhost:3001, que ja vai ser possível acessar a api.

### Testes unitários

Para rodar a rotina de testes, simplesmente rode o comando:

`$ npm test`

É só esperar que o Jest faz o resto :).