# DocTurn

With the help of DocTurn, you can easily keep track of the status of your documents. You will never again need to sift through your emails in a panic to find out what the most recent version of a document is.

![Screenshot of DocTurn app](/.demo/Sizzy-iPad-Pro-11.png)

In fast paced environments like a corporate law firm, every second of the day counts. While working as a legal assistant to five lawyers at one of Canada’s busiest corporate firms, I noticed that my lawyers spent considerable amount of time on version control of documents, which is why I created DocTurn. DocTurn is version control management application that helps keep track of: what documents you are currently working on, what version is the latest, who is currently reviewing it, and when it was last reviewed. This application alleviates a pain point for busy business professionals who review many documents on a regularly basis, and it has easy to use UI for people who don't have the time to learn a new application.

# Installation

Follow these steps to run a local instance of DocTurn:  
(You'll need node and npm already installed.)

1. Clone or download this repo.

2. Install client dependencies:  
   
   Run `npm install`.
   ```bash    
   $ npm install
   ```
3. Set environment variables:  
   
   Rename `.env_sample` to `.env` and change the placeholder value to the port you set for the server.
   ```shell
   REACT_APP_API_URL=http://localhost:<PORT SET IN /server/.env>
   ```
4. Start the React app:
    ```bash
    $ npm start
    ```
    
## Authors

- **Nicole Cevey** - [nicolecevey](https://github.com/nicolecevey)

## Stack

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png" width="15%"/> <img src="https://user-images.githubusercontent.com/23199980/116828363-3ccfc880-ab6c-11eb-8389-6b2dac4a849c.png" width="15%"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/2560px-Sass_Logo_Color.svg.png" width="15%"/> <img src="https://seeklogo.com/images/F/firebase-logo-402F407EE0-seeklogo.com.png" width="11%"/>
