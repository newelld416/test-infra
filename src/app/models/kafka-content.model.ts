export interface KafkaContent {
  content?: (ContentEntity)[] | null;
}
export interface ContentEntity {
  topic: string;
  key: string;
  value: string;
  partition: number;
  offset: number;
}
