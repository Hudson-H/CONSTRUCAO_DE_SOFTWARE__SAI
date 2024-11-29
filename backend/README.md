# Backend SAI

Esta pasta contém todo o código relacionado ao backend do SAI

## Como Executar

Para executar o sistema utiliza-se das proprias ferramentas que a
linguagem de programção Go oferece.

## Prerequisitos

- [Golang](https://go.dev/)
- [Migrate](https://github.com/golang-migrate/migrate)
- [MySQL](https://www.mysql.com/)
- [git](https://git-scm.com/) (opcional)

## Executando!

Após a instalação da linguagem de programação Go, é necessário clonar o repositório

```sh
$ git clone https://github.com/Hudson-H/CONSTRUCAO_DE_SOFTWARE__SAI.git
```

Depois disso você pode ir para a pasta do backend com:

```sh
$ cd CONSTRUCAO_DE_SOFTWARE__SAI/backend
```

Agora será necessário rodar as migrations, porém antes disso é requisito criar uma 
database no mysql, então após se conectar com o driver do MySQL, execute:

```sql
CREATE DATABASE <nome-db>
```

Esse nome é importante para que se configure o arquivo `app/shared/config/config.go`,
após isso vá no arquivo e configure com as informações do seu banco de dados.

Utilizando-se da ferramenta Migrate é possível executar uma série de pré-configurações
MySQLs de forma automatizada. Para 'subir' as migrations é necessário executar o seguinte comando no terminal

```sh
$ migrate -database mysql://<user-db>:<password-db>@/<nomem-db> -path migrations up
```

Após as migrations terem sido executadas, agora é possível rodar o servidor sem
problemas!

```sh
$ go run main.go
```

## Compilando

Muito comum entre desenvolvedores Go utilizar o modo interpretado de execução
durante o desenvolvimento, porém quando é necessário um desempenho melhor, ou para
distribuição é necessário compilar o código, para isso utilizamos o seguinte comando:

```sh
$ go build main.go
$ ./main
```
