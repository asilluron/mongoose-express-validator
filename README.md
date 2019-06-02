# mongoose-express-validator
Middleware for Express that validates a model based on Moongoose schema

## Usage

```
import mev from "mongoose-express-validator";

app.use(mev('user', User));
```

Where `User` is a Mongoose model and `user` corresponds to the path name of the model to validate. The example above validates all POSTs to /user/ or /user

Any failed requests will throw a `400` and the bullt in message with Mongoose.

Check out https://github.com/leepowellcouk/mongoose-validator#readme for exciting ideas on how to configure custom messages and advanced validation.

## Development
```
npm install
npm run build
```