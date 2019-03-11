export interface Ecs {
  cluster: string;
  length: number;
  services?: (string | null)[] | null;
}
