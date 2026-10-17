export type ProductId = "docbase" | "sheetbase" | "slidebase";

export interface Product {
  id: ProductId;
  name: string;
  category: string;
  summary: string;
  status: "available" | "coming-soon";
}

export const PRODUCTS: Product[] = [
  {
    id: "docbase",
    name: "DocBase",
    category: "Documents",
    summary:
      "A full word processor for letters, reports and books. Opens and saves Word documents.",
    status: "available",
  },
  {
    id: "sheetbase",
    name: "SheetBase",
    category: "Spreadsheets",
    summary: "Tables, formulas and charts for budgets, lists and data.",
    status: "coming-soon",
  },
  {
    id: "slidebase",
    name: "SlideBase",
    category: "Presentations",
    summary: "Build slide decks and present them full screen.",
    status: "coming-soon",
  },
];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
