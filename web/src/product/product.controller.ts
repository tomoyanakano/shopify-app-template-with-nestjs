import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";
import { ProductService } from "./product.service.js";

@Controller("/api/products")
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get("create")
  async create(@Res() res: Response) {
    let status = 200;
    let error = null;

    try {
      await this.productService.create(res.locals.shopify.session);
    } catch (e: any) {
      console.log(`Failed to process products/create: ${e.message}`);
      status = 500;
      error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
  }

  @Get("count")
  async count(@Res() res: Response) {
    const countData = await this.productService.count(
      res.locals.shopify.session
    );
    res.status(200).send(countData);
  }
}
