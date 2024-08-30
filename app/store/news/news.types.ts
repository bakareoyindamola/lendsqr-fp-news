export interface News {
  clean_url: string;
  author: string;
  country: string;
  language: string;
  link: string;
  published_date: Date;
  rank: number;
  rights: string;
  summary: string;
  title: string;
  topic: string;
  image_url: string;
}

export interface NewsItem {
  id: number;
  attributes: News;
}

export interface Meta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Check strapi filtering for the type of filter operator and what they do
type FilterOperator =
  | '$eq'
  | '$eqi'
  | '$ne'
  | '$nei'
  | '$lt'
  | '$lte'
  | '$gt'
  | '$gte'
  | '$in'
  | '$notIn'
  | '$contains'
  | '$notContains'
  | '$containsi'
  | '$notContainsi'
  | '$null'
  | '$notNull'
  | '$between'
  | '$startsWith'
  | '$startsWithi'
  | '$endsWith'
  | '$endsWithi'
  | '$or'
  | '$and'
  | '$not';

export interface Filter {
  field: string;
  operator: FilterOperator;
  value?: string | number | boolean | (string | number | boolean)[] | null;
}

export interface Params {
  page: number;
  pageSize?: number;
  sort?: string;
  filter?: Filter[];
}

export interface NewsResponse {
  data: NewsItem[];
  meta: Meta;
}
