import {PositionItem} from "./word-data.types.ts";
import {Position} from "../../pages/article/hooks/use-article-state.ts";

export interface Article {
  articleId?: string;
  topic?: string;
  title?: string;
  subtitle?: string;
  banner?: string;
  difficultyScore?: number;
  wordCount?: number;
  translations?: Array<string>;
  highlight?: Array<Position>;
  text: Array<Array<Array<string>>>; // 层次分别为：段落 --> 句子 --> 单词
  time?: number;
  nextId?: string;
}

export interface ArticleFace {
  articleId: string;
  topic: string;
  title: string;
  subtitle: string;
  banner: string;
  difficultyScore: number;
  wordCount: number;
  positions?: Array<PositionItem>;
  time?: number;
}
