# Typescript

O Typescript é uma linguagem de programação open-source criada pela Microsoft, sendo um _superset_ para o Javascript, oque significa que ele utiliza da sintaxe do Javascript e adiciona recursos sobre a mesma. A principal adição do Typescript é a tipagem estática, que podemos ver em linguagens como C#, Java e GO, oque nos traz mais segurança no código e _auto-completes_ no desenvolvimento do código.

## Pré-requisitos

Para utilizar o Typescript precisamos primeiro vamos precisar instalar um _Javascript Runtime_ que tenha suporte ao TS, temos algumas opções como Node, Deno e Bun. Neste passo a passo utilizarei o Node sendo uma opção Open-Source comumente utilizado.

### Instalar a versão v20.13.0 do Node.js LTS

- Linux / MacOS usando NVM (Node Version Manager):

    ```sh
    # Instalar o NVM 
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

    nvm install 20
    ```
- Windows
    1. Usando um instalador do Node.js:
        - Acesse o link https://nodejs.org/en/download, selecione a arquitetura do seu processador (x64, x86 ou ARM64) e aperte no botão "Download Node.js v20.13.0". Execute o instalador e siga o passo a passo, após isso reinicie seu computador.


    2. Usando Chocolatey como Package Manager:
        ```cmd
        REM Pressupondo que o choco já esteja instalado execute o comando: 
        choco install nodejs-lts --version="20.13.0"
        ```

        - Caso você não tenha o Chocolatey instalado, você pode instalá-lo seguindo o passo a passo do link oficial do Chocolatey https://chocolatey.org/install#individual.

Para verificar se a instalação do Node.js está correta execute o seguinte comando no terminal do seu Sitema Operacional: `node -v` para verificar a versão do Node.js e `npm -v` para verificar a versão do NPM instalado.

## Instalação do Typescript Module

Primeiro precisamos inicializar um novo projeto Node.js, executando o comando `npm init -y` na pasta do nosso projeto, o que vai criar um arquivo chamado `package.json` que será o nosso arquivo de configuração central do projeto, armazenando informações do mesmo.

Após isso, iremos adicionar o Typescript em si a este projeto Node, executando o comando
`npm install typescript`, com o sucesso desse comando podemos notar que temos um novo arquivo chamado 
`package-lock.json` que armazena as versões das nossas dependências do projeto, facilitando a colaboração e reduzindo a incompatibilidades entre ambientes. Também temos a pasta `node_modules` que é o nosso repositório de dependências em si de nossos projetos Node.js, nesse caso sendo o TypeScript.

## Utilização do Typescript

Podemos finalmente criar um arquivo com a extensão `.ts`, no caso usarei `sample.ts` como nome de arquivo.

```typescript
// sample.ts

const name_user: string = 'Carlos';

function hello(name: string){
    console.log(`Hello ${name}!`);
}

hello(name_user);
```

Como podem ver neste exemplo simples estamos usando a tipagem do Typescript na nossa primeira variável `name_user` e no nosso parâmetro da função `hello`, sendo os dois do tipo string.

Após criarmos o arquivo, podemos transpilar o código em Typescipt para JavaScript usando o comando `npx tsc sample.ts` o que vai nos dar acesso ao arquivo `sample.js` um arquivo Javascript que usando as configurações _default_ do compilador.

```javascript
// sample.js
var name_user = 'Carlos';
function hello(name) {
    console.log("Hello ".concat(name, "!"));
}
hello(name_user);
```

Podemos testar esse arquivo usando o Node.js:
```sh
node sample.js
# Vai retornar: "Hello Carlos!"
```
---

O Typescript não se resume apenas a tipos de variáveis e funções, tendo outras funcionalidades importantes para o desenvolvimento como as _interfaces_:

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
}

const usuario1: Usuario = {
  id: 1,
  nome: "João Silva",
  email: "joaosilva@email.com"
};
```

As _interfaces_ aqui se resumem a um contrato que é definido entre os dados, sendo então toda variável que for do tipo `Usuario`, precisa necessariamente ter a implantação dos campos definidos na interface `Usuario`. Caso não aconteça isso, o Typescript gerará um erro de compilação.

## Conclusão

Nesta documentação aprendemos a instalar e utilizar o _superset_ Typescript para desenvolvimento de código Javascript tipado assim como algumas de suas funcionalidades, utilizando NPM para configurar, instalar as dependências do nosso projeto e para transpilar o nosso arquivo TS em JS, executando finalmente o arquivo gerado em JS com o NodeJS.

Links úteis:

- Link para documentação do Typescript: https://www.typescriptlang.org/docs/
- Link para documentação do NodeJS: https://nodejs.org/docs/latest-v20.x/api/index.html
- Link para documentação do NPM: https://docs.npmjs.com/
