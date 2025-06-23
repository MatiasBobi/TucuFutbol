export interface Category {
  id: number;
  name: string;
  sub_categories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  url_name: string;
}
