export interface ServiceEdit {
  updated: boolean;
  cluster: string;
  length: number;
  services?: (string)[] | null;
}

export interface Service {
  serviceArn: string;
  serviceName: string;
  clusterArn: string;
  loadBalancers?: (LoadBalancersEntity)[] | null;
  serviceRegistries?: (null)[] | null;
  status: string;
  desiredCount: number;
  runningCount: number;
  pendingCount: number;
  launchType: string;
  platformVersion: string;
  taskDefinition: string;
  deploymentConfiguration: DeploymentConfiguration;
  deployments?: (DeploymentsEntity)[] | null;
  roleArn: string;
  events?: (EventsEntity)[] | null;
  createdAt: string;
  placementConstraints?: (null)[] | null;
  placementStrategy?: (null)[] | null;
  networkConfiguration: NetworkConfiguration;
  healthCheckGracePeriodSeconds: number;
  schedulingStrategy: string;
  tags?: (TagsEntity)[] | null;
  enableECSManagedTags: boolean;
  propagateTags: string;
}
export interface LoadBalancersEntity {
  targetGroupArn: string;
  containerName: string;
  containerPort: number;
}
export interface DeploymentConfiguration {
  maximumPercent: number;
  minimumHealthyPercent: number;
}
export interface DeploymentsEntity {
  id: string;
  status: string;
  taskDefinition: string;
  desiredCount: number;
  pendingCount: number;
  runningCount: number;
  createdAt: string;
  updatedAt: string;
  launchType: string;
  platformVersion: string;
  networkConfiguration: NetworkConfiguration;
}
export interface NetworkConfiguration {
  awsvpcConfiguration: AwsvpcConfiguration;
}
export interface AwsvpcConfiguration {
  subnets?: (string)[] | null;
  securityGroups?: (string)[] | null;
  assignPublicIp: string;
}
export interface EventsEntity {
  id: string;
  createdAt: string;
  message: string;
}
export interface TagsEntity {
  key: string;
  value: string;
}
