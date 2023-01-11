import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.service.js";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
