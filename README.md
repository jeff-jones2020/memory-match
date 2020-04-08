# memory-match
A dynamic, responsive web application for bored people who want to play Jurassic-park themed memory match.

## Live Website
Try the application live at [https://memory-match.jeff-j.me](https://memory-match.jeff-j.me)

## Technologies Used
- JavaScript
- HTML5
- CSS3

## Features
- User can play a game of memory match
- User can see number of games played
- User can see number of attempts during current round
- User can see accuracy (attempts / matches) during current round

## Preview
![Burgers 'n' Brew](bnb.gif)

## Development

### System Requirements
- Node.js 10 or higher
- NPM 6 or higher
- PostgreSQL 10 or higher
- Express.js 4 or higher

### Getting Started
1. Clone the repository.

    ```shell
    git clone https://github.com/jeff-jones2020/memory-match.git
    cd memory-match
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Create a database named 'bnb' in your PostgreSQL instance

4. Modify the .env file to include

    ```
    PORT=port
    DEV_SERVER_PORT=port2
    DATABASE_URL=postgres://user:password@host:port/bnb
    SESSION_SECRET=secret
    SESSION_EXPIRY=28800000
    KEY=Bearer 9HcPGXUHzz5uL3aILr3VUEa1tJan5EDWc8KHQEsHNm-0BP5YnEgjRaH3letAt5mW7d1xkEiTYaQy1nnZ3aHXXBTpNCiATlesAI5ulAvYzdkSxSFv_iilb2Jnhr1rXnYx
    ```

5. Import the bnb database to PostgreSQL.

    ```shell
    npm run db:import
    ```

6. Create a file /client/components/key.jsx with the following content:

    ```javascript
    const KEY = () => {
      return 'AIzaSyA7IMKemqRAjBy6Rut55LAvHiip_ - TH_X0';
    };

    export default KEY;
    ```

7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
