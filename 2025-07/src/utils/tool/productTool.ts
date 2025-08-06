import z from "zod";
import { readMarkdownAsync } from "@utils/files/readFile";

export class ProductTool {
  async getDivingProductInfo() {
    const content = await readMarkdownAsync(`@prompts/products/diving-store/products-diving-store.md`);
    return { result: content };
  }

  async getLivingStoreProductInfoForUS() {
    const content = await readMarkdownAsync(`@prompts/products/living-area-shop/for-US.json`);
    return { result: content };
  }

  async getLivingStoreProductInfoForJP() {
    const content = await readMarkdownAsync(`@prompts/products/living-area-shop/for-JP.json`);
    return { result: content };
  }

  async getLivingStoreProductInfoForKR() {
    const content = await readMarkdownAsync(`@prompts/products/living-area-shop/for-KR.json`);
    return { result: content };
  }

  async getCategory() {
    const content = await readMarkdownAsync(`@prompts/products/living-area-shop/category/category.json`);
    return { result: content };
  }

  getTools() {
    return {
      // divingProductInfo: {
      //   description: '获取全部的商品信息',
      //   parameters: z.object({}),
      //   execute: this.getDivingProductInfo.bind(this)
      // }

      livingStoreProductInfoForUS: {
        description: 'Get product list for a living store, for people from US. This tool is used to get all product list from a JSON file with description, amount. When buyer want to know more about one certain category, could use this tool to get product list',
        parameters: z.object({}),
        execute: this.getLivingStoreProductInfoForUS.bind(this)
      },
      livingStoreProductInfoForKR: {
        description: 'Get product list for a living store, for people from Korea. This tool is used to get all product list from a JSON file with description, amount. When buyer want to know more about one certain category, could use this tool to get product list',
        parameters: z.object({}),
        execute: this.getLivingStoreProductInfoForKR.bind(this)
      },
      livingStoreProductInfoForJP: {
        description: 'Get product list for a living store, for people from Japan. This tool is used to get all product list from a JSON file with description, amount. When buyer want to know more about one certain category, could use this tool to get product list',
        parameters: z.object({}),
        execute: this.getLivingStoreProductInfoForJP.bind(this)
      },
      category: {
        description: 'Get product category. This tool is used to get category list from a JSON file of category',
        parameters: z.object({}),
        execute: this.getCategory.bind(this)
      }
    };
  }
}