import { Injectable } from "@nestjs/common";
import { ADJECTIVES } from "../constants/adjectives.js";
import { NOUNS } from "../constants/nouns.js";
import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "../utils/shopify.js";

export const DEFAULT_PRODUCTS_COUNT = 5;
const CREATE_PRODUCTS_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

@Injectable()
export class ProductService {
  async create(session: any, count = DEFAULT_PRODUCTS_COUNT) {
    const client = new shopify.api.clients.Graphql({ session });

    try {
      for (let i = 0; i < count; i++) {
        await client.request(CREATE_PRODUCTS_MUTATION, {
          variables: {
            input: {
              title: `${this.randomTitle()}`,
              variants: [{ price: this.randomPrice() }],
            },
          },
        });
      }
    } catch (error: any) {
      if (error instanceof GraphqlQueryError) {
        throw new Error(
          `${error.message}\n${JSON.stringify(error.response, null, 2)}`
        );
      } else {
        throw error;
      }
    }
  }

  private randomTitle() {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${adjective} ${noun}`;
  }

  private randomPrice() {
    return Math.round((Math.random() * 10 + Number.EPSILON) * 100) / 100;
  }

  async count(session: any) {
    return await shopify.api.rest.Product.count({
      session,
    });
  }
}
