import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import { ExpressAdapter } from "@nestjs/platform-express";
import { Express } from "express";
import { ValidationPipe } from "@nestjs/common";

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT || "", 10);

export class App {
  public async start(server: Express) {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT);
  }
}
