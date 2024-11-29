# Frontend SAI

Esta pasta contém todo o código relacionado com o frontend do SAI

## Como Executar

Para executar o sistema utiliza de Node.js junto das ferramentas de desenvolvimento do React

## Prerequisitos

- [nodejs](https://nodejs.org) 18.19.0 or acima
- [npm](https://npmjs.com) _geralmente instalado com o node_
- [git](https://git-scm.com/) (opcional)
- [python](https://python.org) (opcional)

## Executando!

Após a instalação do nodejs, é necessário clonar o repositorio

```sh
$ git clone https://github.com/Hudson-H/CONSTRUCAO_DE_SOFTWARE__SAI.git
```

Depois disso você pode ir para a pasta do frontend com:

```sh
$ cd CONSTRUCAO_DE_SOFTWARE__SAI/frontend
```

Agora você precisa instalar todas as depencias da aplicação, para isso execute:

```sh
$ npm install
# ou
$ npm i
```

Após um tmepo o npm irá _baixar_ todas as dependências na pasta `node_modules`.

Com tudo configurado você poderá finalmente executar a webpage em modo desenvolvimento

```sh
$ npm run start
```

Um servidor de desenvolvimento React será aberto em: `http://localhost:3000`

## Compilando

Para Compilar a aplicação em uma página estática, você pode executar:

```sh
$ npm run build
```

O React irá gerar uma pasta `/build/` contendo a paginá compilada

Para servir a página, há diversas maneiras, mas uma delas é executando um 
http server com python. Como segue:

```sh
$ cd dist
$ python3 -m http.server
```
