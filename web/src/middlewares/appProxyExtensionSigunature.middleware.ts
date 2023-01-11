import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import crypto from "crypto";

/** Verify App Proxy Request
 * https://shopify.dev/apps/online-store/app-proxies
 */
export class AppProxyExtensionSignatureMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { signature = "", ...queryParams } = req.query;
    const secret = process.env.SHOPIFY_API_SECRET || "";

    const input = Object.keys(queryParams)
      .sort()
      .map((key) => {
        const value = queryParams[key];
        return `${key}=${value}`;
      })
      .join("");

    const hmac = crypto
      .createHmac("sha256", secret)
      .update(input)
      .digest("hex");

    const digest = Buffer.from(hmac, "utf-8");
    const checksum = Buffer.from(signature as string, "utf-8");

    if (
      digest.length === checksum.length &&
      crypto.timingSafeEqual(digest, checksum)
    ) {
      next();
    } else {
      res.status(401).send();
    }
  }
}
