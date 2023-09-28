## How to set up and run the project

1. Clone the repository to your local machine.
2. Install the dependencies using `npm install`.
3. Create a `.env` file in the root directory of the project and add the following environment variables:
   ```
   JWT_SECRET=<your_secret_key>
   ```
   Replace `<your_secret_key>` with your own secret key.
4. Run the migrations using `npx prisma migrate dev`.
5. Start the server using `npm start`.
6. The server will be running at `http://localhost:3000`.



